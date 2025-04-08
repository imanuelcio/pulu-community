"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Particle animation component

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Login gagal: " + res.error, {
          style: {
            background: "rgba(20, 20, 30, 0.9)",
            color: "#fff",
            border: "1px solid rgba(139, 92, 246, 0.5)",
          },
        });
      } else {
        toast.success("Login berhasil", {
          style: {
            background: "rgba(20, 20, 30, 0.9)",
            color: "#fff",
            border: "1px solid rgba(139, 92, 246, 0.5)",
          },
        });

        // Add a small delay before redirect
        setTimeout(() => {
          router.push("/");
        }, 800);
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
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-blue-600 blur-3xl opacity-20"
        animate={{
          x: [-70, 70],
          y: [20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-purple-600 blur-3xl opacity-10"
        animate={{
          x: [100, -100],
          y: [-50, 50],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Neural network style connections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              width: "100%",
              top: `${15 + i * 20}%`,
              left: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

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

        {/* Cyber lines effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              scaleX: [0, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              scaleX: [0, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 7,
              delay: 1,
            }}
          />
        </div>

        {/* Text with glow effect */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-center mb-8 relative"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Login
          </span>
          <motion.div
            className="absolute -inset-1 bg-purple-500 blur-md opacity-30 -z-10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.h2>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <motion.div
            custom={0}
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
            custom={1}
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
            custom={2}
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
                "Login"
              )}
            </motion.button>
          </motion.div>

          <motion.div
            custom={3}
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
              Login with Google
            </motion.button>
          </motion.div>
        </form>

        {/* Forgot password link with animation */}
        <motion.div
          custom={4}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 text-center"
        >
          <motion.a
            href="#"
            className="text-sm text-purple-400 hover:text-purple-300"
            whileHover={{
              textShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
            }}
          >
            Lupa password?
          </motion.a>
        </motion.div>

        <motion.p
          custom={5}
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          className="text-sm mt-6 text-center text-purple-300"
        >
          Belum punya akun?{" "}
          <motion.a
            href="/register"
            className="font-medium text-purple-400 hover:text-purple-300 relative"
            whileHover={{
              textShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
            }}
          >
            Daftar disini
            <motion.span
              className="absolute bottom-0 left-0 w-full h-px bg-purple-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.p>

        {/* Corner decoration - cyber style */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-60">
          <motion.div
            className="absolute top-0 right-0 w-px h-8 bg-purple-500"
            animate={{ height: [0, 16], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
          <motion.div
            className="absolute top-0 right-0 w-8 h-px bg-purple-500"
            animate={{ width: [0, 16], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              delay: 0.3,
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden opacity-60">
          <motion.div
            className="absolute bottom-0 left-0 w-px h-8 bg-purple-500"
            animate={{ height: [0, 16], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-8 h-px bg-purple-500"
            animate={{ width: [0, 16], opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5,
              delay: 1.3,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
