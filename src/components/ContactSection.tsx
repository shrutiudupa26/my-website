'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subjectOptions = [
    "Let's Build Something Cool Together 🚀",
    "Coffee Chat About Tech? ☕",
    "Just Want to Connect! 👋"
  ];

  const subtitles = [
    "Got ideas brewing? Looking to collaborate?",
    "Want to discuss opportunities?",
    "Just want to connect?"
  ];

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  // Rotate through subtitles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prevIndex) => 
        prevIndex === subtitles.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [subtitles.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const glassStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
  };

  const glassHoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center scroll-mt-24">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 min-h-[3rem]">
          <motion.p
            key={currentSubtitleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-body inline-block"
            style={{ color: 'var(--color-light)', opacity: 0.9 }}
          >
            {subtitles[currentSubtitleIndex]}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-sm bg-primary-light/10 rounded-lg p-8 border border-primary-light/20 w-full"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 
            className="text-2xl font-heading mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  ...glassStyle,
                  color: 'var(--color-light)',
                }}
                onFocus={(e) => {
                  Object.assign(e.target.style, glassHoverStyle);
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, glassStyle);
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  ...glassStyle,
                  color: 'var(--color-light)',
                }}
                onFocus={(e) => {
                  Object.assign(e.target.style, glassHoverStyle);
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, glassStyle);
                }}
              />
            </div>

            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                What&apos;s on Your Mind?
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 appearance-none"
                style={{
                  ...glassStyle,
                  color: 'var(--color-light)',
                  background: `${glassStyle.backgroundColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center`,
                  backgroundSize: '16px',
                }}
                onFocus={(e) => {
                  Object.assign(e.target.style, {
                    ...glassHoverStyle,
                    background: `${glassHoverStyle.backgroundColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center`,
                    backgroundSize: '16px',
                  });
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, {
                    ...glassStyle,
                    background: `${glassStyle.backgroundColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center`,
                    backgroundSize: '16px',
                  });
                }}
              >
                <option value="" disabled>Choose a topic...</option>
                {subjectOptions.map((option) => (
                  <option 
                    key={option} 
                    value={option}
                    style={{ 
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-light)',
                    }}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                style={{
                  ...glassStyle,
                  color: 'var(--color-light)',
                }}
                onFocus={(e) => {
                  Object.assign(e.target.style, glassHoverStyle);
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, glassStyle);
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 hover:transform hover:-translate-y-1"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium"
                  style={{ color: '#4CAF50' }}
                >
                  Message sent successfully!
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium"
                  style={{ color: '#F44336' }}
                >
                  {errorMessage}
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 