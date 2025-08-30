import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Import font dari Google Fonts */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <section
        className="min-h-screen flex items-center justify-center text-center relative px-4 sm:px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {/* Tanggal Vertikal - Hidden on mobile, adjusted positioning for tablet+ */}
        <div className="hidden md:block absolute top-1/2 left-4 lg:left-8 -translate-y-1/2 text-white text-2xl lg:text-4xl font-light space-y-2 tracking-wide">
          <div>07</div>
          <div>09</div>
          <div>25</div>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col items-center text-white max-w-4xl w-full space-y-8 sm:space-y-10">
          {/* Tanggal Horizontal untuk Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:hidden flex space-x-6 text-2xl font-light tracking-wide mb-4"
          >
            <span>07</span>
            <span>•</span>
            <span>09</span>
            <span>•</span>
            <span>25</span>
          </motion.div>

          {/* Nama */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-widest font-light">
              DIMAS
            </h1>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <div className="w-12 sm:w-16 h-px bg-white/50"></div>
              <span className="text-base sm:text-lg tracking-wide">AND</span>
              <div className="w-12 sm:w-16 h-px bg-white/50"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-widest font-light">
              AMEL
            </h1>
            <p className="text-xs sm:text-sm md:text-base mt-3 sm:mt-4 tracking-wide uppercase opacity-90">
              Jakarta | Indonesia
            </p>
          </motion.div>

          {/* Ayat Al-Quran */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center text-white space-y-4 sm:space-y-5 max-w-full px-2 sm:px-4"
          >
            <p className="text-white/80 text-xs sm:text-sm md:text-base tracking-wide">
              (QS. AR-RUM AYAT 21)
            </p>
            
            {/* Ayat Arab */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-normal" 
                 style={{ fontFamily: "'Amiri', 'Times New Roman', serif", direction: "rtl" }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
                لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ
                إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
              </p>
            </div>
            
            {/* Terjemahan */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-white/90 italic text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu merasa
                tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
                sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
                tanda-tanda bagi kaum yang berpikir."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;