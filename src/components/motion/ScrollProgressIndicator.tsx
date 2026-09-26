import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2.5px] origin-left bg-gradient-to-r from-primary to-accent pointer-events-none"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressIndicator;
