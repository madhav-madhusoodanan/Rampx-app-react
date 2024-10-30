"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const EncryptAnimateButton = ({
  buttonText,
  targetText,
}: {
  buttonText: string;
  targetText: string;
}) => {
  const TARGET_TEXT = targetText;
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;

  const CHARS = "!@#$%^&*():{};|,.<>/?";
  const intervalRef = useRef<any>(null);

  const [text, setText] = useState(buttonText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setText(buttonText);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="w-full group relative overflow-hidden rounded-lg bg-transparent py-2 font-syne font-medium uppercase text-a-fluo/70 transition-colors hover:text-a-fluo"
    >
      <div className="relative z-10 flex items-center w-full">
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-a-fluo/0 from-40% via-a-fluo/100 to-a-fluo/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default EncryptAnimateButton;
