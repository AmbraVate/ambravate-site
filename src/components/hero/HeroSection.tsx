// src/components/hero/HeroSection.tsx
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollClick?: () => void;
}

export function HeroSection({ onScrollClick }: HeroSectionProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      {/* Top Third - Title */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="text-[#FF6B00]">A</span>
          <span className="text-black dark:text-white">mbra</span>
          <span className="text-[#FF6B00]">V</span>
          <span className="text-black dark:text-white">ate</span>
        </h1>
      </motion.div>

      {/* Middle Third - Subtitle */}
      <motion.div
        className="flex-1 flex items-center justify-center px-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.p
          className="text-xl md:text-2xl text-center font-extrabold"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #ffffff 0%, #FF6B00 25%, #ffffff 50%, #FF6B00 75%, #ffffff 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          Aligning Technology, Process, and People to Solve Problems Intelligently
        </motion.p>
      </motion.div>

      {/* Bottom Third - Scroll Indicator */}
      <motion.div
        className="flex-1 flex items-center justify-center cursor-pointer group"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        onClick={onScrollClick}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#FF6B00] text-lg font-medium group-hover:text-[#FF8533] transition-colors">
            Discover More
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-8 h-8 text-[#FF6B00]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
