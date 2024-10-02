import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image
} from "react-native";
import { Send } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAIResponse } from "../services/aiService";
import generatePrompt from "../utils/promptManager";
const MessageTypes = {
  TEXT: "text",
  IMAGE: "image",
  ACTION: "action"
};

const ChatScreen = ({ route }) => {
  const { hero } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadConversationHistory = async () => {
      try {
        const history = await AsyncStorage.getItem(`chat_history_${hero}`);
        if (history !== null) {
          setMessages(JSON.parse(history));
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
      }
    };

    loadConversationHistory();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [hero]);

  const saveConversationHistory = async (updatedMessages) => {
    try {
      await AsyncStorage.setItem(
        `chat_history_${hero}`,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'historique:", error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "" || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: MessageTypes.TEXT,
      text: inputText,
      sender: "user"
    };
    const updatedMessages = [userMessage, ...messages];
    setMessages(updatedMessages);
    saveConversationHistory(updatedMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const prompt = generatePrompt(hero, inputText);
      const aiReply = await getAIResponse(prompt);
      const aiMessage = {
        id: Date.now() + 1,
        type: MessageTypes.TEXT,
        text: aiReply,
        sender: "ai"
      };
      const newUpdatedMessages = [aiMessage, ...updatedMessages];
      setMessages(newUpdatedMessages);
      saveConversationHistory(newUpdatedMessages);
    } catch (error) {
      console.error("Erreur lors de la récupération de la réponse IA:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: MessageTypes.TEXT,
        text: "Désolé, une erreur s'est produite. Réessayez plus tard.",
        sender: "ai"
      };
      const errorUpdatedMessages = [errorMessage, ...updatedMessages];
      setMessages(errorUpdatedMessages);
      saveConversationHistory(errorUpdatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    switch (item.type) {
      case MessageTypes.TEXT:
        return (
          <Animated.View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userMessage : styles.aiMessage,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </Animated.View>
        );
      case MessageTypes.IMAGE:
        return (
          <Animated.View style={[styles.messageBubble, { opacity: fadeAnim }]}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.messageImage}
            />
          </Animated.View>
        );
      case MessageTypes.ACTION:
        return (
          <Animated.View
            style={[styles.actionContainer, { opacity: fadeAnim }]}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={item.onAction}
            >
              <Text style={styles.actionText}>{item.actionText}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={`Demandez quelque chose à ${hero}...`}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, isLoading && styles.disabledButton]}
          disabled={isLoading}
        >
          <Send color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0ff"
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "80%"
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6200ee"
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#03dac6"
  },
  messageText: {
    color: "#fff",
    fontSize: 16
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff"
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10
  },
  sendButton: {
    backgroundColor: "#6200ee",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#cccccc"
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  actionContainer: {
    alignItems: "center",
    marginVertical: 10
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20
  },
  actionText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default ChatScreen;
