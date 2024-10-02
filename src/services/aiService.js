import openai from '../config/openaiConfig';
import generatePrompt from '../utils/promptManager';

export const getAIResponse = async (heroName, userMessage) => {
  try {
    const prompt = generatePrompt(heroName, userMessage);

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // ou le modèle que vous souhaitez utiliser
      messages: [
        { 
          role: "system", 
          content: "Vous êtes un assistant IA jouant le rôle d'un héros. Répondez comme si vous étiez ce héros, en utilisant son style de langage et ses caractéristiques uniques." 
        },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erreur lors de lappel à lAPI OpenAI:', error);
    return "Désolé, je n'ai pas pu comprendre. Pouvez-vous reformuler ?";
  }
};