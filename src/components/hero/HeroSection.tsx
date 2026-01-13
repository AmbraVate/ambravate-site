// src/components/hero/HeroSection.tsx
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollClick?: () => void;
}

export function HeroSection({ onScrollClick }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      {/* Main Content */}
      <motion.div
        className="flex flex-col items-center justify-center gap-6 px-8 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter">
            <span className="text-[#FF6B00]">A</span>
            <span className="text-black dark:text-white">mbra</span>
            <span className="text-[#FF6B00]">V</span>
            <span className="text-black dark:text-white">ate</span>
          </h1>
        </motion.div>

        {/* Secondary Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-lg md:text-xl text-[#FF6B00] font-semibold tracking-wide uppercase">
            Technology • Process • People
          </p>
        </motion.div>

        {/* Main Subtitle */}
        <motion.div variants={itemVariants} className="max-w-4xl px-4 py-2">
          <motion.p
            className="text-2xl md:text-4xl text-center font-bold leading-relaxed"
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
            Solving Problems Intelligently
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="max-w-2xl">
          <p className="text-lg md:text-xl text-center text-gray-300 leading-relaxed">
            An integrated platform powering innovation across technology solutions, digital entertainment, and educational excellence
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Bottom */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <p className="text-sm md:text-base text-[#FF6B00] tracking-widest uppercase font-medium">
          Discover More
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-[#FF6B00]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
