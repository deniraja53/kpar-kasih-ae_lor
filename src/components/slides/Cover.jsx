import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Star, ChevronRight } from 'lucide-react';

const Cover = ({ next }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative" style={{ display: 'inline-block' }}>
          <Heart size={150} color="var(--primary)" fill="var(--primary)" style={{ filter: 'drop-shadow(0 0 30px rgba(255,107,107,0.5))' }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute"
            style={{ top: '10px', right: '-20px' }}
          >
            <Star size={56} color="var(--accent)" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 15px rgba(255,230,109,0.6))' }} />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ 
          fontSize: '6rem', 
          lineHeight: 1,
          background: 'linear-gradient(135deg, #fff 30%, var(--primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.3))'
        }}
      >
        KASIH
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.8 }}
        style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4rem', color: 'var(--secondary)' }}
      >
        Pendidikan Agama Kristen • Kelas 5 SD
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-8 mb-12"
      >
        <div className="flex items-center gap-6 glass-card p-6" style={{ borderRadius: '24px' }}>
          <BookOpen size={32} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>Tujuan: Memahami & Mempraktikkan Kasih</span>
        </div>
      </motion.div>

      <motion.button 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="btn-primary" 
        onClick={next} 
        style={{ fontSize: '1.6rem' }}
      >
        Mulai Belajar <ChevronRight size={28} />
      </motion.button>
    </div>
  );
};

export default Cover;
