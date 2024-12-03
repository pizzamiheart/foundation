import { motion, useAnimation } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';

const Transition = {
  duration: 0.3,
  delay: 0.1,
  opacity: { delay: 0.15 },
};

const Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      delay: custom * 0.1,
    },
  }),
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const controls = useAnimation();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-white/10 dark:hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme === 'dark' ? 'white' : 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          transition={Transition}
          variants={Variants}
          animate={controls}
          custom={2}
          d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"
        />
        <motion.path
          transition={Transition}
          variants={Variants}
          animate={controls}
          custom={0}
          d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"
        />
      </svg>
    </button>
  );
}