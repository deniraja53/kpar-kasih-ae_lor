import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';

const BiblicalBasis = () => {
  const characteristics = [
    { text: "Sabar", color: "var(--primary)" },
    { text: "Murah Hati", color: "var(--secondary)" },
    { text: "Tidak Cemburu", color: "var(--accent)" },
    { text: "Tidak Memegahkan Diri", color: "var(--primary)" },
    { text: "Tidak Sombong", color: "var(--secondary)" },
    { text: "Tidak Kasar", color: "var(--accent)" },
    { text: "Tidak Egocentric", color: "var(--primary)" },
    { text: "Tidak Pemarah", color: "var(--secondary)" },
    { text: "Penuh Pengampunan", color: "var(--accent)" }
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 glass-card" style={{ borderRadius: '16px' }}>
          <Heart color="var(--primary)" fill="var(--primary)" size={28} />
        </div>
        <h2 style={{ fontSize: '2.5rem' }}>Karakter Kasih <span style={{ fontSize: '1.2rem', opacity: 0.6, fontWeight: 400 }}>(1 Korintus 13:4-7)</span></h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-8 flex-grow" style={{ marginBottom: '2rem' }}>
        {characteristics.map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card flex items-center gap-4 px-6 py-4"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
            style={{ 
              borderLeft: `8px solid ${item.color}`,
              minHeight: '80px' /* Changed from fixed height to min-height */
            }}
          >
            <CheckCircle2 size={24} color={item.color} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.text}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="p-8 text-center"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(255, 42, 109, 0.05), transparent)', 
          borderRadius: '24px',
          border: '2px dashed var(--secondary)',
          marginTop: '3.5rem'
        }}
      >
        <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--secondary)' }}>
          "Kasih tidak pernah gagal; kasih adalah pengikat yang mempersatukan segalanya."
        </p>
      </motion.div>
    </div>
  );
};

export default BiblicalBasis;
