import { BASE_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUnitApi = async (projectId: string, payload: any) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(`${BASE_URL}/project/${projectId}/unit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchUnitsApi = async (projectId: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(`${BASE_URL}/project/${projectId}/unit`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
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