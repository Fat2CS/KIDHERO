import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveHeroes = async (heroes) => {
  try {
    await AsyncStorage.setItem("heroes", JSON.stringify(heroes));
  } catch (error) {
    console.error("Error saving heroes:", error);
  }
};

export const getHeroes = async () => {
  try {
    const heroes = await AsyncStorage.getItem("heroes");
    return heroes ? JSON.parse(heroes) : [];
  } catch (error) {
    console.error("Error getting heroes:", error);
    return [];
  }
};
