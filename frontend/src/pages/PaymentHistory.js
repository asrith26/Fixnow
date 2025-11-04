import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, DollarSign, X } from 'lucide-react';
import { usePaymentHistory } from '../context/PaymentHistoryContext';
import Button from '../components/Button';

const PaymentHistory = () => {
  const { paymentHistory, cancelPayment, loading } = usePaymentHistory();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your payment history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Payment History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View all your past payments and transactions
          </p>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No payment history
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your completed payments will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div
                key={payment._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {payment.service || 'Service Payment'}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(payment.createdAt || payment.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">₹{payment.amount?.toFixed(2) || '125.00'}</span>
                        </div>
                      </div>
                      {payment.location && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Location: {payment.location}
                        </p>
                      )}
                      {payment.transactionId && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                          Transaction ID: {payment.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      ₹{payment.amount?.toFixed(2) || '125.00'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {payment.paymentMethod || 'Card'}
                    </div>
                    {payment.status === 'pending' && (
                      <Button
                        onClick={() => cancelPayment(payment._id)}
                        className="mt-2 flex items-center gap-2 text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="btn-secondary"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
