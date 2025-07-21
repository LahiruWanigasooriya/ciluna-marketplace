import { Variants } from "framer-motion";

export const dropdownVariants: Variants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.2,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      when: "afterChildren",
    },
  },
};

export const CardVariants = {
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 10 },
  },
  initial: {
    scale: 1,
  },
};

export const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const imageVariants = {
  initial: { opacity: 0, scale: 0.96 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.04 },
};

export const thumbnailVariants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  enter: { opacity: 1, scale: 1 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const popupVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
};

export const popupVariants2 = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
};
