import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Construction, Calendar, CreditCard, Briefcase, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: 'Find a Professional',
      description: 'Hire trusted professionals for your repair needs.',
      icon: Search,
      href: '/find-pro',
      color: 'bg-blue-500'
    },
    {
      title: 'Become a Professional',
      description: 'Offer your skills and services to a wide audience.',
      icon: Construction,
      href: '/professional-application',
      color: 'bg-green-500'
    },
    {
      title: 'My Bookings',
      description: 'View and manage your service bookings.',
      icon: Calendar,
      href: '/bookings',
      color: 'bg-purple-500'
    },
    {
      title: 'Payment History',
      description: 'View your payment history and invoices.',
      icon: CreditCard,
      href: '/payment-history',
      color: 'bg-orange-500'
    },
    {
      title: 'Services',
      description: 'Explore all available service categories.',
      icon: Briefcase,
      href: '/services',
      color: 'bg-purple-500'
    },
    {
      title: 'Professionals Near Me',
      description: 'Find top-rated professionals in your area.',
      icon: MapPin,
      href: '/find-professionals-near-me',
      color: 'bg-green-500'
    }
  ];

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              What would you like to do today?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Link
                key={index}
                to={card.href}
                className="group block rounded-lg p-8 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200/80 dark:border-gray-700/50"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`flex items-center justify-center w-16 h-16 ${card.color} rounded-full text-white mb-6`}>
                    <card.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {card.description}
                  </p>
                  <div className="font-semibold text-primary group-hover:underline">
                    Choose this option →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
