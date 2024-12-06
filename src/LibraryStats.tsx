import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LibraryCard from './LibraryCard';

export default function LibraryStats() {
  const [count] = useState(119);

  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LibraryCard count={count} />
    </motion.div>
  );
}