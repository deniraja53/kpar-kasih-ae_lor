import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight,
  Star, Heart, CheckCircle2, AlertCircle, RotateCcw
} from 'lucide-react';

/* ── Data ────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, title: 'Korban di Tepi Jalan',   img: '/images/samaria-1.jpg' },
  { id: 2, title: 'Orang Lewi Berlalu',      img: '/images/samaria-2.jpg' },
  { id: 3, title: 'Orang Samaria Menolong',  img: '/images/samaria-3.jpg' },
  { id: 4, title: 'Kasih yang Berkorban',    img: '/images/samaria-4.jpg' },
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

/* ── Slot component ──────────────────────────────────────── */
function Slot({ index, filled, slotRef }) {
  return (
    <div
      ref={slotRef}
      style={{
        flex: 1,
        height: '100%',
        borderRadius: '18px',
        border: filled
          ? '3px solid rgba(255,42,109,0.9)'
          : '3px dashed rgba(255,42,109,0.3)',
        background: filled ? 'transparent' : 'rgba(255,255,255,0.03)',
        boxShadow: filled ? '0 0 24px rgba(255,42,109,0.25)' : 'none',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
      }}
    >
      {/* Empty placeholder */}
      {!filled && (
        <div style={{ textAlign: 'center', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,42,109,0.1)', lineHeight: 1 }}>
            {index + 1}
          </div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>
            Langkah {index + 1}
          </div>
        </div>
      )}

      {/* Filled content */}
      <AnimatePresence>
        {filled && (
          <motion.div
            key={`filled-${index}`}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={filled.img}
              alt={filled.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              draggable={false}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
            }} />
            {/* Title label */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '6px 10px',
            }}>
              <p style={{ color: '#fff', fontSize: '10px', fontWeight: 700, textAlign: 'center', lineHeight: 1.3, margin: 0 }}>
                {filled.title}
              </p>
            </div>
            {/* Step badge */}
            <div style={{
              position: 'absolute', top: 8, left: 8,
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(255,42,109,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 900, color: '#fff',
              boxShadow: '0 0 8px rgba(255,42,109,0.5)',
            }}>
              {index + 1}
            </div>
            {/* Check badge */}
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                position: 'absolute', top: 8, right: 8,
                background: '#22c55e', borderRadius: '50%', padding: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={13} color="white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function SamariaStory({ onPrev, onNext }) {
  const [slots, setSlots]   = useState([null, null, null, null]);
  const [pool, setPool]     = useState(() => shuffle(STEPS));
  const [feedback, setFeed] = useState(null);
  const [completed, setDone] = useState(false);
  const [reward, setReward]  = useState(false);
  const slotRefs = useRef([null, null, null, null]);

  /* helpers */
  const flash = (type, msg) => {
    setFeed({ type, msg });
    setTimeout(() => setFeed(null), 2000);
  };

  const findSlot = (x, y) => {
    let found = -1;
    slotRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const b = ref.getBoundingClientRect();
      if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) found = i;
    });
    return found;
  };

  const onDragEnd = (e, info, item) => {
    const idx = findSlot(info.point.x, info.point.y);
    if (idx === -1) return;
    if (slots[idx]) { flash('error', 'Kotak ini sudah terisi!'); return; }
    if (item.id === idx + 1) {
      const next = [...slots];
      next[idx] = item;
      setSlots(next);
      setPool(p => p.filter(x => x.id !== item.id));
      flash('success', 'Hebat! ✅');
      if (next.every(Boolean)) {
        setTimeout(() => { setDone(true); setReward(true); }, 600);
      }
    } else {
      flash('error', 'Oops! Coba urutan yang lain 🔄');
    }
  };

  const reset = () => {
    setSlots([null, null, null, null]);
    setPool(shuffle(STEPS));
    setDone(false);
    setReward(false);
    setFeed(null);
  };

  /* ── constants for sizing ──
     Slide container: 1024 × 733px
     Header ≈ 58px | title ≈ 26px | slotArea ≈ 420px
     pool ≈ 130px  | footer ≈ 50px | gaps ≈ 49px → total 733
  */
  const SLOT_ROW_H = 190; // px, each row of slots
  const NUM_STYLE  = {
    fontSize: '2.4rem', fontWeight: 900, color: '#fff',
    textShadow: '0 0 18px rgba(255,42,109,0.6)',
    lineHeight: 1, flexShrink: 0, width: 34, textAlign: 'center',
    alignSelf: 'center',
  };

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(145deg,#12031a,#1e0535,#12031a)',
      overflow: 'hidden', userSelect: 'none', position: 'relative',
      fontFamily: 'inherit',
    }}>

      {/* ── ambient blobs ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 55% 35% at 20% 10%,rgba(255,42,109,.13),transparent)',
      }}/>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 45% 35% at 80% 85%,rgba(148,0,211,.12),transparent)',
      }}/>

      {/* ════════════════════════════════════
          HEADER  (≈58px)
      ════════════════════════════════════ */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'10px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)',
        background:'rgba(0,0,0,0.25)', flexShrink:0, height:58, position:'relative', zIndex:10,
      }}>
        {/* Pill – Kembali */}
        <button onClick={onPrev} style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'8px 18px', borderRadius:999,
          background:'rgba(255,42,109,0.12)',
          border:'2px solid rgba(255,42,109,0.5)',
          color:'var(--primary)', fontWeight:900, fontSize:13,
          cursor:'pointer', transition:'all .2s',
          boxShadow:'0 0 14px rgba(255,42,109,.2)',
        }}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
        >
          <ChevronLeft size={18}/> Kembali
        </button>

        {/* Centre title */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Heart fill="var(--primary)" size={16} style={{color:'var(--primary)'}}/>
            <span style={{
              fontWeight:900, textTransform:'uppercase', letterSpacing:3,
              fontSize:12, color:'var(--primary)', textShadow:'0 0 16px rgba(255,42,109,.6)',
            }}>Susun Kisah Kasih</span>
            <Heart fill="var(--primary)" size={16} style={{color:'var(--primary)'}}/>
          </div>
          <span style={{ fontSize:10, opacity:.4, marginTop:2 }}>Kisah Orang Samaria yang Baik Hati</span>
        </div>

        {/* Pills – Reset + Lanjut */}
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={reset} style={{
            display:'flex', alignItems:'center', gap:5,
            padding:'7px 14px', borderRadius:999,
            background:'rgba(255,255,255,0.05)',
            border:'1.5px solid rgba(255,255,255,0.12)',
            color:'rgba(255,255,255,.45)', fontWeight:700, fontSize:11,
            cursor:'pointer', transition:'all .2s',
          }}>
            <RotateCcw size={12}/> Reset
          </button>
          <button onClick={onNext} style={{
            display:'flex', alignItems:'center', gap:6,
            padding:'8px 18px', borderRadius:999,
            background:'rgba(255,42,109,0.12)',
            border:'2px solid rgba(255,42,109,0.5)',
            color:'var(--primary)', fontWeight:900, fontSize:13,
            cursor:'pointer', transition:'all .2s',
            boxShadow:'0 0 14px rgba(255,42,109,.2)',
          }}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          >
            Lanjut <ChevronRight size={18}/>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
          INSTRUCTION  (≈26px)
      ════════════════════════════════════ */}
      <div style={{
        display:'flex', justifyContent:'center', padding:'6px 0',
        flexShrink:0, position:'relative', zIndex:10,
      }}>
        <span style={{
          display:'inline-flex', alignItems:'center', gap:6,
          fontSize:10, fontWeight:700, padding:'4px 16px', borderRadius:999,
          background:'rgba(255,42,109,.1)', color:'rgba(255,255,255,.6)',
          border:'1px solid rgba(255,42,109,.2)',
        }}>
          🎯 Seret gambar ke kotak nomor yang sesuai urutannya!
        </span>
      </div>

      {/* ════════════════════════════════════
          SLOT AREA  (rows 1 & 2, ≈420px)
          Layout: [num] [slot1] [slot3] [num]
                  [num] [slot2] [slot4] [num]
      ════════════════════════════════════ */}
      <div style={{
        padding:'8px 24px', flexShrink:0, position:'relative', zIndex:10,
      }}>

        {/* Row 1 — slot 0 (left) + slot 2 (right) */}
        <div style={{
          display:'flex', alignItems:'stretch', gap:12,
          height:SLOT_ROW_H, marginBottom:10,
        }}>
          {/* Left side: num 1 + slot 0 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <span style={NUM_STYLE}>1</span>
            <Slot index={0} filled={slots[0]} slotRef={el=>slotRefs.current[0]=el}/>
          </div>
          {/* Right side: slot 2 + num 3 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <Slot index={2} filled={slots[2]} slotRef={el=>slotRefs.current[2]=el}/>
            <span style={NUM_STYLE}>3</span>
          </div>
        </div>

        {/* Row 2 — slot 1 (left) + slot 3 (right) */}
        <div style={{
          display:'flex', alignItems:'stretch', gap:12,
          height:SLOT_ROW_H,
        }}>
          {/* Left side: num 2 + slot 1 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <span style={NUM_STYLE}>2</span>
            <Slot index={1} filled={slots[1]} slotRef={el=>slotRefs.current[1]=el}/>
          </div>
          {/* Right side: slot 3 + num 4 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <Slot index={3} filled={slots[3]} slotRef={el=>slotRefs.current[3]=el}/>
            <span style={NUM_STYLE}>4</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          POOL  (≈130px)
      ════════════════════════════════════ */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        padding:'0 24px 8px', position:'relative', zIndex:10,
      }}>
        {/* Pool label */}
        <div style={{
          display:'inline-block', padding:'3px 18px', borderRadius:999, marginBottom:8,
          background:'linear-gradient(90deg,rgba(255,42,109,.85),rgba(180,0,180,.85))',
          color:'#fff', fontSize:9, fontWeight:900, letterSpacing:2, textTransform:'uppercase',
          boxShadow:'0 0 14px rgba(255,42,109,.4)',
        }}>
          ✦ Pilih &amp; Seret Gambar ✦
        </div>

        {/* Pool cards */}
        <div style={{
          display:'flex', gap:12, width:'100%',
          justifyContent:'center', alignItems:'center',
        }}>
          <AnimatePresence>
            {pool.map(item => (
              <motion.div
                key={item.id}
                drag
                dragSnapToOrigin
                dragElastic={0.08}
                dragMomentum={false}
                whileHover={{ scale: 1.07, y: -5 }}
                whileDrag={{ scale: 1.12, zIndex: 999, rotate: 2, cursor: 'grabbing' }}
                onDragEnd={(e, info) => onDragEnd(e, info, item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75 }}
                style={{
                  width: 148, height: 96, flexShrink: 0,
                  borderRadius: 16, overflow: 'hidden',
                  border: '2.5px solid rgba(255,42,109,0.4)',
                  background: '#1a0a1a', cursor: 'grab',
                  boxShadow: '0 6px 22px rgba(0,0,0,0.45)',
                  position: 'relative',
                }}
              >
                <img
                  src={item.img} alt={item.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  draggable={false}
                />
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top,rgba(0,0,0,.8) 45%,transparent 75%)',
                  pointerEvents:'none',
                }}/>
                <p style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  fontSize:'8.5px', color:'#fff', fontWeight:700,
                  textAlign:'center', padding:'0 6px 7px',
                  lineHeight:1.3, margin:0, pointerEvents:'none',
                }}>
                  {item.title}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {pool.length === 0 && !completed && (
            <p style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.25)', fontStyle:'italic' }}>
              🎉 Semua gambar sudah terpasang!
            </p>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════
          FOOTER / FEEDBACK + PROGRESS  (≈50px)
      ════════════════════════════════════ */}
      <div style={{
        height:50, flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'0 24px', position:'relative', zIndex:10,
        borderTop:'1px solid rgba(255,255,255,0.05)',
      }}>
        <AnimatePresence mode="wait">
          {feedback ? (
            <motion.div
              key="fb"
              initial={{ opacity:0, y:6, scale:.9 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:6, scale:.9 }}
              style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'6px 20px', borderRadius:999, fontWeight:700, fontSize:13,
                background: feedback.type==='success' ? 'rgba(34,197,94,.18)' : 'rgba(255,42,109,.18)',
                color:       feedback.type==='success' ? '#4ade80'             : '#ff6b9d',
                border:`1px solid ${feedback.type==='success' ? 'rgba(34,197,94,.4)' : 'rgba(255,42,109,.4)'}`,
                boxShadow:'0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {feedback.type==='success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
              {feedback.msg}
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ display:'flex', gap:8, alignItems:'center' }}
            >
              {STEPS.map((_,i) => (
                <div key={i} style={{
                  height:8, borderRadius:4, transition:'all .35s',
                  width: slots[i] ? 28 : 8,
                  background: slots[i] ? 'var(--primary)' : 'rgba(255,255,255,0.18)',
                  boxShadow: slots[i] ? '0 0 8px rgba(255,42,109,.55)' : 'none',
                }}/>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════════════════════════════════════
          REWARD OVERLAY
      ════════════════════════════════════ */}
      <AnimatePresence>
        {completed && reward && (
          <motion.div
            key="reward"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            style={{
              position:'absolute', inset:0, zIndex:100,
              display:'flex', alignItems:'center', justifyContent:'center',
              background:'rgba(8,1,14,0.88)', backdropFilter:'blur(14px)',
            }}
          >
            {/* Flying hearts */}
            <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
              {[...Array(14)].map((_,i) => (
                <motion.div key={i}
                  initial={{ y:800, x:(i*73)%970, opacity:0 }}
                  animate={{ y:-60, opacity:[0,.85,0] }}
                  transition={{ duration:3+(i%3), repeat:Infinity, delay:i*.2, ease:'easeOut' }}
                  style={{ position:'absolute' }}
                >
                  <Heart fill="var(--primary)" size={14+(i%5)*10}
                    style={{ color:'var(--primary)', opacity:.65 }}/>
                </motion.div>
              ))}
            </div>

            {/* Card */}
            <motion.div
              initial={{ scale:.72, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ type:'spring', damping:14, stiffness:200 }}
              style={{
                display:'flex', flexDirection:'column', alignItems:'center',
                textAlign:'center', padding:'36px 40px',
                borderRadius:40, maxWidth:400, width:'90%', position:'relative',
                background:'linear-gradient(145deg,rgba(32,5,52,.98),rgba(16,2,26,.98))',
                border:'2px solid rgba(255,42,109,.5)',
                boxShadow:'0 0 80px rgba(255,42,109,.3), inset 0 0 40px rgba(255,42,109,.05)',
              }}
            >
              <motion.div
                animate={{ rotate:[0,8,-8,0], scale:[1,1.06,1] }}
                transition={{ repeat:Infinity, duration:2.6 }}
                style={{
                  width:88, height:88, borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginBottom:16,
                  background:'radial-gradient(circle,rgba(255,215,0,.2),rgba(255,215,0,.04))',
                  border:'3px solid rgba(255,215,0,.4)',
                }}
              >
                <Star fill="#FCD34D" size={56} style={{ color:'#FCD34D', filter:'drop-shadow(0 0 12px #FCD34D)' }}/>
              </motion.div>

              <h2 style={{ fontSize:'1.85rem', fontWeight:900, color:'var(--primary)',
                textShadow:'0 0 20px rgba(255,42,109,.7)', margin:'0 0 8px' }}>
                LUAR BIASA! 🎉
              </h2>
              <p style={{ color:'rgba(255,255,255,.85)', fontSize:14, fontWeight:600, margin:'0 0 6px' }}>
                Kamu berhasil menyusun Kisah Orang Samaria!
              </p>
              <p style={{ color:'rgba(255,255,255,.42)', fontSize:12, lineHeight:1.7, margin:'0 0 24px' }}>
                Ingat: <span style={{ color:'var(--secondary)', fontWeight:700 }}>kasih sejati</span> tidak
                memilih siapa yang layak ditolong. Kasih itu berkorban! ❤️
              </p>

              <div style={{ display:'flex', gap:12, width:'100%' }}>
                <button onClick={reset} style={{
                  flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  padding:'10px 0', borderRadius:16, fontWeight:700, fontSize:13,
                  background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.13)',
                  color:'rgba(255,255,255,.5)', cursor:'pointer', transition:'all .2s',
                }}>
                  <RotateCcw size={14}/> Main Lagi
                </button>
                <button onClick={onNext} style={{
                  flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                  padding:'10px 0', borderRadius:16, fontWeight:900, fontSize:14,
                  background:'linear-gradient(135deg,var(--primary),var(--secondary))',
                  border:'none', color:'#fff', cursor:'pointer', transition:'all .2s',
                  boxShadow:'0 4px 20px rgba(255,42,109,.4)',
                }}>
                  Lanjut <ChevronRight size={18}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
