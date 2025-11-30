'use client';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { DATA } from '../app/data';
import { SectionTitle } from './SectionTitle';
import { logContactUs } from '../libs/contact.service';
import { useState, FormEvent, useEffect } from 'react';
import { saveSubmission, getLastSubmission, canSubmitForm } from '../libs/indexedDB';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      const { canSubmit: allowed, timeRemaining: remaining } = await canSubmitForm();
      setCanSubmit(allowed);

      if (!allowed && remaining) {
        const lastSubmission = await getLastSubmission();
        if (lastSubmission) {
          setFormData({
            name: lastSubmission.name,
            email: lastSubmission.email,
            message: lastSubmission.message,
          });
        }
        updateTimeRemaining(remaining);
      }
    };

    checkSubmissionStatus();
  }, []);

  useEffect(() => {
    if (!canSubmit) {
      const interval = setInterval(async () => {
        const { canSubmit: allowed, timeRemaining: remaining } = await canSubmitForm();
        
        if (allowed) {
          setCanSubmit(true);
          setTimeRemaining('');
          clearInterval(interval);
        } else if (remaining) {
          updateTimeRemaining(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canSubmit]);

  const updateTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const result = await logContactUs(formData);

    if (result.success) {
      await saveSubmission(formData);
      setStatus({ type: 'success', message: result.message });
      setCanSubmit(false);
      
      const { timeRemaining: remaining } = await canSubmitForm();
      if (remaining) {
        updateTimeRemaining(remaining);
      }
    } else {
      setStatus({ type: 'error', message: result.message });
    }

    setIsSubmitting(false);
  };
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Footer Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Connect With Me" />
        
        <div className="grid md:grid-cols-2 gap-12 bg-gray-900/20 p-8 md:p-12 rounded-[2rem] border border-gray-800">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
                <h3 className="text-3xl font-bold text-white mb-4">Let's build something amazing.</h3>
                <p className="text-gray-400">Open to new opportunities and collaborations.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/10">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Email</h4>
                  <p className="text-white text-lg font-medium">{DATA.personal.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/10">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Phone</h4>
                  <p className="text-white text-lg font-medium">{DATA.personal.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-gray-500 font-medium text-sm uppercase tracking-wider">Location</h4>
                  <p className="text-white text-lg font-medium">{DATA.personal.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex gap-4">
                <a href={DATA.personal.social.github} target="_blank" rel="noreferrer" className="p-4 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all">
                    <Github size={20} />
                </a>
                <a href={DATA.personal.social.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all">
                    <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!canSubmit}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your Name"
              />
            </div>
            <div>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!canSubmit}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={!canSubmit}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell me about your project..."
              />
            </div>
            {status.type && (
              <div className={`p-4 rounded-xl ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status.message}
              </div>
            )}
            {!canSubmit && timeRemaining && (
              <div className="p-4 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                Thanks for reaching out! Please wait {timeRemaining} before sending another message.
              </div>
            )}
            <button 
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : !canSubmit ? 'Message Already Sent' : 'Send Message'} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
