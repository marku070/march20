import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

const ConfettiPiece = ({ index }: { index: number }) => {
  const colors = ["hsl(340,60%,72%)", "hsl(200,50%,85%)", "hsl(50,70%,85%)", "hsl(270,40%,88%)", "hsl(340,60%,88%)"];
  const x = (Math.random() - 0.5) * 400;
  const y = -(Math.random() * 300 + 100);
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[index % colors.length] }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y: [y, y + 500], opacity: [1, 1, 0], scale: [1, 0.5], rotate: Math.random() * 720 }}
      transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
    />
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const handleGiftClick = useCallback(() => {
    if (giftOpened) return;
    setGiftOpened(true);
    setShowConfetti(true);
    setTimeout(() => navigate("/letters"), 1800);
  }, [giftOpened, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <Sparkles className="w-8 h-8 text-accent-foreground mx-auto mb-2 opacity-60" />
        </motion.div>

        <h1 className="text-5xl sm:text-7xl font-display text-foreground mb-4">
          Happy Birthday, Aditi!
          
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground font-body mb-12">
          I love you more than the galaxy.
        </p>

        {/* Gift Box */}
        <div className="relative inline-block">
          {showConfetti && (
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>
          )}
          <motion.button
            onClick={handleGiftClick}
            whileHover={!giftOpened ? { scale: 1.08 } : {}}
            whileTap={!giftOpened ? { scale: 0.95 } : {}}
            animate={!giftOpened ? { y: [0, -12, 0] } : { scale: [1, 1.2, 0], opacity: [1, 1, 0] }}
            transition={!giftOpened ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.6 }}
            className="relative cursor-pointer"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-primary flex items-center justify-center shadow-xl animate-pulse-glow">
              <div className="absolute inset-0 rounded-2xl border-4 border-primary-foreground/30" />
              {/* Ribbon horizontal */}
              <div className="absolute top-1/2 left-0 right-0 h-3 bg-accent -translate-y-1/2" />
              {/* Ribbon vertical */}
              <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-accent -translate-x-1/2" />
              {/* Bow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="w-8 h-4 bg-accent rounded-full" />
              </div>
              <Gift className="w-10 h-10 text-primary-foreground relative z-10" />
            </div>
          </motion.button>
          {!giftOpened && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-sm text-muted-foreground font-body"
            >
              
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
