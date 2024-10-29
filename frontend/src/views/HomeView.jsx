import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, Star, Users, DollarSign, Calendar } from 'lucide-react';

const HomeView = () => {
  const companyInfo = {
    companyName: 'D-Rock Construction LLC',
    firstName: 'Wanderson',
    lastName: 'Rocha',
    phoneNumber: '843-302-2743',
    email: 'drockconstructionllc1@gmail.com',
    hoursOfOperation: '8:00am to 5:30pm EST',
    fieldOfWork: 'Charleston County',
    specialties: 'Customized Exterior Trim',
    employees: 'Subcontractors are hired in advance per project',
    quotes: 'Free',
    yearStarted: 'Aug 2008',
    pricesPerSpecialtyJobs: 'Contact us for details'
  };

  const FeatureCard = ({ icon: Icon, title, content }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600">{content}</p>
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
              {companyInfo.companyName}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8">
              Professional Construction Services in {companyInfo.fieldOfWork}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Get Free Quote
              </Link>
              <Link
                to="/reviews"
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                View Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Contact Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={`tel:${companyInfo.phoneNumber}`}
             className="flex items-center space-x-4 text-gray-600 hover:text-blue-600 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-medium">{companyInfo.phoneNumber}</span>
          </a>
          <a href={`mailto:${companyInfo.email}`}
             className="flex items-center space-x-4 text-gray-600 hover:text-blue-600 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="font-medium truncate">{companyInfo.email}</span>
          </a>
          <div className="flex items-center space-x-4 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{companyInfo.hoursOfOperation}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon={MapPin}
            title="Service Area"
            content={companyInfo.fieldOfWork}
          />
          <FeatureCard
            icon={Star}
            title="Specialization"
            content={companyInfo.specialties}
          />
          <FeatureCard
            icon={Users}
            title="Team Structure"
            content={companyInfo.employees}
          />
          <FeatureCard
            icon={DollarSign}
            title="Quote Policy"
            content={companyInfo.quotes}
          />
          <FeatureCard
            icon={Calendar}
            title="Years of Experience"
            content={`Serving since ${companyInfo.yearStarted}`}
          />
          <FeatureCard
            icon={DollarSign}
            title="Pricing"
            content={companyInfo.pricesPerSpecialtyJobs}
          />
        </div>

        {/* Owner Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Owner</h2>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {companyInfo.firstName[0]}{companyInfo.lastName[0]}
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {companyInfo.firstName} {companyInfo.lastName}
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  With over {new Date().getFullYear() - 2008} years of experience in construction and specializing in exterior trim,
                  {companyInfo.firstName} leads our team in delivering exceptional quality and craftsmanship to every project.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-6">
            <Link
              to="/quote"
              className="block w-full sm:w-auto text-center bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Start Your Project Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
