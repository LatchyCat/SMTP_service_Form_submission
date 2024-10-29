import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MessageSquare, Star } from 'lucide-react';
import api from '../../services/api';

const ReviewForm = ({ onReviewSubmitted }) => {
  const initialValues = {
    title: '',
    content: '',
    rating: 5
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Required')
      .min(3, 'Must be at least 3 characters'),
    content: Yup.string()
      .required('Required')
      .min(10, 'Must be at least 10 characters'),
    rating: Yup.number()
      .required('Required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must not exceed 5')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      console.log('Submitting values:', values); // Add this line
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Add this line

      const response = await api.post('/api/reviews', values);
      console.log('Review submitted:', response.data);
      resetForm();
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.log('Full error:', error.response?.data); // Add this line
      if (api.isAuthError(error)) {
        setStatus('Please log in to submit a review.');
      } else if (api.isNetworkError(error)) {
        setStatus('Unable to connect to the server. Please check your internet connection.');
      } else {
        setStatus(`Error submitting review: ${error.response?.data?.error || 'Please try again later.'}`);
      }
      console.error('Error submitting review:', error);
    }
    setSubmitting(false);
};

  const StarRating = ({ field, form }) => (
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => form.setFieldValue(field.name, star)}
          className={`text-3xl focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-full p-1.5 transition-all duration-200 hover:scale-110 ${
            star <= field.value ? 'text-yellow-400' : 'text-gray-200'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-8">
            <div className="relative">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Summarize your experience"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm hover:border-gray-300"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <Field name="rating" component={StarRating} />
              <ErrorMessage
                name="rating"
                component="div"
                className="mt-1 text-red-500 text-sm font-medium"
              />
            </div>

            <div className="relative">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <Field
                as="textarea"
                name="content"
                rows={6}
                placeholder="Share your experience with our services..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm hover:border-gray-300 resize-y min-h-[160px]"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium"
              />
            </div>

            {status && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                {status}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg text-lg mt-6"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewForm;
