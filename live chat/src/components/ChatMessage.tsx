import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface ChatMessageProps {
  content: string;
  timestamp: Date;
  isOwn: boolean;
  avatar: string;
}

export function ChatMessage({ content, timestamp, isOwn, avatar }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} gap-3 mb-4`}
    >
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        src={avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <motion.div
          layout
          className={`max-w-xs rounded-2xl px-4 py-2 ${
            isOwn
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          <p className="text-sm">{content}</p>
        </motion.div>
        <span className="text-xs text-gray-500 mt-1">
          {format(timestamp, 'HH:mm')}
        </span>
      </div>
    </motion.div>
  );
}