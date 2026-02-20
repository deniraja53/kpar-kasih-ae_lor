import React from 'react';
import { motion } from 'framer-motion';
import { Smile, HandHeart, MessageCircle } from 'lucide-react';

const Concept = () => {
  const points = [
    { 
      icon: <Smile size={48} color="var(--primary)" />, 
      title: "Kasih Itu Sikap Hati", 
      desc: "Bukan hanya perasaan, tapi pilihan tulus untuk berbuat baik kepada orang lain setiap saat." 
    },
    { 
      icon: <HandHeart size={48} color="var(--secondary)" />, 
      title: "Agape (Kasih Allah)", 
      desc: "Kasih yang tulus dan tanpa syarat, seperti kasih Tuhan Yesus kepada kita semua." 
    },
    { 
      icon: <MessageCircle size={48} color="var(--accent)" />, 
      title: "Kasih dalam Perbuatan", 
      desc: "Kasih yang nyata lewat tindakan kecil, bantuan, dan kata-kata yang membangun." 
    }
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <motion.h2 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}
      >
        Apa itu <span style={{ color: 'var(--primary)', textShadow: '0 0 20px rgba(255, 42, 109, 0.5)' }}>Kasih</span>?
      </motion.h2>
      
      <div className="grid grid-cols-3 gap-10" style={{ marginTop: '1.5rem' }}>
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.3 }}
            className="glass-card p-6 flex flex-col items-center text-center"
            whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.08)' }}
            style={{ borderBottom: `6px solid ${i === 0 ? 'var(--primary)' : i === 1 ? 'var(--secondary)' : 'var(--accent)'}` }}
          >
            <div className="mb-5 p-4" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>{p.icon}</div>
            <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#fff' }}>{p.title}</h3>
            <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.6' }}>{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-auto p-6"
        style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid var(--glass-border)', marginTop: '4rem' }}
      >
        <p className="text-center" style={{ fontStyle: 'italic', fontSize: '1.1rem', opacity: 0.9 }}>
          "Barangsiapa tidak mengasihi, ia tidak mengenal Allah, sebab <strong style={{ color: 'var(--primary)' }}>Allah adalah kasih</strong>." (1 Yohanes 4:8)
        </p>
      </motion.div>
    </div>
  );
};

export default Concept;
