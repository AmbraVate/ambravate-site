import { motion } from 'motion/react';

interface GlobalLogoHeaderProps {
  sectionTitle: string | null;
}

export function GlobalLogoHeader({ sectionTitle }: GlobalLogoHeaderProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: sectionTitle ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo (never re-animates) */}
      <motion.div
        className="w-20 h-20 flex-shrink-0 overflow-hidden"
        initial={{ scale: 5, x: '50vw', y: '40vh' }}
        animate={{ scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          backgroundImage: 'url(/assets/images/logo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Sliding banner */}
      <motion.div
        key={sectionTitle} // 🔑 forces re-animation ONLY of banner
        className="h-20 flex items-center pl-6 relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: sectionTitle ? '45vw' : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(61, 28, 109, 0.6), rgba(26, 47, 90, 0.4), transparent)',
          }}
        />
        <motion.h2
          className="text-2xl font-medium text-white relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sectionTitle}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
