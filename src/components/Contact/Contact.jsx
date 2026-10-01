import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaBolt,
  FaBullseye,
  FaBriefcase,
} from 'react-icons/fa';
import './Contact.css';

// Every class here starts with "ct-" so this section can't clash with
// Home, Navbar, About, Skills, Experience, Projects or Footer styles.

const details = [
  { Icon: FaEnvelope, label: 'Email', value: 'shaikowais47@gmail.com', href: 'mailto:shaikowais47@gmail.com' },
  { Icon: FaPhone, label: 'Phone', value: '+91 8309574762', href: 'tel:+918309574762' },
  { Icon: FaMapMarkerAlt, label: 'Location', value: 'Nellore, Andhra Pradesh' },
];

const promises = [
  { Icon: FaBolt, text: 'Quick response' },
  { Icon: FaBullseye, text: 'Goal oriented' },
  { Icon: FaBriefcase, text: 'Professional' },
];

const emptyForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
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

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    const serviceId = 'service_k85n6kh';
    const templateId = 'template_wget62i';
    const publicKey = 'Yzdg3Mr9jbkLavMsX';

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast.success("Message sent successfully! I'll be in touch soon.");
        setFormData(emptyForm);
        setSent(true);
        timer.current = setTimeout(() => setSent(false), 3000);
      })
      .catch((error) => {
        toast.error('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="ct-section" id="contact">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="ct-inner">
        <header className="ct-head">
          <h1>Let&apos;s connect</h1>
          <p>
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s
            make something reliable together.
          </p>
        </header>

        <div className="ct-body">
          <aside className="ct-info">
            <ul className="ct-details">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label}>
                  <span className="ct-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <span className="ct-label">{label}</span>
                    {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
                  </div>
                </li>
              ))}
            </ul>

            <ul className="ct-promises">
              {promises.map(({ Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" /> {text}
                </li>
              ))}
            </ul>
          </aside>

          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="ct-name">Full name</label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-email">Email address</label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="ct-subject">
                Subject <span className="ct-optional">(optional)</span>
              </label>
              <input
                id="ct-subject"
                name="subject"
                type="text"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="ct-field">
              <label htmlFor="ct-message">Your message</label>
              <textarea
                id="ct-message"
                name="message"
                rows="5"
                placeholder="Tell me a little about your project"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={sent ? 'ct-submit ct-sent' : 'ct-submit'} disabled={loading}>
              {sent ? <FaCheck /> : <FaPaperPlane />}
              <span>{loading ? 'Sending...' : sent ? 'Message sent' : 'Send message'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;