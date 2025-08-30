import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // animasi hanya sekali saat masuk view

  useEffect(() => {
    const weddingDate = new Date('2025-09-06T10:00:00+07:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6">
        {/* Judul muncul saat scroll ke sini */}
        <motion.h2
          className="font-playfair text-4xl md:text-5xl mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          WEDDING COUNTDOWN
        </motion.h2>

        {/* Countdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
            >
              <span className="text-5xl font-bold">{value}</span>
              <span className="mt-2 text-lg">
                {unit === 'days'
                  ? 'Hari'
                  : unit === 'hours'
                  ? 'Jam'
                  : unit === 'minutes'
                  ? 'Menit'
                  : 'Detik'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tombol */}
        <motion.button
          className="mt-10 border border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          SAVE THE DATE
        </motion.button>
      </div>
    </section>
  );
};

export default CountdownSection;
