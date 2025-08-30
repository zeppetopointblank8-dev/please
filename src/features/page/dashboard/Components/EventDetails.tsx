import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EventDetails: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="events"
      className="relative bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/event.jpg')" }}
    >
      {/* Overlay tipis biar teks kebaca */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Judul */}
        <motion.h2
          className="text-4xl md:text-5xl font-playfair text-rose-700 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Wedding Ceremonial
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto text-rose-700">
          {/* Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4">AKAD NIKAH</h3>
            <hr className="border-rose-300 w-40 mx-auto mb-4" />
            <p className="mb-2">Ahad, 07 September 2025</p>
            <p className="mb-2">08.00 WIB - Selesai</p>
            <p className="font-semibold mb-1">GRAHA POS INDONESIA</p>
            <p className="text-sm mb-4">Jl. Banda No. 30, Citarum, Kota Bandung</p>
            <a
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-rose-400 text-rose-500 px-4 py-2 text-sm hover:bg-rose-500 hover:text-white transition"
            >
              📍 OPEN MAPS
            </a>
          </motion.div>

          {/* Resepsi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4">RESEPSI</h3>
            <hr className="border-rose-300 w-40 mx-auto mb-4" />
            <p className="mb-2">Ahad, 07 September 2025</p>
            <p className="mb-2">11.00 - 14.00 WIB</p>
            <p className="font-semibold mb-1">GRAHA POS INDONESIA</p>
            <p className="text-sm mb-4">Jl. Banda No. 30, Citarum, Kota Bandung</p>
            <a
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-rose-400 text-rose-500 px-4 py-2 text-sm hover:bg-rose-500 hover:text-white transition"
            >
              📍 OPEN MAPS
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
