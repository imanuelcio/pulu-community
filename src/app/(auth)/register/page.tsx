"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        toast.success("Registrasi berhasil, silakan login", {
          style: {
            background: "rgba(20, 20, 30, 0.9)",
            color: "#fff",
            border: "1px solid rgba(139, 92, 246, 0.5)",
          },
        });

        // Add a delay to show animation before redirect
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        const data = await res.json();
        toast.error(data.error || "Gagal mendaftar");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  };

  // Form field animation variants
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-purple-600 blur-3xl opacity-20"
        animate={{
          x: [50, -50],
          y: [0, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-blue-600 blur-3xl opacity-10"
        animate={{
          x: [-70, 70],
          y: [40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main form container with animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-xl border border-purple-700/50 relative z-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(20, 20, 30, 0.8), rgba(30, 10, 60, 0.8))",
        }}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute -inset-10 bg-blue-500 opacity-10 blur-3xl rounded-full z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Text with glow effect */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-center mb-8 relative"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Daftar
          </span>
          <motion.div
            className="absolute -inset-1 bg-purple-500 blur-md opacity-30 -z-10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.h2>

        <form onSubmit={handleRegister} className="space-y-6 relative z-10">
          <motion.div
            custom={0}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 border border-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-900/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
            />
          </motion.div>

          <motion.div
            custom={1}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 border border-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-900/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 border border-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-900/20"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </motion.div>

          <motion.div
            custom={3}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition duration-300 overflow-hidden relative group"
              style={{
                background:
                  "linear-gradient(to right, #8B5CF6, #7C3AED, #6D28D9)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20"
                animate={{ left: ["150%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2,
                  repeatDelay: 3,
                }}
              />

              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Daftar"
              )}
            </motion.button>
          </motion.div>

          <motion.div
            custom={4}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              type="button"
              className="w-full py-3 px-4 rounded-lg bg-gray-800/70 hover:bg-gray-700/90 text-white font-medium transition duration-300 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center gap-2 overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => signIn("google")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Daftar dengan Google
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          custom={5}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="text-sm mt-8 text-center text-purple-300"
        >
          Sudah punya akun?{" "}
          <motion.a
            href="/login"
            className="font-medium text-purple-400 hover:text-purple-300 relative"
            whileHover={{
              textShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
            }}
          >
            Login disini
            <motion.span
              className="absolute bottom-0 left-0 w-full h-px bg-purple-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
}
