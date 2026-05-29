import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const PORTFOLIO_CONTEXT = `You are an AI assistant for Tarang Prajapati's portfolio. Answer ONLY based on the information below. Do not make up any information.

CONTACT INFORMATION:
Name: Prajapati Tarang Prakashbhai
Location: Ahemdabad, Gujarat
Phone: 6352179683
Email: ptarang69@gmail.com
LinkedIn: www.linkedin.com/in/tarang-prajapati

PROFESSIONAL SUMMARY:
Third-year B.Tech Computer Science and Engineering student with strong interest in AI/ML. Vice-Chairperson of Silver Oak University IEEE SIGHT Student Branch Group. Passionate about Cloud Computing and DevOps. Creative designer with interest in transforming ideas into visually engaging designs.

EDUCATION:
- B.Tech in Computer Science and Engineering — Silver Oak University (Current)
- Higher Secondary Education (Class 12) — Shree Ved International School
- Secondary Education (Class 10) — Sadhna Campus

TECHNICAL SKILLS:
Programming Languages: Python, C, C++, Java, JavaScript
Web Technologies: HTML, CSS, React.js, Vite
Database Management: SQL
Cloud & DevOps: AWS Fundamentals
Design Tools: Figma
Python Libraries: NumPy, Pandas, Matplotlib

PROJECTS:
1. Global Connect — Platform to track global member contributions across organisations
2. Multi Agent Flow (Hackathon) — AI agents for script writing, verification, and generation
3. Drishti (Hackathon) — Crowd counting and tracking system
4. Expense Tracker — Python-based daily expense management application
5. Password Generator — Python project for generating secure passwords
6. IEEE SOU SIGHT SBG Website (Ongoing) — Developing the official IEEE SOU SIGHT SBG website

LEADERSHIP & EXPERIENCE:
- Webmaster of IEEE SOU SIGHT SBG (January 2026 – March 2026) — Managed web-related activities and technical initiatives
- Google Student Ambassador (September 2025 - Present) — Community engagement and organisational impact
- Vice-Chairperson of IEEE SIGHT Student Branch Group — Event planning and initiative development

PROFESSIONAL AFFILIATIONS:
- Active Member of IEEE SOU SB
- Member of Google Developer Groups
- Red Hat Academy Member

SOFT SKILLS:
- Problem Solving
- Effective Communication
- Public Speaking & Presentation
- Patience and Calm Decision-Making
- Teamwork & Leadership

CAREER INTERESTS:
- Cloud Computing & DevOps
- Artificial Intelligence & Machine Learning

RESPONSE FORMAT RULES (STRICT):
1. NEVER use **, *, ##, or any markdown symbols
2. Answer directly from the resume information provided above
3. For specific questions, reference exact details from the resume
4. If asked about something not in the resume, say "This information is not available in my resume"
5. For lists with 3+ items: use plain dash format
6. Use line breaks between sections
7. Keep text clean and minimal
8. Paragraphs should be 2-3 sentences max
9. Encourage contacting Tarang for more details or opportunities

HANDLING INVALID QUESTIONS:
1. If user writes gibberish, typos, or meaningless text (like "Achievements??", "asdfgh", random characters): Politely ask them to rephrase their question
2. Respond with: "I didn't understand your question. Could you please ask a valid question about Tarang's skills, projects, experience, education, or background?"
3. Be helpful and suggest what you can help with
4. Never show technical errors or API error messages to the user
5. Always maintain a professional and friendly tone

EXAMPLE INVALID QUESTION RESPONSES:
Q: "asdfgh" or "Achievements??" or random text
A: "I didn't understand that question. Could you please ask something about Tarang's technical skills, projects, experience, education, or professional background? I'm here to help!"`;

const ChatBot = ({ isWidget = false, onClose = null }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm Tarang's AI assistant. I can answer questions about his technical skills, projects, education, leadership experience, and professional background based on his resume. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (!GEMINI_API_KEY) {
      setError('API key not configured. Please add VITE_GEMINI_API_KEY to .env');
      return;
    }

    // Function to clean and format markdown properly
    const cleanMarkdown = (text) => {
      return text
        // Remove markdown headers but keep text
        .replace(/#+\s+(.+)/g, '$1')
        // Convert ** bold ** to just text (removes ** symbols)
        .replace(/\*\*(.+?)\*\*/g, '$1')
        // Convert * italic * to just text (removes * symbols)
        .replace(/\*(.+?)\*/g, '$1')
        // Convert markdown lists (- or *) to clean bullet points
        .replace(/^[\s]*[-*]\s+/gm, '• ')
        // Clean up multiple line breaks
        .replace(/\n{3,}/g, '\n\n')
        // Trim whitespace
        .trim();
    };

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        systemInstruction: PORTFOLIO_CONTEXT
      });

      // Filter history to only include actual message exchanges (skip initial greeting)
      const chatHistory = messages
        .filter(msg => msg.sender !== 'error' && msg.id !== 1) // Skip initial greeting
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const chat = model.startChat({
        history: chatHistory
      });

      const result = await chat.sendMessage(input);
      const botResponse = result.response.text();

      const botMessage = {
        id: messages.length + 2,
        text: cleanMarkdown(botResponse),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Handle different types of errors gracefully
      let errorText = "I didn't understand that question. Could you please ask something about Tarang's technical skills, projects, experience, education, or professional background? I'm here to help!";
      
      // If it's a network or API error, show friendly message
      if (err.message && err.message.includes('fetch')) {
        errorText = "Temporarily unable to process your request. Please try again in a moment.";
      }
      
      const errorMessage = {
        id: messages.length + 2,
        text: errorText,
        sender: 'error',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const containerClass = isWidget
    ? 'fixed bottom-6 right-6 w-[500px] h-[600px] rounded-xl shadow-2xl overflow-hidden flex flex-col'
    : 'w-full h-full flex flex-col';

  return (
    <div className={`${containerClass} bg-surface border border-outline-variant`}>
      {/* Header */}
      <div className="bg-primary text-on-primary p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h3 className="font-headline-md text-headline-md">Tarang's Assistant</h3>
        </div>
        {isWidget && onClose && (
          <button
            onClick={onClose}
            className="text-on-primary hover:bg-primary-fixed rounded p-1 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface scroll-smooth"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-md rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-br-none'
                    : message.sender === 'error'
                    ? 'bg-error text-on-error rounded-bl-none'
                    : 'bg-secondary-container text-on-secondary-container rounded-bl-none'
                }`}
              >
                <p className="text-body-md whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-secondary-container text-on-secondary-container rounded-lg rounded-bl-none p-3 flex items-center gap-2">
              <Loader size={18} className="animate-spin" />
              <span className="text-body-md">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-outline-variant p-4 bg-surface">
        {error && (
          <p className="text-error text-body-sm mb-2">⚠️ {error}</p>
        )}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Let's chat"
            disabled={loading}
            className="flex-1 rounded-lg px-4 py-2 bg-surface-variant text-on-surface border border-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-primary text-on-primary px-4 py-2 rounded-lg hover:bg-primary-fixed transition disabled:opacity-50 flex items-center gap-2"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
