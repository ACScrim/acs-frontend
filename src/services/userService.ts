import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const updateUserRole = async (userId: string, role: string) => {
  try {
    await axios.put(
      `${API_URL}/users/role`,
      { userId, role },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
  }
};

export default {
  fetchAllUsers,
  updateUserRole,
};
