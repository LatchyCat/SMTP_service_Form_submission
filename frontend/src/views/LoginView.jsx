import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginView = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Required')
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', response.data.access_token);
      navigate('/reviews');
    } catch (error) {
      setFieldError('password', 'Invalid email or password');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Optional Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-2 bg-brand-600 rounded-lg shadow-md">
            <h1 className="text-white font-bold text-xl">D-Rock Construction</h1>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold text-industrial-800 font-heading">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-construct-600">
          Sign in to leave reviews and share your experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-trim-200">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-trim-800">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-trim-300 rounded-md shadow-sm placeholder-construct-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-accent-600 text-sm" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-trim-800">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-trim-300 rounded-md shadow-sm placeholder-construct-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-accent-600 text-sm" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-construct-600">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="font-medium text-industrial-600 hover:text-industrial-500 transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                  <Link
                    to="/"
                    className="block text-sm text-industrial-600 hover:text-industrial-500 transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
