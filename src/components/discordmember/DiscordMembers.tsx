// src/components/DiscordMembers.tsx

"use client";
import Marquee from "react-fast-marquee";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CountUp from "../countUp/CountUp";
import SpotlightCard from "../spotlightCard/SpotlightCard";
import Spinner from "../spinner/LoadingSpinner";

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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full width
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Particles configuration
    const particlesArray: Particle[] = [];
    const numberOfParticles = 50;

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    // Connect particles with lines
    function connect() {
      if (!ctx) return;
      const maxDistance = 100;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connect();
      requestAnimationFrame(animate);
    }

    init();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto py-8 rounded-lg border-2 p-4 bg-gradient-to-r from-blue-900 to-purple-900 relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
      {/* <SpotlightCard> */}
      {loading ? (
        <>
          <Spinner />
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
    </div>
  );
}
