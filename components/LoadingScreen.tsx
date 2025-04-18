"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing systems...');

  const loadingPhrases = [
    'Initializing systems...',
    'Loading 3D environment...',
    'Establishing neural links...',
    'Calibrating cyber protocols...',
    'Synchronizing quantum matrix...',
  ];

  useEffect(() => {
    let currentPhrase = 0;
    const phraseInterval = setInterval(() => {
      currentPhrase = (currentPhrase + 1) % loadingPhrases.length;
      setLoadingText(loadingPhrases[currentPhrase]);
    }, 2000);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(phraseInterval);
          onLoadingComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="w-full max-w-md p-8 text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="mb-8 flex justify-center"
        >
          <Terminal className="h-16 w-16 text-primary" />
        </motion.div>

        <div className="glitch mb-4 text-4xl font-bold" data-text="CYBER_DEV">
          <span className="text-primary">Dev</span>
          <span className="text-white">Portfolio</span>
        </div>

        <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="relative h-6">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-sm text-muted-foreground"
          >
            {loadingText}
          </motion.p>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {progress}% Complete
        </p>
      </div>
    </motion.div>
  );
}
