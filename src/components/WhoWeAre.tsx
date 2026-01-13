import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface ContentBlockProps {
  title: string;
  description: string;
  imagePosition: 'left' | 'right';
}

function ContentBlock({ title, description, imagePosition }: ContentBlockProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerClass = imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div
      ref={ref}
      className={`flex ${containerClass} gap-12 items-center py-20`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Image Placeholder */}
      <div className="flex-1">
        <div className="w-full aspect-square bg-gradient-to-br from-[#3d1c6d] to-[#1a2f5a] rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-lg">Image</p>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col gap-4">
        <h3 className="text-4xl md:text-5xl font-bold">
          <span className="text-[#FF6B00]">{title.charAt(0)}</span>
          <span className="text-white">{title.slice(1)}</span>
        </h3>
        <p className="text-lg text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function WhoWeAre() {
  const contentBlocks = [
    {
      title: 'Mission',
      description:
        'We are driven by a commitment to innovate and deliver transformative solutions. Our mission is to empower businesses and individuals by leveraging cutting-edge technology, streamlined processes, and talented people to solve complex challenges intelligently.',
      imagePosition: 'left' as const,
    },
    {
      title: 'Experience',
      description:
        'With years of expertise across software development, digital entertainment, and educational initiatives, we have built a foundation of deep knowledge. Our team brings diverse perspectives and proven track records in delivering impactful projects that drive real results.',
      imagePosition: 'right' as const,
    },
    {
      title: 'Approach',
      description:
        'We believe in a holistic approach that combines strategic thinking, technical excellence, and human-centered design. By integrating technology, process optimization, and talented people, we create solutions that are not just effective, but sustainable and scalable.',
      imagePosition: 'left' as const,
    },
  ];

  return (
    <section className="relative z-10 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#FF6B00]">W</span>
            <span className="text-white">ho </span>
            <span className="text-white">W</span>
            <span className="text-[#FF6B00]">e</span>
            <span className="text-white"> </span>
            <span className="text-white">A</span>
            <span className="text-[#FF6B00]">r</span>
            <span className="text-white">e</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Understanding our foundation, values, and vision
          </p>
        </motion.div>

        {/* Content Blocks */}
        <div className="space-y-16">
          {contentBlocks.map((block, index) => (
            <ContentBlock
              key={index}
              title={block.title}
              description={block.description}
              imagePosition={block.imagePosition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
