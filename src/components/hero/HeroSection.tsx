// src/components/hero/HeroSection.tsx
import { motion } from 'motion/react';
import { Bold, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollClick?: () => void;
}

export function HeroSection({ }: HeroSectionProps) {
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
    <div className="h-screen w-screen flex flex-col items-center justify-between relative py-12" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      {/* Top Third - Title */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter">
            <span className="text-[#FF6B00]">A</span>
            <span className="text-white">mbra</span>
            <span className="text-[#FF6B00]">V</span>
            <span className="text-white">ate</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Middle Third - Tagline and Subtitle */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center gap-6 px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Secondary Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-[#FF6B00] font-semibold tracking-wide uppercase">
            Technology | Process | People
          </p>
        </motion.div>

        {/* Main Subtitle */}
        <motion.div variants={itemVariants} className="max-w-3xl px-4 sm:px-8 py-6">
          <motion.p
            className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-center font-bold"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #ffffff 0%, #FF6B00 25%, #ffffff 50%, #FF6B00 75%, #ffffff 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.4',
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
      </motion.div>

      {/* Bottom Third - Description and Scroll Indicator */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-between gap-8 px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Description */}
        <motion.div variants={itemVariants} className="max-w-2xl px-4 sm:px-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-300 leading-relaxed">
           We help organizations unlock growth through aligned Tech + Process + People.
          </p>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-300 leading-relaxed">
             Trusted guidance to build scalable systems, teams, and products.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 group"
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
      </motion.div>
    </div>
  );
}
