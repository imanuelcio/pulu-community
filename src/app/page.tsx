import AnimatedContent from "@/components/animated/animated";
import Particles from "@/components/backgrounds/background";
import { Button } from "@/components/ui/button";
import MainLayout from "@/Layouts/MainLayout";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Particles Background */}
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        alphaParticles={true}
        particleColors={["#b148d9", "#aa6bc2", "#380f47", "#2f1e36"]}
        className="fixed inset-0 z-0" // Ensure particles are fixed
      />
      {/* Content on top of the particles */}
      <div className="relative z-10 flex items-center flex-col justify-center h-full text-white">
        <AnimatedContent>
          <MainLayout />
        </AnimatedContent>
      </div>
    </div>
  );
}
