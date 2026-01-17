import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useHoverCapable } from '../hooks/useHoverCapable';


interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title, description, image }: CardProps) {
  const canHover = useHoverCapable();
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
      onHoverStart={() =>canHover && setIsActive(true)}
      onHoverEnd={() => canHover && setIsActive(false)}
      onClick={() => {
        if (!canHover) setIsActive(v => !v);
      }}
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Image */}
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
        animate={{
          filter: isActive ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </motion.div>

      {/* Title - Always visible initially */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isActive ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="
          text-xl sm:text-2xl md:text-3xl lg:text-4xl
          font-bold text-white text-center
          px-6 py-3
          rounded-md
          bg-black/40
          backdrop-blur-sm
          md:bg-transparent md:backdrop-blur-0"
        >
          {title}
        </h3>

        {!canHover && !isActive && (
          <span className="
            absolute bottom-4 left-1/2 -translate-x-1/2
            text-xs font-medium tracking-wide
            text-white
            bg-black/60
            px-3 py-1
            rounded-full
            backdrop-blur-sm"
          >
            Tap to learn more
          </span>
        )}
      </motion.div>

      {/* Description - Hidden initially, shown on hover */}
      <motion.div
        className="
        absolute inset-0 flex items-center justify-center p-8
        bg-black/60 md:bg-black/40
        backdrop-blur-md"
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

interface ContentBlockProps {
  title: string;
  description: string;
  image: string;
}

function ContentBlock({ title, description, image }: ContentBlockProps) {
  return <Card title={title} description={description} image={image} />;
}

export function WhoWeAre({ onEnter, onLeave }: {
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { ref, inView } = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (inView) onEnter();
    else onLeave();
  }, [inView]);

  const contentBlocks = [
    {
      title: 'Our Mission',
      description:
        'AmbraVate exists to turn bold ideas into reality. We\'re building a world where businesses and people have the tools they need to solve problems that matter. Through smart technology, streamlined workflows, and talented humans working in sync, we make the complex feel simple.',
      image: '/assets/images/mission.png',
    },
    {
      title: 'Our Experience',
      description:
        'AmbraVate has been at the forefront of software innovation, digital entertainment, and education. We\'ve shipped products, built communities, and learned what actually works in the real world. Our team brings battle-tested expertise and fresh perspectives that make a real difference.',
      image: '/assets/images/experience.jpg',
    },
    {
      title: 'Our Approach',
      description:
        'At AmbraVate, we believe in the power of aligned systems. Our approach integrates cutting-edge technology with streamlined processes and empowered people to create solutions that don\'t just work—they excel.',
      image: '/assets/images/approach.png',
    },
  ];

  return (
    <>
      <section
        ref={ref}
        className="relative z-10 min-h-screen px-4 sm:px-8 flex flex-col"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {contentBlocks.map((block, index) => (
                <ContentBlock
                  key={index}
                  title={block.title}
                  description={block.description}
                  image={block.image}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Scroll Indicator */}
        <motion.div
          className="mt-12 sm:mt-20 pb-16 sm:pb-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-sm md:text-base text-[#FF6B00] tracking-widest uppercase font-medium">
            Our Services
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-[#FF6B00]" />
          </motion.div>
        </motion.div>

      </section>
    </>
  );
}
