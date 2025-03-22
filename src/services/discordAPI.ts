// First, create a Discord API service
// src/services/discordApi.ts

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

  // Helper to get avatar URL for a user
  getAvatarUrl(userId: string, avatarId: string | null): string {
    if (!avatarId) {
      // Return default avatar
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
