import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ReviewForm = () => {
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/reviews', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Review submitted:', response.data);
      resetForm();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please ensure you are logged in and try again.');
    }
    setSubmitting(false);
  };

  const StarRating = ({ field, form }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => form.setFieldValue(field.name, star)}
          className={`text-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full p-1 ${
            star <= field.value ? 'text-accent-400' : 'text-trim-200'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-trim-800 mb-1">
              Title
            </label>
            <Field
              type="text"
              name="title"
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 rounded-md border border-trim-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
            />
            <ErrorMessage name="title" component="div" className="mt-1 text-accent-600 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-trim-800 mb-1">
              Rating
            </label>
            <Field name="rating" component={StarRating} />
            <ErrorMessage name="rating" component="div" className="mt-1 text-accent-600 text-sm" />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-trim-800 mb-1">
              Your Review
            </label>
            <Field
              as="textarea"
              name="content"
              rows={6}
              placeholder="Share your experience with our services..."
              className="w-full px-4 py-2 rounded-md border border-trim-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
            />
            <ErrorMessage name="content" component="div" className="mt-1 text-accent-600 text-sm" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 text-white py-3 px-6 rounded-md hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
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
  );
};

export default ReviewForm;
