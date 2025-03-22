// src/app/api/discord/members/route.ts

import DiscordAPI from "@/services/discordAPI";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the Discord bot token from environment variables
    const token = process.env.DISCORD_BOT_TOKEN;
    const guildId = process.env.DISCORD_GUILD_ID;

    if (!token || !guildId) {
      return NextResponse.json(
        { error: "Discord configuration missing" },
        { status: 500 }
      );
    }

    const discordApi = new DiscordAPI(token);
    const members = await discordApi.getGuildMembers(guildId);

    // Format the response to include only public information
    const publicMemberInfo = members.map((member) => {
      const { user, nick, roles, joined_at, avatar: memberAvatar } = member;

      return {
        id: user.id,
        username: user.username,
        global_name: user.global_name || null,
        display_name: user.display_name || null,
        nick: nick || null,
        joined_at,
        roles,
        avatarUrl: discordApi.getMemberAvatarUrl(
          guildId,
          user.id,
          user.avatar,
          memberAvatar ?? null
        ),
        isBot: user.bot || false,
      };
    });

    return NextResponse.json({ members: publicMemberInfo });
  } catch (error) {
    console.error("Error in Discord members API:", error);
    return NextResponse.json(
      { error: "Failed to fetch Discord members" },
      { status: 500 }
    );
  }
}
