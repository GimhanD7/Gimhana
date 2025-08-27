import React, { useState } from 'react';
import { 
  FaUser, FaPhone, FaEnvelope, FaCalendarAlt, 
  FaMapMarkerAlt, FaIdCard, FaCity, FaGlobe,
  FaUpload, FaImage, FaSignature, FaWhatsapp, FaCheckCircle
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import useToast from '../hooks/useToast';

// ContactItem component
const ContactItem = ({ name, phone, whatsapp, theme }) => {
  const phoneUrl = `tel:${phone}`;
  const whatsappUrl = `https://wa.me/${whatsapp}`;
  
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{name}:</span>
      <div className="flex space-x-2">
        <a 
          href={phoneUrl}
          className="flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
        >
          <FaPhone className="mr-1" /> Call
        </a>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
        >
          <FaWhatsapp className="mr-1" /> WhatsApp
        </a>
      </div>
    </div>
  );
};

// FileUpload component with improved UI
const FileUpload = ({ id, name, label, value, onChange, accept = 'image/*', required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" htmlFor={id}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center">
      <label 
        htmlFor={id}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
      >
        <FaUpload />
        <span>Choose File</span>
      </label>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        className="hidden"
        required={required}
      />
      <div className="ml-3 flex items-center">
        {value ? (
          <span className="text-green-600 flex items-center gap-1">
            <FaCheckCircle className="mr-1" />
            {value.name}
          </span>
        ) : (
          <span className="text-gray-500">No file chosen</span>
        )}
      </div>
    </div>
  </div>
);

const InstallationRegistration = () => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    nic: '',
    gender: '',
    dob: '',
    
    // Contact Information
    address: '',
    city: '',
    country: 'Sri Lanka',
    mobile: '',
    email: '',
    
    // Document Uploads
    nicFront: null,
    nicBack: null,
    photo: null,
    signature: null,
    
    // Terms and Conditions
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    const requiredFields = ['fullName', 'nic', 'gender', 'dob', 'address', 'city', 'country', 'mobile'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Check if all required files are uploaded
    const requiredFiles = ['nicFront', 'nicBack', 'photo', 'signature'];
    const missingFiles = requiredFiles.filter(file => !formData[file]);
    
    if (missingFiles.length > 0) {
      showToast('Please upload all required documents', 'error');
      return;
    }
    
    if (!formData.agreeTerms) {
      showToast('Please agree to the terms and conditions', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Example API call (uncomment and implement your actual API endpoint)
      /*
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      const data = await response.json();
      */
      
      // For demo purposes - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Registration submitted successfully!', 'success');
      handleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
      return;
    }
    
    setFormData({
      fullName: '',
      nic: '',
      gender: '',
      dob: '',
      address: '',
      city: '',
      country: 'Sri Lanka',
      mobile: '',
      email: '',
      nicFront: null,
      nicBack: null,
      photo: null,
      signature: null,
      agreeTerms: false
    });
    
    // Reset file inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.value = '';
    });
    
    showToast('Form has been reset', 'info');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Installation Registration
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Please fill in all required fields to complete your registration
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className={`space-y-8 rounded-2xl p-6 sm:p-8 ${
            theme === 'dark' 
              ? 'bg-gray-800 shadow-xl shadow-gray-900/20' 
              : 'bg-white shadow-lg shadow-gray-200/50'
          } transition-all duration-300`}
        >
          {/* Personal Details Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-3 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <FaUser className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`h-5 w-5 ${formData.fullName ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } transition-colors`}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* NIC */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  NIC <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className={`h-5 w-5 ${formData.nic ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } transition-colors`}
                    placeholder="200012345678"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`h-5 w-5 ${formData.gender ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg appearance-none border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } transition-colors`}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className={`h-5 w-5 ${formData.dob ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } transition-colors`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                    +94
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="77 123 4567"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Document Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NIC Front */}
              <FileUpload
                id="nicFront"
                name="nicFront"
                label="NIC Front (JPG/PNG/PDF) *"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
              />

              {/* NIC Back */}
              <FileUpload
                id="nicBack"
                name="nicBack"
                label="NIC Back (JPG/PNG/PDF) *"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
              />

              {/* Photo */}
              <FileUpload
                id="photo"
                name="photo"
                label="Passport Size Photo (JPG/PNG) *"
                accept="image/*"
                onChange={handleChange}
                required
              />

              {/* Signature */}
              <FileUpload
                id="signature"
                name="signature"
                label="Signature (JPG/PNG) *"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="pt-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium">
                  I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">terms and conditions</a>
                </label>
                <p className="text-gray-500">You agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
                      phone="077 411 2105" 
                      whatsapp="94774112105"
                      theme={theme}
                    />
                    <ContactItem 
                      name="Thenura" 
                      phone="078 395 6939" 
                      whatsapp="94783956939"
                      theme={theme}
                    />
                    <ContactItem 
                      name="Chethiya" 
                      phone="076 166 5488" 
                      whatsapp="94761665488"
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Required Field Notice */}
        <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start">
            <span className="text-yellow-500 mr-2">*</span>
            <span className="text-sm text-yellow-700 dark:text-yellow-300">
              Indicates required question
            </span>
          </div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Installation Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="installationName"
                      value={formData.installationName}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      required
                    />
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Installation Type</label>
                  <div className="relative">
                    <select
                      name="installationType"
                      value={formData.installationType}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="">Select Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Government">Government</option>
                    </select>
                    <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaUser className="mr-2" /> Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Person *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      required
                    />
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      required
                    />
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Address Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <FaMapMarkedAlt className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full p-2 pl-10 border rounded-md ${
                          theme === 'dark' 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <FaCity className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full p-2 pl-10 border rounded-md ${
                          theme === 'dark' 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <FaFlag className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full p-2 pl-10 border rounded-md ${
                          theme === 'dark' 
                            ? 'bg-gray-800 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      />
                      <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Status and Date */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Registration Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="registrationDate"
                      value={formData.registrationDate}
                      onChange={handleChange}
                      className={`w-full p-2 pl-10 border rounded-md ${
                        theme === 'dark' 
                          ? 'bg-gray-800 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                      disabled
                    />
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Installation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallationRegistration;