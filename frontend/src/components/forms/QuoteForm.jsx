import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const QuoteForm = () => {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    projectDetails: '',
    preferredContactMethod: 'email',
    budgetRange: '',
    timeline: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    serviceType: Yup.string().required('Required'),
    projectDetails: Yup.string().required('Required'),
    preferredContactMethod: Yup.string().required('Required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/quotes', values);
      console.log('Quote submitted:', response.data);
      resetForm();
      alert('Quote request submitted successfully!');
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error submitting quote. Please try again.');
    }
    setSubmitting(false);
  };

  const FormField = ({ label, name, type = "text", as, children, placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-trim-800 mb-1">
        {label}
      </label>
      <Field
        type={type}
        as={as}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md border border-trim-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
      >
        {children}
      </Field>
      <ErrorMessage name={name} component="div" className="mt-1 text-accent-600 text-sm" />
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
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Name"
              name="name"
              placeholder="Your full name"
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Phone"
              name="phone"
              placeholder="(000) 000-0000"
            />
            <FormField
              label="Service Type"
              name="serviceType"
              as="select"
            >
              <option value="">Select a service</option>
              <option value="exterior-trim">Exterior Trim</option>
              <option value="custom-work">Custom Work</option>
              <option value="repair">Repair</option>
              <option value="other">Other</option>
            </FormField>
          </div>

          <FormField
            label="Project Details"
            name="projectDetails"
            as="textarea"
            placeholder="Please describe your project..."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="Preferred Contact Method"
              name="preferredContactMethod"
              as="select"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </FormField>

            <FormField
              label="Budget Range"
              name="budgetRange"
              as="select"
            >
              <option value="">Select budget range</option>
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-20k">$10,000 - $20,000</option>
              <option value="over-20k">Over $20,000</option>
            </FormField>
          </div>

          <FormField
            label="Timeline"
            name="timeline"
            as="select"
          >
            <option value="">Select preferred timeline</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3-months">1-3 months</option>
            <option value="3-6-months">3-6 months</option>
            <option value="flexible">Flexible</option>
          </FormField>

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
              'Request Quote'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default QuoteForm;
