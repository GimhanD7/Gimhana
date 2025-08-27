import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

// Import Google Fonts CSS
import './InstrallationRegistration.css';






const InstallationRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contact_number: '',
    student_id: '',
    faculty: '',
    academic_year: '',
    semester: '',
    foodPreference: '',
    previousAttendance: '',
    attendingCeremony: '',
    amount_paid: '',
    bank_name: '',
    account_number: '',
    paid_date: '',
    upload_receipt: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { toast, showSuccess, showError, hideToast } = useToast();
  const { theme } = useTheme();
  
  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date();
        const deadline = new Date('2025-08-12T23:59:59');
        const difference = deadline - now;

        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      };

      // Set initial time
      setTimeLeft(calculateTimeLeft());

      // Update timer every second
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      // Clean up on unmount
      return () => clearInterval(timer);
    }, []);

    const { days, hours, minutes, seconds } = timeLeft;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return <span className="text-red-500 font-semibold">Deadline has passed!</span>;
    }

    return (
      <span>
        <span className="font-semibold">{days} days</span>,{' '}
        <span className="font-semibold">{hours} hours</span>,{' '}
        <span className="font-semibold">{minutes} minutes</span>, and{' '}
        <span className="font-semibold">{seconds} seconds</span> remaining
      </span>
    );
  };




  

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Contact number validation
    if (!formData.contact_number) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^\d{10,15}$/.test(formData.contact_number.replace(/\s/g, ''))) {
      newErrors.contact_number = 'Please enter a valid contact number (10-15 digits)';
    }

    // Student ID validation
    if (!formData.student_id.trim()) {
      newErrors.student_id = 'Student ID is required';
    }

    // Faculty validation
    if (!formData.faculty) {
      newErrors.faculty = 'Faculty is required';
    }

    // Academic year validation
    if (!formData.academic_year) {
      newErrors.academic_year = 'Academic year is required';
    }

    // Semester validation
    if (!formData.semester) {
      newErrors.semester = 'Semester is required';
    }
    
    // Food preference validation
    if (!formData.food_preference) {
      newErrors.food_preference = 'Food preference is required';
    }
    
    // Previous attendance validation
    if (!formData.previousAttendance) {
      newErrors.previousAttendance = 'Please specify if you have attended before';
    }
    
    // Attendance confirmation validation
    if (!formData.previous_installation) {
      newErrors.previous_installation = 'Please confirm your attendance';
    }
    
    // Installation ceremony attendance validation
    if (!formData.installation_ceremony) {
      newErrors.installation_ceremony = 'Please confirm your attendance';
    }

    //amount_paid validation
    if (!formData.amount_paid) {
      newErrors.amount_paid = 'Amount paid is required';
    }

    // Bank name validation
    if (!formData.bank_name) {
      newErrors.bank_name = 'Bank name is required';
    }

    // Account number validation
    if (!formData.account_number) {
      newErrors.account_number = 'Account number is required';
    }

    // IFSC code validation
    if (!formData.paid_date) {
      newErrors.paid_date = 'paid_date is required';
    }

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle radio buttons and other inputs
    const newValue = type === 'radio' ? e.target.value : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('http://localhost/categoryRegistration/catogeryRegisterbackend/InstallationRegAdd.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

      if (result.success) {
        showSuccess(`🎉 Registration successful!`, 7000);
        // Reset form
        setFormData({
          email: '',
          name: '',
          contact_number: '',
          student_id: '',
          faculty: '',
          academic_year: '',
          semester: '',
          foodPreference: '',
          previousAttendance: '',
          attendingCeremony: '',
          preference_1_category: '',
          preference_2_category: ''
        });
      } else {
        console.error('Backend error:', result.error);
        showError(`❌ Registration failed: ${result.error || result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showError('⚠️ An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCategory(null);
  };



  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-amber-50' 
        : 'bg-amber-50 text-gray-900'
    }`}>
      {/* Category Details Modal */}
      {selectedCategory && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/70'
          }`}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl transform transition-all duration-300">
            
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Leo Club Header Section */}
        <div className={`backdrop-blur-sm rounded-xl shadow-xl p-6 ${
          theme === 'dark' 
            ? 'bg-gray-900/95 text-amber-50 border border-amber-700' 
            : 'bg-amber-50/95 text-gray-900 border border-amber-200'
        }`}>
  <div className="p-6 text-left">
    {/* Header */}
    <div className="flex items-start gap-4 mb-6">
      <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-1">
        <img src="/logo.png" alt="Leo Club of SLIIT Logo" className="w-full h-full object-contain" />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold leading-snug">
          INSTRALLATION REGISTRATION FORM 25.26
        </h1>
        <h2>6th Annual Club Installation Ceremony</h2>
        <p className="text-sm font-medium mt-1">
          LEO CLUB OF SLIIT | LIONS INTERNATIONAL, DISTRICT 306 D6.
        </p>
      </div>
    </div>

    {/* Description */}
    <div className="space-y-2 text-sm   mb-6">
      <p>The Leo Club of SLIIT is now welcoming all members to join project groups based on your passion and interest.</p>
      <p>Whether you're driven by creativity, leadership, or community service, there's a project waiting just for you.</p>
      <p className="text-amber-500 font-semibold uppercase tracking-wide">
        This is your moment — don’t miss out
      </p>
    </div>

    <div className={`space-y-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-amber-50/90'} font-poppins`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2 tracking-tight">
          Await a New Beginning with Festivity!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-[15px] leading-relaxed">
          We are ready to embark on the Leoistic Year 2025/26 by making a difference in our community. Join us for an unforgettable experience filled with learning, networking, and service.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Event Details Card */}
        <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-amber-50/60'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mr-3">
              <i className="fas fa-calendar-day text-amber-500"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">Event Details</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <i className="fas fa-calendar-check text-amber-400 mt-1 mr-2 text-sm"></i>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Date: </span>
                <span className="text-gray-600 dark:text-gray-400">16th October 2025</span>
              </div>
            </li>
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt text-amber-400 mt-1 mr-2 text-sm"></i>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Venue: </span>
                <span className="text-gray-600 dark:text-gray-400">Main Auditorium, SLIIT, Malabe</span>
              </div>
            </li>
            <li className="flex items-start">
              <i className="fas fa-tag text-amber-400 mt-1 mr-2 text-sm"></i>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Registration: </span>
                <span className="text-gray-600 dark:text-gray-400">Rs. 2,000/=</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Inclusions Card */}
        <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900/70' : 'bg-amber-50/60'}`}>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mr-3">
              <i className="fas fa-gift text-amber-500"></i>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight">Your Registration Includes</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center">
              <i className="fas fa-certificate text-amber-400 mr-2"></i>
              <span className="text-gray-700 dark:text-gray-300">Certificate of Participation</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-coffee text-amber-400 mr-2"></i>
              <span className="text-gray-700 dark:text-gray-300">Welcome Refreshments</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-utensils text-amber-400 mr-2"></i>
              <span className="text-gray-700 dark:text-gray-300">Gourmet Dinner Pack</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bank Details Card */}
      <div className={`mt-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white'} border ${theme === 'dark' ? 'border-amber-700' : 'border-amber-200'} shadow-sm`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">Payment Information</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Complete your registration by making the payment</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <i className="fas fa-university text-amber-500"></i>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-5 rounded-r">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-amber-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <span className="font-medium">Important:</span> Please include your SLIIT ID and Year as the payment reference (e.g., IT12345678_1)
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5">
          {/* Bank Account 1 */}
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-amber-700/70 bg-gray-900/40' : 'border-amber-100 bg-amber-50/30'}`}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2">
                <i className="fas fa-user text-amber-500 text-sm"></i>
              </div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200">D.T.M Peiris</h5>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center">
                <i className="fas fa-wallet text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">8015734521</span>
              </p>
              <p className="flex items-center">
                <i className="fas fa-landmark text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">Commercial Bank, Yakkala</span>
              </p>
            </div>
          </div>
          
          {/* Bank Account 2 */}
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-amber-700/70 bg-gray-900/40' : 'border-amber-100 bg-amber-50/30'}`}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2">
                <i className="fas fa-user text-amber-500 text-sm"></i>
              </div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200">K. A. M. Fernando</h5>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center">
                <i className="fas fa-wallet text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">112352408847</span>
              </p>
              <p className="flex items-center">
                <i className="fas fa-landmark text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">Sampath Bank, KCC</span>
              </p>
            </div>
          </div>
          
          {/* Bank Account 3 */}
          <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-amber-700/70 bg-gray-900/40' : 'border-amber-100 bg-amber-50/30'}`}>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2">
                <i className="fas fa-user text-amber-500 text-sm"></i>
              </div>
              <h5 className="font-medium text-gray-800 dark:text-gray-200">Y.D Gogerly</h5>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center">
                <i className="fas fa-wallet text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">0087700694</span>
              </p>
              <p className="flex items-center">
                <i className="fas fa-landmark text-gray-400 dark:text-gray-500 mr-2 w-4"></i>
                <span className="text-gray-600 dark:text-gray-400">Bank of Ceylon, Minuwangoda</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50/70 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-800/50">
          <p className="text-center text-sm text-amber-700 dark:text-amber-300 font-medium">
            <i className="fas fa-check-circle mr-2"></i>
            After making the payment, please complete the registration form below to secure your spot.
          </p>
        </div>
      </div>
      
    
    </div>

    {/* Deadline & Contacts */}
    <div className=" rounded-lg p-5   mb-6 text-center">
      {/* Deadline */}
      <h2 className="text-sm font-bold text-gray-400 uppercase mb-1  ">Deadline</h2>
      <div className="text-2xl font-bold text-red-500 mb-2  ">12th August 2025</div>
      <div className="text-sm text-gray-600 mb-4 dark:text-gray-400">
        <CountdownTimer />
      </div>

      {/* Contacts */}
      <h2 className="text-sm font-bold text-gray-400 uppercase mb-2">Contact</h2>
      <div className="text-xs text-gray-600 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
        <span className="dark:text-gray-400">
          Avishka: 
          <a href="tel:+94774112105" className="text-blue-400 ml-1 hover:underline">077 411 2105</a> / 
          <a href="https://wa.me/94774112105" target="_blank" rel="noopener noreferrer" className="text-green-400 ml-1 hover:underline">WhatsApp</a>
        </span>
        <span className="dark:text-gray-400">
          Thenura: 
          <a href="tel:+94783956939" className="text-blue-400 ml-1 hover:underline">078 395 6939</a> / 
          <a href="https://wa.me/94783956939" target="_blank" rel="noopener noreferrer" className="text-green-400 ml-1 hover:underline">WhatsApp</a>
        </span>
        <span className="dark:text-gray-400">
          Chethiya: 
          <a href="tel:+94761665488" className="text-blue-400 ml-1 hover:underline">076 166 5488</a> / 
          <a href="https://wa.me/94761665488" target="_blank" rel="noopener noreferrer" className="text-green-400 ml-1 hover:underline">WhatsApp</a>
        </span>
      </div>
    </div>

    {/* Required Field Notice */}
    <div className="flex justify-start items-center text-xs text-red-500 gap-2">
      <span className="font-bold">*</span>
      <span>Indicates required question</span>
    </div>
  </div>
</div>
<br/>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Personal Information */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-900/90 border-amber-800/50 text-amber-50' 
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                Personal Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium  ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-envelope text-amber-500 text-xs"></i>
                    <span className="">Email Address</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70' 
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70' 
                  } ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium  ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-id-card text-amber-500 text-xs"></i>
                    <span className="">Full Name</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70'
                  } ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block text-xs font-medium    ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-phone text-amber-500 text-xs"></i>
                    <span className="">Contact Number</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="0771234567"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70'
                  } ${errors.contact_number ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'}`}
                />
                {errors.contact_number && <p className="text-red-400 text-xs mt-1">{errors.contact_number}</p>}
              </div>

              {/* Student ID */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-id-card text-amber-500 text-xs"></i>
                    <span className="">Student ID</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70'
                  } ${errors.student_id ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'}`}
                />
                {errors.student_id && <p className="text-red-400 text-xs mt-1">{errors.student_id}</p>}
              </div>
            </div>
          </div>
 

          {/* Section 2: Academic Information */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-900/90 border-amber-800/50 text-amber-50' 
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                <i className="fas fa-university text-white text-sm"></i>
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                Academic Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Faculty */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-building text-amber-500 text-xs"></i>
                    <span className="">Faculty</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-800  border-amber-700/70 text-amber-50 placeholder-amber-400/70' 
                      : '  border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.faculty ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-amber-400' : '  text-amber-800'}>Select faculty</option>
                  <option value="Computing" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : ' text-amber-900 hover:bg-amber-50'}>Computing</option>
                  <option value="Business" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Business</option>
                  <option value="Engineering" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Engineering</option>
                  <option value="Humanities & Sciences" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Humanities & Sciences</option>
                  <option value="Architecture" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Architecture</option>
                  <option value="Law" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Law</option>
                </select>
                {errors.faculty && <p className="text-red-400 text-xs mt-1">{errors.faculty}</p>}
              </div>

              {/* Academic Year */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-calendar-alt text-amber-500 text-xs"></i>
                    <span className="">Academic Year</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : '  border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.academic_year ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-800'}>Select year</option>
                  <option value="Year 1" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Year 1</option>
                  <option value="Year 2" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Year 2</option>
                  <option value="Year 3" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Year 3</option>
                  <option value="Year 4" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Year 4</option>
                </select>
                {errors.academic_year && <p className="text-red-400 text-xs mt-1">{errors.academic_year}</p>}
              </div>

              {/* Semester */}
              <div className="space-y-1">
                <label className="block text-xs font-medium     ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-clock text-amber-500 text-xs"></i>
                    <span className=" ">Semester</span>
                    <span className="text-red-400   ">*</span>
                  </span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.semester ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Select</option>                  
                  <option value="Semester 1" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Semester 1</option>
                  <option value="Semester 2" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Semester 2</option>
                </select>
                {errors.semester && <p className="text-red-400 text-xs mt-1">{errors.semester}</p>}
              </div>
            </div>
          </div>


          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-900/90 border-amber-800/50 text-amber-50' 
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                <i className="fas fa-info text-white text-sm"></i>
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                Additional Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Food Preference */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-utensils text-amber-500 text-xs"></i>
                    <span className="">Food Preference</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="food_preference"
                  value={formData.food_preference}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70' 
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.food_preference ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-800'}>Select </option>
                  <option value="Non-Veg" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Non-Vegetarian</option>
                  <option value="Veg" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Vegetarian</option>
                </select>
                {errors.food_preference && <p className="text-red-400 text-xs mt-1">{errors.food_preference}</p>}
              </div>

              {/* Previous Installation Attendance */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-history text-amber-500 text-xs"></i>
                    <span className="">Previous Installation Attendance</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="previous_installation"
                  value={formData.previous_installation}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.previous_installation ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  
                  <option value="Yes" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>Yes</option>
                  <option value="No" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>No</option>
                 
                </select>
                {errors.previous_installation && <p className="text-red-400 text-xs mt-1">{errors.previous_installation}</p>}
              </div>

              {/* Installation Ceremony Attendance */}
              <div className="space-y-1">
                <label className="block text-xs font-medium     ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-calendar-check text-amber-500 text-xs"></i>
                    <span className=" ">Installation Ceremony Attendance</span>
                    <span className="text-red-400   ">*</span>
                  </span>
                </label>
                <select
                  name="installation_ceremony"
                  value={formData.installation_ceremony}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50 placeholder-amber-400/70'
                      : 'bg-white/90 border-amber-200 text-amber-900 placeholder-amber-600/70',
                    errors.installation_ceremony ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}>Select</option>
                  <option value="yes" className={theme === 'dark' ? 'bg-gray-800 text-amber-400' : 'bg-white text-amber-600'}>Yes</option>
                  <option value="no" className={theme === 'dark' ? 'bg-gray-800 text-amber-100 hover:bg-amber-900/30' : 'bg-white text-amber-900 hover:bg-amber-50'}>No</option>
                </select>
                {errors.installation_ceremony && <p className="text-red-400 text-xs mt-1">{errors.installation_ceremony}</p>}
              </div>
            </div>
          </div>

          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-900/90 border-amber-800/50 text-amber-50' 
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                <i className="fas fa-money-bill text-white text-sm"></i>
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                Payment Details
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
             
              <div className="space-y-1">
                <label className="block text-xs font-medium">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-university text-amber-500 text-xs"></i>
                    <span>Bank Name</span>
                    <span className="text-red-400   ">*</span>
                  </span>
                </label>


                <select
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-amber-700/70 text-amber-50' 
                      : 'bg-amber-50 border-amber-200 text-gray-800',
                    errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-amber-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}>Select Bank</option>
                  <option value="BOC" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>BOC</option>
                  <option value="Sampath" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Sampath</option>
                  <option value="Commercial Bank" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Commercial Bank</option>
                </select>
                {errors.bank_name && <p className="text-red-400 text-xs mt-1">{errors.bank_name}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-money-bill-wave text-yellow-400 text-xs"></i>
                    <span>Amount Paid</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="amount_paid"
                  value={formData.amount_paid}
                  onChange={handleInputChange}
                  placeholder="Enter your amount paid"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } ${errors.amount_paid ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.amount_paid && <p className="text-red-400 text-xs mt-1">{errors.amount_paid}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium">
                  <span className="flex items-center space-x-1">
                    <i className="far fa-calendar-alt text-amber-500 text-xs"></i>
                    <span>Paid Date</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  name="paid_date"
                  value={formData.paid_date}
                  onChange={handleInputChange}
                  placeholder="Enter your amount paid"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } ${errors.paid_date ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.paid_date && <p className="text-red-400 text-xs mt-1">{errors.paid_date}</p>}
              </div>

               

              {/* Bank Slip Upload */}
              <div className="space-y-1 col-span-1 lg:col-span-3">
                <label className="block text-xs font-medium">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-file-upload text-amber-500 text-xs"></i>
                    <span>Upload Bank Slip</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-all duration-200 ${theme === 'dark' ? 'border-amber-700/50 hover:border-amber-500' : 'border-amber-200 hover:border-amber-400'}`}>
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                      <label
                        htmlFor="bank-slip-upload"
                        className={`relative cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-md font-medium text-amber-500 hover:text-amber-400 focus-within:outline-none`}
                      ><p className='bg-gradient-to-r from-amber-500 to-yellow-600 text-white pl-2 pr-2 py-1 rounded hover:from-amber-600 hover:to-yellow-700 transition-colors'>Upload a file</p>
                         <input
                          id="bank-slip-upload"
                          name="bank_slip"
                          type="file"
                          className="sr-only"
                          onChange={handleInputChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                      <p className={`pl-1 ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>or drag and drop</p>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-amber-300/70' : 'text-amber-700'}`}>
                      PDF, JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
                {errors.bank_slip && (
                  <p className="text-red-400 text-xs mt-1">{errors.bank_slip}</p>
                )}
              </div>

              

             


             



             

            
            </div> 
          </div>

           


          


         


          

          {/* Section 6: Submit */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-900/90 border-amber-800/50' 
              : 'bg-amber-50/90 border-amber-200'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
                <i className="fas fa-paper-plane text-white text-sm"></i>
              </div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-amber-100' : 'text-amber-900'}`}>
                Submit Registration
              </h2>
            </div>
            
            <div className="text-center">
              <p className={`text-xs ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-700'} mb-4`}>Review your information and submit your registration</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 mx-auto shadow-amber-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-sm">Submitting...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-check text-sm"></i>
                    <span className="text-sm">Submit Registration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <footer className={`mt-12 py-6 border-t ${theme === 'dark' ? 'border-amber-800/50' : 'border-amber-200'}`}>
          <div className="container mx-auto px-4">
            <p className={`text-center text-sm ${theme === 'dark' ? 'text-amber-400/80' : 'text-amber-700'}`}>
              © {new Date().getFullYear()} LEO Club of SLIIT. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />
    </div>
  );
};

export default InstallationRegistration;