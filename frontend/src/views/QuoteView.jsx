import React from 'react';
import QuoteForm from '../components/forms/QuoteForm';

const QuoteView = () => {
  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-industrial-800 mb-4">
            Request a Quote
          </h1>
          <p className="text-construct-600 max-w-2xl mx-auto">
            Get a free quote for your custom exterior trim project. We serve the Charleston County area
            with professional craftsmanship.
          </p>
        </div>

        {/* Decorative element */}
        <div className="w-20 h-1 bg-accent-500 mx-auto mb-12"></div>

        <div className="bg-white shadow-lg rounded-lg border border-trim-200 p-6 md:p-8">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
};

export default QuoteView;
