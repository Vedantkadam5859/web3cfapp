'use client';
import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }

    setSuccessMessage('Your message has been sent successfully!');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-900 via-gray-800 to-gray-900 text-white">
      <div className="flex-grow flex items-center justify-center px-6 sm:px-12 lg:px-24 py-12">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed text-gray-300 text-center">
            Have questions or feedback? Reach out to us and we’ll get back to you soon!
          </p>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-xl w-full max-w-md mt-8 mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 text-sm mb-4">{successMessage}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send Message
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">Or reach out via social login:</p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
                <FaTwitter className="mr-2" /> Twitter
              </button>
              <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                <FaInstagram className="mr-2" /> Instagram
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 text-center py-4">
        Connect with us - Your Voice Matters!
      </footer>
    </div>
  );
};

export default ContactUsPage;
