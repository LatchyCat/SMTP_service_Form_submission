import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

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

  return (
    <div className="min-h-screen bg-construct-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header with Brazilian-inspired colors */}
          <div className="bg-brand-600 text-white px-6 py-8">
            <h1 className="text-4xl font-bold font-heading">{companyInfo.companyName}</h1>
            <p className="mt-2 text-brand-100">
              Serving {companyInfo.fieldOfWork} since {companyInfo.yearStarted}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-industrial-800 font-heading">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium mr-2 text-trim-800">Owner:</span>
                    <span className="text-construct-700">
                      {companyInfo.firstName} {companyInfo.lastName}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2 text-trim-800">Phone:</span>
                    <a
                      href={`tel:${companyInfo.phoneNumber}`}
                      className="text-industrial-600 hover:text-industrial-700 hover:underline"
                    >
                      {companyInfo.phoneNumber}
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2 text-trim-800">Email:</span>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="text-industrial-600 hover:text-industrial-700 hover:underline"
                    >
                      {companyInfo.email}
                    </a>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center">
                    <span className="font-medium mr-2 text-trim-800">Hours:</span>
                    <span className="text-construct-700">{companyInfo.hoursOfOperation}</span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2 text-trim-800">Service Area:</span>
                    <span className="text-construct-700">{companyInfo.fieldOfWork}</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Services & Specialties */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-industrial-800 font-heading">
                Services & Specialties
              </h2>
              <div className="space-y-3 bg-brand-50 p-6 rounded-lg">
                <p className="flex items-center">
                  <span className="font-medium mr-2 text-trim-800">Main Specialty:</span>
                  <span className="text-construct-700">{companyInfo.specialties}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2 text-trim-800">Team Structure:</span>
                  <span className="text-construct-700">{companyInfo.employees}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2 text-trim-800">Quotes:</span>
                  <span className="text-construct-700">{companyInfo.quotes}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2 text-trim-800">Pricing:</span>
                  <span className="text-construct-700">{companyInfo.pricesPerSpecialtyJobs}</span>
                </p>
              </div>
            </section>

            {/* Call to Action */}
            <section className="flex justify-center space-x-4">
              <Link
                to="/quote"
                className="bg-accent-500 text-white px-8 py-3 rounded-md hover:bg-accent-600 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Request a Quote
              </Link>
              <Link
                to="/reviews"
                className="bg-industrial-600 text-white px-8 py-3 rounded-md hover:bg-industrial-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                View Reviews
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
