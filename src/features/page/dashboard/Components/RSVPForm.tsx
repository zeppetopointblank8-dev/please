import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, User, Users, Phone, MessageCircle } from 'lucide-react';

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    grup: '',
    whatsapp: '',
    komentar: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nama: '',
        grup: '',
        whatsapp: '',
        komentar: ''
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section id="rsvp" className="py-16 sm:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4 sm:mb-6 lg:mb-8"
          >
            Best wishes for 
            Dimas & Amel
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto"
          >
          </motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: '#fffdf8' }} // warna form elegan
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <CheckCircle className="text-green-500 mx-auto mb-4 sm:mb-6" size={64} />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-2 sm:mb-4">
                      Terima Kasih!
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                      Ucapan Anda telah berhasil dikirim.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                        <User className="inline mr-2" size={18} className="sm:w-5 sm:h-5" />
                        Nama
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap Anda"
                        required
                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                        <Users className="inline mr-2" size={18} className="sm:w-5 sm:h-5" />
                        Grup
                      </label>
                      <input
                        type="text"
                        name="grup"
                        value={formData.grup}
                        onChange={handleInputChange}
                        placeholder="Keluarga/Teman/Kolega"
                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                        <Phone className="inline mr-2" size={18} className="sm:w-5 sm:h-5" />
                        No WhatsApp
                      </label>
                      <div className="flex">
                        <select className="px-3 py-3 sm:py-4 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 text-sm sm:text-base">
                          <option value="+62">+62</option>
                        </select>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="812345678"
                          className="flex-1 px-4 py-3 sm:py-4 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                        <MessageCircle className="inline mr-2" size={18} className="sm:w-5 sm:h-5" />
                        Ucapan atau Doa
                      </label>
                      <textarea
                        name="komentar"
                        value={formData.komentar}
                        onChange={handleInputChange}
                        placeholder="Berikan ucapan atau doa untuk Dimas & Amel..."
                        rows={4}
                        className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gray-700 to-gold-400 text-white font-semibold py-3 sm:py-4 lg:py-5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      )}
                      {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-12 lg:mt-16 bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10"
          >
            <h3 className="font-script text-2xl sm:text-3xl lg:text-4xl text-gray-800 mb-6 sm:mb-8 text-center">
              Ucapan & Doa
            </h3>
            
            <div className="space-y-4 sm:space-y-6 max-h-80 sm:max-h-96 overflow-y-auto show-scrollbar">
              {[
                {
                  name: 'Keluarga dekat',
                  message: 'Barakallahu Happy wedding Dimas & Amel Semoga sakinah mawaddah warohmah',
                  time: '2 jam yang lalu'
                },
                {
                  name: 'Keluarga Besar',
                  message: 'Selamat menempuh hidup baru, semoga menjadi keluarga yang bahagia dan berkah',
                  time: '5 jam yang lalu'
                },
                {
                  name: 'Teman Kuliah',
                  message: 'Akhirnya menikah juga! Semoga langgeng sampai kakek nenek ya',
                  time: '1 hari yang lalu'
                }
              ].map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-gold-400"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-400 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{msg.name}</h4>
                        <span className="text-xs sm:text-sm text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
    </section>
  );
};

export default RSVPForm;
