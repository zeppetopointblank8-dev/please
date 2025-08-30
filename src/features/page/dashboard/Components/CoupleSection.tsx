import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const CoupleSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section
      id="couple"
      className="section-padding relative text-center text-gray-800"
      style={{
        backgroundImage: `url('/batik.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay biar tetap kebaca */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-5xl md:text-6xl text-gray-800 mb-4"
          >
            The Bride
          </motion.h2>

          {/* Divider sederhana pakai garis | */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-16 text-gray-400 text-2xl"
          >
            <div className="h-px bg-gray-400 flex-1 max-w-32"></div>
            <span>|</span>
            <div className="h-px bg-gray-400 flex-1 max-w-32"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Bride */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-8 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl"
                >
                  <img
                    src="/mel.png"
                    alt="Amel"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>
              
              <h3 className="font-script text-4xl md:text-5xl text-rose-500 mb-4">
                Amel Birohmatika
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Putri dari Bapak Kurnia Food & Ibu Siti Nurhaliza
              </p>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                "Cinta sejati adalah ketika dua hati bertemu dan menjadi satu dalam kebahagiaan dan kesedihan"
              </p>
              
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Groom */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-8 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl"
                >
                  <img
                    src="/dim.jpeg"   // 👉 pakai foto lokal dim.jpeg
                    alt="Dimas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>
              
              <h3 className="font-script text-4xl md:text-5xl text-yellow-600 mb-4">
                Dimas Sinatrya
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Putra dari Bapak Aris Yusanto & Ibu Lilis Triana
              </p>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                "Cinta yang tulus adalah ketika kita rela memberikan yang terbaik untuk orang yang kita sayangi"
              </p>
              
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
