// src/components/DiscordMembers.tsx

"use client";
import Marquee from "react-fast-marquee";

import { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "../countUp/CountUp";

interface Member {
  id: string;
  username: string;
  global_name: string | null;
  display_name: string | null;
  nick: string | null;
  joined_at: string;
  roles: string[];
  avatarUrl: string;
  isBot: boolean;
}

export default function DiscordMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/discord/members");
        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();
        setMembers(data.members);
      } catch (err) {
        setError("Error loading Discord members");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading members...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-2xl font-bold mb-6">
        Meet our{" "}
        <CountUp
          from={0}
          to={100}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
        + Members
      </div>

      <div className="border-y">
        <Marquee>
          {members.map((member) => (
            <div key={member.id} className=" p-4 flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  unoptimized
                  src={member.avatarUrl}
                  alt={`${member.username}'s avatar`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
