import DiscordAPI from "@/services/discordAPI";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = process.env.DISCORD_BOT_TOKEN;
    const forumChannelId = process.env.DISCORD_FORUM_CHANNEL_ID;

    if (!token || !forumChannelId) {
      console.error("Missing Discord bot token or forum channel ID");
      return NextResponse.json(
        { error: "Discord configuration missing" },
        { status: 500 }
      );
    }

    const discordApi = new DiscordAPI(token);
    console.log("Fetching threads from Discord API...");

    const threads = await discordApi.getActiveThreads(forumChannelId);
    console.log("Threads fetched:", threads);

    if (!threads || threads.length === 0) {
      console.warn("No active threads found.");
      return NextResponse.json({ threads: [] });
    }

    return NextResponse.json({ threads });
  } catch (error: any) {
    console.error(
      "Error in Discord threads API:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to fetch Discord threads", details: error.message },
      { status: 500 }
    );
  }
}
