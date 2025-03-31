// src/components/DiscordMembers.tsx

"use client";
import Marquee from "react-fast-marquee";

import { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "../countUp/CountUp";
import SpotlightCard from "../spotlightCard/SpotlightCard";

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

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 rounded-lg border-2 border-gray-600 px-10 shadow-lg shadow-purple-700 relative">
      {/* <div className="absolute inset-y-0 left-0 right-0 bg-black opacity-50 h-full z-0"></div> */}
      <div className="flex justify-center relative z-10">
        <Image
          src={"/images/logo.png"}
          width={200}
          height={150}
          alt="logo"
          className="object-cover hidden md:block"
        />
      </div>
      <SpotlightCard>
        {loading ? (
          <>
            <div className="text-center py-8">Loading members...</div>;
          </>
        ) : (
          <>
            <div className="font-semibold relative z-10 text-center">
              Meet our{" "}
              <CountUp
                from={0}
                to={100}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-purple-500 text-xl"
              />
              + Members
            </div>
          </>
        )}

        <div className="relative   z-10">
          <Marquee>
            {members.map((member) => (
              <div key={member.id} className="p-4 flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    unoptimized
                    src={member.avatarUrl}
                    alt={`${member.username}'s avatar`}
                    fill
                    sizes="48px"
                    className="object-cover "
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </SpotlightCard>
    </div>
  );
}
