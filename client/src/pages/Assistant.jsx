import { motion } from 'framer-motion';
import ChatBot from '../components/ChatBot';

const Assistant = () => {
  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-container-max mx-auto px-gutter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-headline-lg font-bold text-primary mb-3">
            💬 Portfolio Assistant
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Ask me anything about Tarang's skills, projects, technologies, experience, 
            education, achievements, and how to get in touch. I'm here to help!
          </p>
        </motion.div>

        {/* Common Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-headline-md font-bold text-on-surface mb-4">
            📚 Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                question: 'What are Tarang\'s main skills?',
                icon: '🛠️'
              },
              {
                question: 'What projects has Tarang built?',
                icon: '📁'
              },
              {
                question: 'What technologies does Tarang use?',
                icon: '💻'
              },
              {
                question: 'How can I contact Tarang?',
                icon: '📧'
              },
              {
                question: 'Tell me about Tarang\'s experience',
                icon: '💼'
              },
              {
                question: 'What AI technologies are integrated?',
                icon: '🤖'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-secondary-container text-on-secondary-container rounded-lg p-4 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-body-md font-medium">{item.question}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-surface border border-outline-variant rounded-xl shadow-lg overflow-hidden"
        >
          <div style={{ height: '600px' }}>
            <ChatBot isWidget={false} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assistant;
