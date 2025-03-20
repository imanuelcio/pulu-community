import { Button } from "@/components/ui/button";
import React from "react";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center space-y-5">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        Pulu Pulu Community
      </span>
      <Button className="cursor-pointer ">Join our community!</Button>
    </div>
  );
};

export default MainLayout;
