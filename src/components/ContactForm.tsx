import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactForm({ onEnter }: { onEnter: () => void }) {
  const { ref, inView } = useInView({
    threshold: 0.15,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inView) onEnter();
  }, [inView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 2000);
  };

  const containerVariants = {
  hidden: {
    opacity: 0,
    y: 120,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section 
      ref={ref} 
      className="relative z-10 min-h-screen w-screen flex flex-col items-center justify-center py-12 px-4 sm:px-8" 
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-[#FF6B00]">Get In</span>{' '}
            <span className="text-white">Touch</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur p-6 rounded-lg border border-[#FF6B00]/20">
            <div className="flex items-center gap-4 mb-3">
              <Mail className="w-6 h-6 text-[#FF6B00]" />
              <h3 className="text-lg font-semibold text-white">Email</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">hello@ambravate.com</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur p-6 rounded-lg border border-[#FF6B00]/20">
            <div className="flex items-center gap-4 mb-3">
              <Phone className="w-6 h-6 text-[#FF6B00]" />
              <h3 className="text-lg font-semibold text-white">Phone</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">+1 (555) 123-4567</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur p-6 rounded-lg border border-[#FF6B00]/20">
            <div className="flex items-center gap-4 mb-3">
              <MapPin className="w-6 h-6 text-[#FF6B00]" />
              <h3 className="text-lg font-semibold text-white">Location</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base">Manchester, UK</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur p-6 md:p-8 rounded-lg border border-[#FF6B00]/20"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition"
              placeholder="What is this about?"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition resize-none"
              placeholder="Tell us more about your project..."
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-[#FF6B00] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#e55a00] transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" />
            {isSubmitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>

        {/* Submitted Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center text-green-300"
          >
            Thank you! We'll get back to you soon.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
