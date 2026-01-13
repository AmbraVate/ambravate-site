import { motion, useScroll } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface LogoHeaderProps {
  sectionTitle: string;
  isVisible: boolean;
  showMenuBar: boolean;
}

function LogoHeader({ sectionTitle, isVisible, showMenuBar }: LogoHeaderProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-50 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        className="w-20 h-20 bg-[#FF6B00] flex items-center justify-center flex-shrink-0 overflow-hidden"
        initial={{ scale: 5, x: '50vw', y: '40vh' }}
        animate={{ 
          scale: isVisible ? 1 : 5, 
          x: isVisible ? 0 : '50vw', 
          y: isVisible ? 0 : '40vh' 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          backgroundImage: 'url(/src/assets/images/logo.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </motion.div>

      {/* Menu Bar with gradient */}
      <motion.div
        className="h-20 flex items-center pl-6 relative overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: showMenuBar ? '45vw' : 0 }}
        transition={{ duration: 0.5, delay: showMenuBar ? 0 : 0 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(61, 28, 109, 0.6), rgba(26, 47, 90, 0.4), transparent)'
          }}
        />
        <motion.h2 
          className="text-2xl font-medium text-white relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showMenuBar ? 1 : 0 }}
          transition={{ duration: 0.3, delay: showMenuBar ? 0.2 : 0 }}
        >
          {sectionTitle}
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}

interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title, description, image }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg cursor-pointer flex-1 aspect-square"
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
        <h3 className="text-3xl md:text-4xl font-bold text-white text-center px-6">
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
        <p className="text-lg text-gray-100 text-center leading-relaxed">
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

export function OurServices() {
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
  });

  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [showMenuBar, setShowMenuBar] = useState(false);

  // Show logo header when section is in view
  useEffect(() => {
    setIsLogoVisible(inView);
    setShowMenuBar(inView);
  }, [inView]);

  const serviceBlocks = [
    {
      title: 'Game Development',
      description: 'Creating immersive gaming experiences with cutting-edge technology and creative storytelling.',
      image: '/src/assets/images/gamedev.png',
    },
    {
      title: 'Software Development',
      description: 'Building robust, scalable applications tailored to your business needs and goals.',
      image: '/src/assets/images/software.png',
    },
    {
      title: 'Education',
      description: 'Empowering teams and individuals through comprehensive training and knowledge transfer.',
      image: '/src/assets/images/education.png',
    },
    {
      title: 'Click for More',
      description: 'Explore our full range of services and discover how we can help your business thrive.',
      image: '',
    },
  ];

  return (
    <>
      <LogoHeader 
        sectionTitle="Our Services"
        isVisible={isLogoVisible}
        showMenuBar={showMenuBar}
      />
      
      <section ref={containerRef} className="relative z-10 py-20 px-8 min-h-screen flex flex-col items-center justify-center" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className="max-w-7xl mx-auto w-full">
          {/* Cards Grid */}
          <div className="flex gap-8 items-stretch">
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

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
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
