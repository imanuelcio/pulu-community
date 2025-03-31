import axios from "axios";

// Types for Discord API responses
export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
  global_name?: string | null;
  display_name?: string | null;
}

export interface DiscordGuildMember {
  user: DiscordUser;
  nick?: string | null;
  roles: string[];
  joined_at: string;
  premium_since?: string | null;
  avatar?: string | null;
  pending?: boolean;
  communication_disabled_until?: string | null;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  members?: DiscordGuildMember[];
}

// New types for Discord threads
export interface DiscordThread {
  id: string;
  name: string;
  owner_id: string;
  message_count: number;
  last_message_id: string;
}

class DiscordAPI {
  private token: string;
  private baseUrl = "https://discord.com/api/v10";

  constructor(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return {
      Authorization: `Bot ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  // Get all members from a guild
  async getGuildMembers(
    guildId: string,
    limit = 1000
  ): Promise<DiscordGuildMember[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/guilds/${guildId}/members?limit=${limit}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching guild members:", error);
      throw error;
    }
  }

  // Get all active threads in a forum channel
  async getActiveThreads(channelId: string): Promise<DiscordThread[]> {
    try {
      // Get current timestamp in ISO8601 format
      const currentTimestamp = new Date().toISOString();

      const response = await axios.get(
        `${this.baseUrl}/channels/${channelId}/threads/archived/public`,
        {
          headers: this.getHeaders(),
          params: {
            before: currentTimestamp,
          },
        }
      );

      return response.data.threads;
    } catch (error) {
      console.error("Error fetching active threads:", error);
      throw error;
    }
  }
  async getAllActiveGuildThreads(guildId: string): Promise<DiscordThread[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/guilds/${guildId}/threads/active`,
        { headers: this.getHeaders() }
      );

      return response.data.threads;
    } catch (error) {
      console.error("Error fetching all active guild threads:", error);
      throw error;
    }
  }
  async getThreadInfo(threadId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/channels/${threadId}/messages?limit=100`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching thread info:", error);
      throw error;
    }
  }

  // Get Discord user info
  async getUserInfo(userId: string): Promise<DiscordUser | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${userId}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch user info for ${userId}`);
      return null;
    }
  }

  // Helper to get avatar URL for a user
  getAvatarUrl(userId: string, avatarId: string | null): string {
    if (!avatarId) {
      const defaultAvatarNumber = parseInt(userId) % 5;
      return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    }

    const format = avatarId.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.${format}`;
  }

  // Helper to get guild member avatar URL (overrides user avatar if set)
  getMemberAvatarUrl(
    guildId: string,
    userId: string,
    userAvatar: string | null,
    memberAvatar: string | null
  ): string {
    if (memberAvatar) {
      const format = memberAvatar.startsWith("a_") ? "gif" : "png";
      return `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
    }

    return this.getAvatarUrl(userId, userAvatar);
  }
}

export default DiscordAPI;
