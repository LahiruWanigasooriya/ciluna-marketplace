"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Headset from "@/public/assets/home/headset.webp";
import Mouse from "@/public/assets/home/mouse.webp";
import Console from "@/public/assets/home/console.webp";
import { motion } from "framer-motion";

const images = [Headset, Mouse, Console];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={currentImage}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="pt-8 w-full h-full flex justify-center items-center"
    >
      <Image
       alt={images[currentImage].src}
        src={images[currentImage].src}
        width={640}
        height={640}
      />
    </motion.div>
  );
};

export default ImageSlider;
