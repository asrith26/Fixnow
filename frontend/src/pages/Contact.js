import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, HelpCircle } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        toast.error('Failed to send message. Please try again.');
      }
    }
  };

  return (
    <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Contact Us</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">We're here to help. Get in touch with us with any questions you may have.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />
                <FormInput
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:text-white"
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90"
                >
                  Submit
                </Button>
              </form>
            </div>

            <div className="space-y-10">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Other ways to reach us</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Mail className="text-primary text-3xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Email Us</h4>
                      <p className="text-slate-600 dark:text-slate-400">For general inquiries, email us at:</p>
                      <a className="text-primary hover:underline" href="mailto:support@fixnow.com">support@fixnow.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Phone className="text-primary text-3xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Call Us</h4>
                      <p className="text-slate-600 dark:text-slate-400">Our customer service is available from 9am to 5pm, Mon-Fri.</p>
                      <a className="text-primary hover:underline" href="tel:+1-800-555-1234">+1 (800) 555-1234</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Find Answers Fast</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  You might find the answer to your question in our Help Center. We've compiled a list of frequently asked questions to help you get the information you need right away.
                </p>
                <Link
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                  to="/help"
                >
                  Visit our Help Center
                  <HelpCircle className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default Contact;
