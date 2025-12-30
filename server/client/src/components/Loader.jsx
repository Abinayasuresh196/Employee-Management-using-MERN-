import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <motion.div
        className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  );
}
