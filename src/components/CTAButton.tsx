import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text?: string;
  onClick?: () => void;
}

export function CTAButton({ text = "Explore Our Solutions", onClick }: CTAButtonProps) {
  return (
    <motion.button
      className="group relative px-10 py-4 bg-[#FF6B00] text-white font-bold text-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="relative flex items-center gap-3">
        {text}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </span>
    </motion.button>
  );
}
