import axios from "axios";
import type { Channel, DiscordMember } from "../types/Discord";

const API_URL = import.meta.env.VITE_API_URL + "/discord";

const getChannels = async (): Promise<Channel[]> => {
  const response = await axios.get(`${API_URL}/channels`, { withCredentials: true });
  return response.data.data;
}

const getUsers = async (): Promise<DiscordMember[]> => {
  const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
  return response.data.data;
}

const sendChannelMessage = async (channelId: string, message: string): Promise<boolean> => {
  if (!channelId) {
    console.error("Channel ID is required to send a message.");
    return false;
  }
  if (message.trim().length === 0) {
    console.error("Message cannot be empty.");
    return false;
  }
  try {
    await axios.post(
      `${API_URL}/send/channel`,
      { channelId, message },
      { withCredentials: true }
    );

    return true;
  } catch (error) {
    console.error("Error sending message to channel:", error);
    return false;
  }
}

const sendPrivateMessage = async (userIds: string[], message: string): Promise<boolean> => {
  if (userIds.length === 0) {
    console.error("No user IDs provided for private message.");
    return false;
  }
  if (message.trim().length === 0) {
    console.error("Message cannot be empty for private message.");
    return false;
  }
  try {

    await axios.post(
      `${API_URL}/send/private`,
      { userIds, message },
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    console.error("Error sending private message:", error);
    return false;
  }
}

export default {
  getChannels,
  getUsers,
  sendChannelMessage,
  sendPrivateMessage
}