import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReviewForm from '../components/forms/ReviewForm';
import { Star, Clock, ThumbsUp, MessageSquare, Shield, Filter, SortAsc } from 'lucide-react';
import api from '../services/api';

const ReviewView = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/reviews');
      setReviews(response.data.data || []);
    } catch (error) {
      if (api.isAuthError(error)) {
        setError('Please log in to view reviews.');
      } else if (api.isForbiddenError(error)) {
        setError('You do not have permission to view reviews.');
      } else if (api.isNetworkError(error)) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('Error loading reviews. Please try again later.');
      }
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const Stats = () => {
    if (!reviews.length) return null;

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    const satisfactionRate = Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}/5.0</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <ThumbsUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-gray-900">{satisfactionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium text-lg">
                {review.author ? review.author[0].toUpperCase() : 'A'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{review.title}</h3>
              <p className="text-sm text-gray-500">{review.author || 'Anonymous'}</p>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed">{review.content}</p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(review.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          {review.verified && (
            <div className="flex items-center text-green-600 text-sm">
              <Shield className="w-4 h-4 mr-1" />
              Verified Customer
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Customer Reviews
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8">
              See what our customers are saying about their experience with D-Rock Construction
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Stats />

        {/* Write Review Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isAuthenticated ? 'Share Your Experience' : 'Join Our Community'}
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Your feedback helps us improve and helps others make informed decisions.
              </p>
            </div>

            {isAuthenticated ? (
              <ReviewForm onReviewSubmitted={fetchReviews} />
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Filters and Sort */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(Number(e.target.value))}
                      className="rounded-lg border border-gray-200 text-gray-700 px-4 py-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                    >
                      <option value={0}>All Ratings</option>
                      <option value={5}>5 Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={3}>3+ Stars</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <SortAsc className="w-5 h-5 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="rounded-lg border border-gray-200 text-gray-700 px-4 py-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rated</option>
                      <option value="lowest">Lowest Rated</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews
                  .filter(review => filterRating === 0 || review.rating >= filterRating)
                  .sort((a, b) => {
                    switch (sortBy) {
                      case 'oldest':
                        return new Date(a.created_at) - new Date(b.created_at);
                      case 'highest':
                        return b.rating - a.rating;
                      case 'lowest':
                        return a.rating - b.rating;
                      default:
                        return new Date(b.created_at) - new Date(a.created_at);
                    }
                  })
                  .map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No reviews yet. Be the first to leave one!</p>
                  {!isAuthenticated && (
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link
                        to="/register"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                      >
                        Create Account
                      </Link>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewView;
