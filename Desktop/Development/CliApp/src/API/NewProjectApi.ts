import { BASE_URL } from "@env";

export const createProjectApi = async (payload: any, token?: string) => {
  try {
    // If token not passed, try to get from storage
    let authToken = token;
    
    if (!authToken) {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      authToken = await AsyncStorage.getItem('token');
    }
    
    if (!authToken) {
      throw new Error("No token provided");
    }

    const response = await fetch(`${BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};