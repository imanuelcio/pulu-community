// components/ForumSection.tsx
"use client";
import BlurText from "@/components/blurTextAnimation";
import Spinner from "@/components/spinner/LoadingSpinner";
import ThreadCards from "@/components/threadCard/ThreadCard";
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
    return <Spinner />;
  }

  return (
    <div className="forum-section">
      <div className="flex justify-center py-10 md:py-0 md:pb-10">
        <BlurText
          text="🤖 Latest Airdrop 🤖"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-2xl md:text-5xl font-semibold m:mb-8"
        />
      </div>
      <ThreadCards threads={threads} />
    </div>
  );
};

export default ForumSection;
