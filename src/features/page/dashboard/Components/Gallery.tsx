import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/embed/64ojWgAzl94?si=p_O8AmmEuhhXEAIk',
      title: 'Video Pre-wedding 1',
      description: 'Tidak ada yang kebetulan di dunia ini. Semua sudah tersusun rapih oleh Sang Maha Kuasa. Begitupun kita yang sama sama memiliki luka di masa lalu akhirnya menemukan cinta baru di pertengahan 2023 yang akhirnya menyembuhkan dan saling melengkapi',
      reverse: false // video kiri, text kanan
    },
    {
      id: 2,
      url: 'https://www.youtube.com/embed/4DGkMyQYyac?si=ODpvVlW1WOCEERFa',
      title: 'Video Pre-wedding 2',
      description: 'Benar kata pepatah, bukan karena bertemu lalu berjodoh, tapi karena berjodohlah kami dipertemukan. Maka kami memutuskan mulai membawa hubungan ini ke jenjang yang lebih serius pada Akhir 2026',
      reverse: true // video kanan, text kiri
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-5xl md:text-6xl text-gray-800 mb-4"
          >
            Our Videos
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Momen-momen indah perjalanan cinta kami
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col gap-16"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                video.reverse ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Video */}
              <div className="w-full md:w-1/2 aspect-video">
                <iframe
                  className="w-full h-full rounded-2xl shadow-lg"
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Deskripsi */}
              <div className="w-full md:w-1/2 text-gray-700">
                <h3 className="font-script text-3xl text-gray-800 mb-4">
                  {video.title}
                </h3>
                <p className="text-lg">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
