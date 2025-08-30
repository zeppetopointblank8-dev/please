import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import { Cinzel } from 'next/font/google';

// Load Google Font Cinzel
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface WelcomeScreenProps {
  onOpenInvitation: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenInvitation }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/30 text-2xl"
            initial={{ y: -50, x: Math.random() * window.innerWidth, rotate: 0 }}
            animate={{
              y: '110vh',
              x: Math.random() * window.innerWidth,
              rotate: 360,
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            🍂
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="text-center text-white z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1
            className={`${cinzel.className} text-6xl md:text-8xl mb-4 drop-shadow-md`}
          >
            Dimas & Amel
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-white/40 flex-1"></div>
            <div className="text-sm uppercase tracking-widest text-white/60">
              Wedding Invitation
            </div>
            <div className="h-px bg-white/40 flex-1"></div>
          </div>

          <p className="text-xl md:text-2xl font-light text-white/80 mb-2">
            Mengundang Anda dalam Acara Pernikahan Kami
          </p>

          <div className="flex items-center justify-center gap-2 text-lg text-white">
            <Calendar size={20} />
            <span>15 Februari 2025</span>
          </div>
        </motion.div>

        {/* Tombol Undangan */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={onOpenInvitation}
            className="relative overflow-hidden rounded-full shadow-lg border border-white/60
                       px-12 py-4 text-lg text-white font-medium
                       transition-all duration-300
                       bg-transparent
                       hover:bg-red-600 hover:border-red-600
                       active:bg-red-800 active:border-red-800"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail size={20} />
              Buka Undangan
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
