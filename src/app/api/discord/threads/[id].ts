import DiscordAPI from "@/services/discordAPI";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    console.error("Missing Discord bot token or forum channel ID");
    return NextResponse.json(
      { error: "Discord configuration missing" },
      { status: 500 }
    );
  }
  if (req.method === "GET") {
    try {
      const discordAPI = new DiscordAPI(token);
      const threadDetail = await discordAPI.getThreadInfo(id as string);

      res.status(200).json(threadDetail);
    } catch (error) {
      console.error(`Error fetching thread ${id}:`, error);
      res.status(500).json({ error: "Failed to fetch thread details" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
