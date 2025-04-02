import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ThreadCards = ({ threads }: any) => {
  return (
    <div className="grid pb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {threads.slice(0, 9).map((thread: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden p-5 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 group-hover:from-purple-300 group-hover:to-purple-500 transition-all duration-300">
                {thread.name}
              </h3>

              <span className="flex items-center px-2 py-1 bg-purple-900/20 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-1.5 animate-pulse"></div>
                <p className="text-xs text-gray-300">{thread.message_count}</p>
              </span>
            </div>

            <div className="mt-2">
              <span className="inline-flex text-xs gap-1 text-gray-400 mb-4">
                <p>Sudah ada total</p>
                <p className="font-medium text-gray-300">
                  {thread.message_count}
                </p>
                <p>pesan diskusi</p>
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-800">
              <Link
                target="_blank"
                href={`/forum/${thread.id}`}
                className="flex justify-between items-center group/link"
              >
                <span className="text-sm font-medium text-blue-400 group-hover/link:text-blue-300 transition-colors duration-200">
                  View Thread
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-400 transform group-hover/link:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default ThreadCards;
