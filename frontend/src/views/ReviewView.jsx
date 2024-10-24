import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../components/forms/ReviewForm';

const ReviewView = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Fetch reviews
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/api/reviews');
      setReviews(response.data.data || []);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews([]);
      setError(null); // Don't show error to user
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-industrial-800 mb-4">
            Customer Reviews
          </h1>
          <p className="text-construct-600 max-w-2xl mx-auto">
            Read what our customers say about our work or share your own experience
          </p>
        </div>

        {/* Conditional Review Form Section */}
        {isAuthenticated ? (
          <div className="bg-white shadow-lg rounded-lg border border-trim-200 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-semibold text-industrial-700 mb-6">
              Share Your Experience
            </h2>
            <ReviewForm onReviewSubmitted={fetchReviews} />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg border border-trim-200 p-6 md:p-8 mb-12 text-center">
            <h2 className="text-2xl font-semibold text-industrial-700 mb-4">
              Want to share your experience?
            </h2>
            <p className="text-construct-600 mb-6">
              Please log in or create an account to leave a review.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-block bg-brand-600 text-white px-6 py-2 rounded-md hover:bg-brand-700 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-block bg-accent-500 text-white px-6 py-2 rounded-md hover:bg-accent-600 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          </div>
        )}

        {/* Error State - Now as a banner instead of full page */}
        {error && (
          <div className="bg-accent-50 border-l-4 border-accent-500 p-4 mb-6 rounded-md">
            <p className="text-accent-700">{error}</p>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-lg rounded-lg p-6 border border-trim-200 transition-all hover:shadow-xl"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-xl font-semibold text-industrial-800">{review.title}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? 'text-accent-400' : 'text-trim-200'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-construct-600 leading-relaxed">{review.content}</p>

                <div className="mt-4 pt-4 border-t border-trim-200 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                      <span className="text-brand-700 font-medium">
                        {review.author ? review.author[0].toUpperCase() : 'A'}
                      </span>
                    </div>
                    <span className="text-industrial-600 font-medium">
                      {review.author || 'Anonymous'}
                    </span>
                  </div>
                  <span className="text-sm text-construct-500">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-construct-600">No reviews yet. Be the first to leave one!</p>
              {!isAuthenticated && (
                <div className="mt-4">
                  <Link
                    to="/register"
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Create an account
                  </Link>
                  <span className="mx-2">or</span>
                  <Link
                    to="/login"
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    log in
                  </Link>
                  <span className="ml-2">to leave a review</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
