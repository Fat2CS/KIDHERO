import axios from 'axios';



   const API_URL = 'URL_DE_VOTRE_API_CHATGPT';

   export const getChatResponse = async (heroName, userMessage) => {
     try {
       const response = await axios.post(API_URL, {
         hero: heroName,
         message: userMessage
       });
       return response.data.reply;
     } catch (error) {
       console.error('Error getting chat response:', error);
       return 'Sorry, I couldn\'t understand that. Can you try again?';
     }
   };