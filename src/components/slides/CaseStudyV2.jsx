import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessagesSquare } from 'lucide-react';

const CaseStudyV2 = () => {
  return (
    <div className="h-full flex flex-col p-6 w-full">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-5 mb-8"
      >
        <div className="p-4 glass-card" style={{ borderRadius: '16px', background: 'rgba(255, 42, 109, 0.2)', border: '1px solid var(--primary)' }}>
          <HelpCircle color="var(--accent)" size={32} />
        </div>
        <h2 style={{ fontSize: '2.5rem', textShadow: '0 0 20px rgba(255, 42, 109, 0.6)' }}>Studi Kasus</h2>
      </motion.div>

      {/* Main Content: Separated Blocks */}
      <div className="flex flex-col gap-10 w-full">
        
        {/* Block 1: Scenario Only */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 relative"
          style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '12px solid var(--primary)', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(255, 42, 109, 0.2)' }}
        >
          <div className="absolute" style={{ top: '-18px', left: '40px', background: 'var(--primary)', padding: '6px 20px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '1.5px', boxShadow: '0 0 20px var(--primary)' }}>
            SKENARIO
          </div>
          <p style={{ fontSize: '1.5rem', lineHeight: '1.8', fontWeight: 500, marginTop: '1rem' }}>
            "Saat jam istirahat, kamu melihat seorang teman baru yang duduk sendirian di pojok kelas. 
            Ia terlihat sedih dan tidak membawa bekal makanan. Teman-teman yang lain sedang asyik bermain sendiri."
          </p>
        </motion.div>

        {/* Block 2: Options Grid (Separated) */}
        <div className="grid grid-cols-2 gap-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className="glass-card p-8"
            style={{ border: '3px solid var(--secondary)', background: 'linear-gradient(145deg, rgba(255, 101, 189, 0.1), transparent)' }}
          >
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem', fontSize: '1.3rem' }}>Opsi Kasih A:</h4>
            <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: '1.6' }}>Menghampirinya, mengajaknya berkenalan, dan berbagi bekal makananmu dengannya.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            className="glass-card p-8"
            style={{ border: '3px solid var(--primary)', background: 'linear-gradient(145deg, rgba(255, 42, 109, 0.1), transparent)' }}
          >
            <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.3rem' }}>Opsi Kasih B:</h4>
            <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: '1.6' }}>Mengajaknya bergabung bermain bersama teman-teman yang lain agar ia tidak merasa kesepian.</p>
          </motion.div>
        </div>

      </div>

      {/* Footer: Discussion */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center gap-8 p-8 w-full"
        style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '2px solid var(--glass-border)' }}
      >
        <div className="p-4" style={{ background: 'rgba(255, 42, 109, 0.15)', borderRadius: '16px', border: '1px solid rgba(255, 42, 109, 0.3)' }}>
          <MessagesSquare size={32} color="var(--primary)" />
        </div>
        <p style={{ fontSize: '1.3rem', opacity: 0.9 }}>
          <strong>Diskusi:</strong> Menurutmu, tindakan mana yang paling menunjukkan kasih?
        </p>
      </motion.div>
    </div>
  );
};

export default CaseStudyV2;
