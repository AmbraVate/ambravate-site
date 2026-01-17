import { motion, useScroll } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title, description, image }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Image */}
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
        animate={{
          filter: isHovered ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Overlay */}
        <div className="w-full h-full bg-black/40" />
      </motion.div>

      {/* Title - Always visible initially */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center px-4 sm:px-6">
          {title}
        </h3>
      </motion.div>

      {/* Description - Hidden initially, shown on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-8"
        animate={{
          opacity: isHovered ? 1 : 0,
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

export function OurServices({ onEnter, onLeave }: {
  onEnter: () => void;
  onLeave: () => void;
}) {
 const { ref, inView } = useInView({ threshold: 0.5 });

  // Show logo header when section is in view
 useEffect(() => {
    if (inView) onEnter();
    else onLeave();
  }, [inView]);

  const serviceBlocks = [
    {
      title: 'Game Development',
      description: 'Creating immersive gaming experiences with cutting-edge technology and creative storytelling.',
      image: '/assets/images/gamedev.png',
    },
    {
      title: 'Software Development',
      description: 'Building robust, scalable applications tailored to your business needs and goals.',
      image: '/assets/images/software.png',
    },
    {
      title: 'Education',
      description: 'Empowering teams and individuals through comprehensive training and knowledge transfer.',
      image: '/assets/images/education.png',
    },
    {
      title: 'Click for More',
      description: 'Explore our full range of services and discover how we can help your business thrive.',
      image: '/assets/images/more.jpg',
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {serviceBlocks.map((block, index) => (
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
            Contact Us
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
