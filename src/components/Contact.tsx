import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { DATA } from '../app/data';
import { SectionTitle } from './SectionTitle';

export const Contact = () => {
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
          <form className="space-y-4">
            <div>
              <input 
                type="text" 
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div>
              <input 
                type="email" 
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <textarea 
                rows={4}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
