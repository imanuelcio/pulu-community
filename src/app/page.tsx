import AnimatedContent from "@/components/animated/animated";
import Particles from "@/components/backgrounds/background";
import Footer from "@/Layouts/Footer";
import MainLayout from "@/Layouts/MainLayout";
import ForumSection from "@/section/Threads";

export default function Home() {
  const jsonLd = {
    "@context": "https://pulu-official.vercel.app/",
    "@type": "Home",
    name: "Pulu Pulu Community",
    description:
      "Web3 Community that shares about how to boost your web3 experience",
  };
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://pulu-official.vercel.app/",
              "@type": "WebPage",
              name: "Page Title",
              description:
                "Web3 Community that shares about how to boost your web3 experience",
            }),
          }}
        />
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
          <AnimatedContent>
            <ForumSection />
          </AnimatedContent>
          <Footer />
        </div>
      </div>
    </>
  );
}
