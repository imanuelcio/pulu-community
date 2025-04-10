"use client";
import DiscordMembers from "@/components/discordmember/DiscordMembers";
import Modal from "@/components/modal/Modal";
import RotatingText from "@/components/rotatingText/rotatingText";
import SpotlightCard from "@/components/spotlightCard/SpotlightCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="flex flex-col min-h-screen justify-center space-y-5">
      <div className="md:grid md:grid-cols-2 flex flex-col">
        <div className="flex flex-col place-items-center gap-2 justify-center space-y-3">
          <Image
            src={"/images/logo.png"}
            width={200}
            height={150}
            alt="logo"
            className="object-cover block md:hidden" // bg-gradient-to-r from-blue-900 to-purple-900
          />
          <span className="pointer-events-none  z-10 whitespace-pre-wrap bg-gradient-to-r from-blue-500 via-purple-900 to-white animate-pulse bg-clip-text text-center text-4xl md:text-5xl font-bold leading-none tracking-tighter text-transparent">
            Welcome to Pulu Pulu
          </span>
          <SpotlightCard>
            <div className="w-full p-4 border border-white rounded-lg space-y-2">
              <p className="font-semibold">
                Boost Your Experience by joinning our community!
              </p>
              <p className="mb-2 text-sm text-gray-400">
                Get daily airdrop information & 24/7 active community members.
              </p>
              <RotatingText
                onClick={() => window.open("https://discord.gg/Pulu")}
                texts={[
                  "Join Our Community!",
                  "Airdrop!",
                  "Node Tutorial!",
                  "Learning By Doing!",
                ]}
                mainClassName="px-2 cursor-pointer sm:px-2 md:px-3 bg-gradient-to-r from-blue-500 via-purple-900 to-white animate-pulse font-semibold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </SpotlightCard>
          <div
            className="flex gap-2 mt-5 animate-bounce cursor-pointer"
            onClick={() => window.open("https://twitter.com/PuluNetwork")}
          >
            <Image
              src={"/icons/twitter.svg"}
              alt="discord"
              width={50}
              height={50}
              className="bg-white object-cover rounded-xl hover:bg-pink-500"
            />
            <span>
              <p className="text-pink-300">Follow our X</p>
              <p className="text-gray-400">@PuluNetwork</p>
            </span>
          </div>
        </div>
        <div className="mx-auto flex flex-col p-4 w-[400px] place-items-center border-white rounded-lg items-center space-y-5">
          <DiscordMembers />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
