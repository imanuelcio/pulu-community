// components/ForumSection.tsx
"use client";
import BlurText from "@/components/blurTextAnimation";
import { processThreadsData, ThreadData } from "@/lib/discordUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

const ForumSection = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(threads);
  useEffect(() => {
    const fetchThreads = async () => {
      const res = await fetch("/api/discord/threads");
      const data = await res.json();
      // const processedData = processThreadsData(data);
      setThreads(data.threads);
      setLoading(false);
    };

    fetchThreads();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forum-section">
      <div className="flex justify-center py-10 md:py-0 md:pb-10">
        <BlurText
          text="🤖Forum Airdrop🤖"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-2xl md:text-5xl font-semibold m:mb-8"
        />
      </div>
      <div className="grid pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {threads.slice(0, 9).map((thread, index) => (
          <div key={index} className="p-4 bg-black border rounded-lg shadow-md">
            {/* <img
              src={thread.profilePicture}
              alt={`${thread.username} profile`}
              className="w-12 h-12 rounded-full"
            /> */}
            <h3 className="mt-2 text-xl font-semibold text-purple-500">
              {thread.name}
            </h3>
            <span className="flex text-[12px] gap-1">
              <p className="text-gray-200">Sudah ada total</p>
              <p className="text-gray-600">{thread.message_count}</p>
              <p className="text-gray-200">pesan diskusi</p>
            </span>
            <Link
              target="_blank"
              href={`/forum/${thread.id}`}
              className="text-blue-500 hover:underline"
            >
              View Thread
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;
