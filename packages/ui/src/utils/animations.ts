import type { Variants, Transition } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const defaultTransition: Transition = {
  duration: 0.45,
  ease: "easeOut",
};