import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeUp, defaultTransition } from "../../utils/animations";

type ScrollRevealProps = {
  children: ReactNode;
};

export function ScrollReveal({ children }: ScrollRevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={defaultTransition}
    >
      {children}
    </motion.div>
  );
}