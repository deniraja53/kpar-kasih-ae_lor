import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeDeciduous, Info, X, Heart } from 'lucide-react';

const InteractiveTree = () => {
  const [selectedLeaf, setSelectedLeaf] = useState(null);

  const leaves = [
    { 
      id: 1, 
      pos: { top: '30%', left: '46%' }, 
      title: "Kasih Orang Tua", 
      color: "var(--primary)",
      fact: "Orang tua merawat kita tanpa kenal lelah karena kasih mereka yang tulus dan pengorbanan yang besar." 
    },
    { 
      id: 2, 
      pos: { top: '42%', left: '58%' }, 
      title: "Kasih Teman", 
      color: "var(--secondary)",
      fact: "Menghibur teman yang sedih dan berbagi mainan adalah bentuk nyata kasih dalam pertemanan." 
    },
    { 
      id: 3, 
      pos: { top: '48%', left: '35%' }, 
      title: "Kasih Guru", 
      color: "var(--accent)",
      fact: "Guru dengan sabar membimbing kita agar menjadi anak yang pintar dan berkarakter Kristus." 
    },
    { 
      id: 4, 
      pos: { top: '25%', left: '52%' }, 
      title: "Kasih Sesama", 
      color: "var(--primary)",
      fact: "Membantu orang yang kesulitan tanpa membedakan latar belakang adalah wujud kasih Agape." 
    }
  ];

  return (
    <div className="h-full flex flex-col items-center relative p-4">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}
      >
        Pohon Kasih Interaktif
      </motion.h2>
      <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '1rem' }}>Sentuh "buah kasih" pada pohon untuk melihat pesannya!</p>

      <div className="relative flex justify-center items-center" style={{ width: '400px', height: '320px' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <TreeDeciduous size={320} color="var(--secondary)" strokeWidth={1} fill="rgba(255, 105, 180, 0.15)" />
        </motion.div>
        
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedLeaf(leaf)}
            className="absolute shadow-lg"
            style={{
              top: leaf.pos.top,
              left: leaf.pos.left,
              background: leaf.color,
              width: '28px',
              height: '28px',
              borderRadius: '50% 0 50% 50%',
              transform: 'rotate(45deg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white'
            }}
          >
            <Heart size={12} color="white" fill="white" style={{ transform: 'rotate(-45deg)' }} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedLeaf && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="glass-card absolute"
            style={{ 
              bottom: '40px',
              width: '90%',
              maxWidth: '550px',
              padding: '1.8rem',
              textAlign: 'center',
              background: 'rgba(15, 23, 42, 0.85)',
              border: `3px solid ${selectedLeaf.color}`,
              zIndex: 100
            }}
          >
            <button 
              onClick={() => setSelectedLeaf(null)}
              className="absolute nav-btn"
              style={{ top: '10px', right: '10px', width: '35px', height: '35px' }}
            >
              <X size={18} />
            </button>
            <h3 style={{ color: selectedLeaf.color, fontSize: '1.5rem', marginBottom: '0.8rem' }}>{selectedLeaf.title}</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5', opacity: 0.9 }}>{selectedLeaf.fact}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTree;
