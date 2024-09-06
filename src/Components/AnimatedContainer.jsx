import { AnimatePresence, motion } from 'framer-motion';

export default function AnimatedContainer({
  className,
  condition,
  children,
  onlyOpacity,
}) {
  if (onlyOpacity)
    return (
      <AnimatePresence>
        {condition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ bounce: 0 }}
            className={className ? className : 'absolute z-20 w-full h-full'}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ bounce: 0 }}
          className='absolute z-10 w-full h-full'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
