import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, message: '', isError: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', isError: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus({ loading: false, message: 'Message sent successfully!', isError: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ loading: false, message: result.error || 'Failed to send message.', isError: true });
      }
    } catch (error) {
      console.error(error);
      setStatus({ loading: false, message: 'Network error. Please try again.', isError: true });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-gutter pt-16 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-display-lg text-4xl text-on-surface mb-4">Let's connect</h2>
        <p className="text-on-surface-variant text-lg">Have a project in mind? Drop me a message.</p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="glass-card p-10 rounded-[2rem] space-y-8 ambient-glow relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
              placeholder="Type your message here"
            ></textarea>
          </div>

          {status.message && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-xl text-sm font-medium ${status.isError ? 'bg-error/10 border border-error/20 text-error' : 'bg-primary/10 border border-primary/20 text-primary'}`}
            >
              {status.message}
            </motion.div>
          )}

          <motion.button 
            whileHover={{ scale: status.loading ? 1 : 1.02 }}
            whileTap={{ scale: status.loading ? 1 : 0.98 }}
            disabled={status.loading}
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-fixed shadow-[0_4px_14px_0_rgba(192,193,255,0.39)] hover:shadow-[0_6px_20px_rgba(192,193,255,0.23)] transition-all duration-300 disabled:opacity-50"
          >
            {status.loading ? 'Sending Request...' : 'Send Message'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Contact;
