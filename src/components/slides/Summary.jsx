import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, HandHeart, Users } from 'lucide-react';

const Summary = ({ prev }) => {
  const summaries = [
    { icon: <Heart size={24} color="var(--primary)" />, text: "Kasih adalah pilihan sikap dan perbuatan tulus." },
    { icon: <CheckCircle size={24} color="var(--secondary)" />, text: "Karakter kasih: sabar, murah hati, and rendah hati." },
    { icon: <HandHeart size={24} color="var(--accent)" />, text: "Kasih 'Agape' adalah kasih seperti teladan Tuhan Yesus." },
    { icon: <Users size={24} color="var(--secondary)" />, text: "Praktikkan kasih kepada keluarga, teman, and sesama." }
  ];

  return (
    <div className="h-full flex flex-col items-center p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>Rangkuman</h2>
        <p style={{ opacity: 0.8, fontSize: '1.2rem', fontWeight: 500 }}>Poin-poin penting yang sudah kita pelajari hari ini:</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-5 w-full max-w-4xl">
        {summaries.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? -30 : 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.5 }}
            className="glass-card flex items-center gap-5 p-6"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="p-3" style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px' }}>
              {item.icon}
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: '1.3' }}>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-auto text-center p-8"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255, 42, 109, 0.12), rgba(255, 101, 189, 0.12))',
          borderRadius: '40px',
          border: '3px solid var(--glass-border)',
          width: '100%',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          marginTop: '4rem'
        }}
      >
        <p style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 900, marginBottom: '0.5rem', textShadow: '0 0 20px rgba(255,107,107,0.4)' }}>
          Jadilah pembawa Kasih di mana pun kamu berada!
        </p>
        <p style={{ opacity: 0.9, fontSize: '1.1rem', fontWeight: 600 }}>Terima kasih sudah belajar dengan semangat hari ini. Tuhan Yesus memberkati!</p>
      </motion.div>
    </div>
  );
};

export default Summary;
