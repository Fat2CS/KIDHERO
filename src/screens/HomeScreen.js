import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlusCircle, MessageCircle, Star } from "lucide-react-native";

const HomeScreen = ({ navigation }) => {
  const [heroes, setHeroes] = useState([]);
  const [newHeroName, setNewHeroName] = useState("");

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    try {
      const savedHeroes = await AsyncStorage.getItem("heroes");
      if (savedHeroes !== null) {
        setHeroes(JSON.parse(savedHeroes));
      }
    } catch (error) {
      console.error("Error loading heroes:", error);
    }
  };

  const saveHeroes = async (updatedHeroes) => {
    try {
      await AsyncStorage.setItem("heroes", JSON.stringify(updatedHeroes));
    } catch (error) {
      console.error("Error saving heroes:", error);
    }
  };

  const addNewHero = () => {
    if (newHeroName.trim() !== "") {
      const updatedHeroes = [...heroes, { name: newHeroName, chats: 0 }];
      setHeroes(updatedHeroes);
      saveHeroes(updatedHeroes);
      setNewHeroName("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Hero Chat</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            value={newHeroName}
            onChangeText={setNewHeroName}
            placeholder="Enter your hero's name"
          />
          <TouchableOpacity onPress={addNewHero} style={styles.button}>
            <PlusCircle color="white" size={24} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add New Hero</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>My Heroes</Text>

        {heroes.map((hero, index) => (
          <TouchableOpacity
            key={index}
            style={styles.heroItem}
            onPress={() => navigation.navigate("Chat", { hero: hero.name })}
          >
            <View style={styles.heroAvatar}>
              <Star color="#6200ee" size={30} />
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{hero.name}</Text>
              <Text style={styles.heroChats}>{hero.chats} chats</Text>
            </View>
            <MessageCircle color="#6200ee" size={24} />
          </TouchableOpacity>
        ))}

        {heroes.length === 0 && (
          <Text style={styles.emptyMessage}>
            Add your first hero to start chatting!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0ff"
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20
  },
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#6200ee",
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonIcon: {
    marginRight: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  heroItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  heroAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  heroInfo: {
    flex: 1
  },
  heroName: {
    fontWeight: "bold",
    fontSize: 18
  },
  heroChats: {
    color: "#666"
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    marginTop: 20
  }
});

export default HomeScreen;
