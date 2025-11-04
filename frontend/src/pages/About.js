import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'We are committed to building a community founded on trust. Every professional is background-checked and reviewed.'
    },
    {
      icon: Award,
      title: 'Quality Commitment',
      description: 'We stand for excellence. We connect you with professionals who take pride in their work and deliver exceptional results.'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Your satisfaction is our driving force. We are dedicated to providing outstanding support and a seamless experience.'
    }
  ];

  return (
    <main className="flex-grow">
        <div className="relative">
          <img
            alt="FixNow team working"
            className="w-full h-96 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgHwB8msXDRK0N-WVJZ3QQKOKeGBPEUmwcC0tr9ErLmgbX-G65SnZJG6HHXoTUJIIwYoNi5afdg0IqwCFafEt_psv0ElT9cUYrcHZWFdCHf35QG7mzO3HBlLClGXidf7wayvRBCosSJU0CfibPjRx3MBKEcMFjT7B7Xd5OL8sXX1SfX399mCd2F_I3Z-Yt3NrlBYGhlw5X09REfLn2Z08HXrRjHmdVmMIrvgDanjmaXU9BDN0L4XracVXdhGn-iZAMNYkjixBLgtiA"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">About FixNow</h2>
              <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">Connecting you with trusted, skilled professionals for all your home service needs.</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                At FixNow, our mission is to simplify home services. We believe that finding a reliable and skilled professional should be easy and stress-free. We're dedicated to building a platform that connects homeowners with top-quality service providers, ensuring every job is done right, on time, and with the utmost professionalism.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We vet every professional on our platform to ensure they meet our high standards of quality, reliability, and customer service. Your peace of mind is our top priority.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                FixNow was born out of a common frustration: the struggle to find trustworthy tradespeople. Our founder, Jane Doe, experienced this firsthand when a simple plumbing issue turned into a weeks-long ordeal of unreliable contractors and overpriced quotes.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Determined to create a better way, Jane and a small, passionate team set out to build FixNow. Our goal was simple: create a single, reliable source for all home service needs, where quality and trust are paramount. Today, we're proud to have helped thousands of homeowners connect with the best professionals in their area.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Our Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
                  <value.icon className="text-primary text-5xl mb-4 mx-auto" />
                  <h4 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{value.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
};

export default About;
