import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';
import './Contact.css';

// Every class starts with "ct-" so this section can't clash with other sections.

const topics = ['New project', 'Job opportunity', 'Collaboration', 'Just saying hi'];
const MAX = 800;
const emptyForm = { name: '', email: '', message: '' };
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [topic, setTopic] = useState(topics[0]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in your name, email and message');
      return;
    }
    if (!emailOk(formData.email)) {
      toast.error('Enter a valid email address so I can reply');
      return;
    }

    setLoading(true);

    const serviceId = 'service_k85n6kh';
    const templateId = 'template_wget62i';
    const publicKey = 'Yzdg3Mr9jbkLavMsX';

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: topic,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast.success("Message sent. I'll reply to your email soon.");
        setFormData(emptyForm);
        setTopic(topics[0]);
        setSent(true);
        timer.current = setTimeout(() => setSent(false), 3000);
      })
      .catch((error) => {
        toast.error('Message not sent. Check your connection and try again.');
        console.error('EmailJS error:', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="ct-section" id="contact">
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <div className="ct-inner">
        <header className="ct-head">
          <h1>Write me a message</h1>
          <p>Tell me what you're building or hiring for. I read every message and reply by email.</p>
        </header>

        <form className="ct-card" onSubmit={handleSubmit} noValidate>
          <div className="ct-bar">
            <span className="ct-bar-title">New message</span>
          </div>

          <div className="ct-line">
            <label htmlFor="ct-name">Name</label>
            <input id="ct-name" name="name" type="text" autoComplete="name" placeholder="Your full name"
              value={formData.name} onChange={handleChange} required />
          </div>

          <div className="ct-line">
            <label htmlFor="ct-email">Reply to</label>
            <input id="ct-email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
              value={formData.email} onChange={handleChange} required />
          </div>

          <div className="ct-line ct-topics" role="radiogroup" aria-label="Topic">
            <span className="ct-topics-label">About</span>
            <div className="ct-chips">
              {topics.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={topic === t}
                  className={topic === t ? 'ct-chip ct-on' : 'ct-chip'} onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="ct-compose">
            <label htmlFor="ct-message" className="ct-sr">Message</label>
            <textarea id="ct-message" name="message" rows="7" maxLength={MAX}
              placeholder="Hi Owais, I'd like to talk about..."
              value={formData.message} onChange={handleChange} required />
          </div>

          <div className="ct-foot">
            <span className="ct-count">{formData.message.length} / {MAX}</span>
            <button type="submit" className={sent ? 'ct-submit ct-sent' : 'ct-submit'} disabled={loading}>
              {sent ? <FaCheck /> : <FaPaperPlane />}
              <span>{loading ? 'Sending...' : sent ? 'Message sent' : 'Send message'}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;