import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedComponent({ children, ...props }) {
  return (
    <motion.div key={props.index} {...props}>
      {children}
    </motion.div>
  );
}
