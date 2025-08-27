import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

// Helper function to get category color based on index
const getCategoryColor = (index) => {
  const colors = [
    'from-red-500 to-pink-500',
    'from-amber-500 to-yellow-500',
    'from-green-500 to-emerald-500',
    'from-blue-500 to-cyan-500',
    'from-indigo-500 to-violet-500',
    'from-purple-500 to-fuchsia-500',
    'from-pink-500 to-rose-500',
    'from-amber-400 to-orange-500',
    'from-lime-500 to-green-500',
    'from-cyan-400 to-blue-500',
    'from-violet-500 to-purple-600',
    'from-rose-500 to-pink-600',
    'from-orange-500 to-amber-500',
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-blue-500',
    'from-indigo-400 to-blue-500',
    'from-fuchsia-500 to-purple-500',
    'from-rose-400 to-red-500',
    'from-yellow-400 to-amber-500',
    'from-teal-400 to-cyan-500',
    'from-blue-400 to-indigo-500',
    'from-purple-400 to-indigo-500',
    'from-pink-400 to-rose-500',
    'from-orange-400 to-amber-500',
    'from-emerald-300 to-green-500',
    'from-cyan-300 to-blue-400',
    'from-violet-400 to-purple-500',
    'from-rose-400 to-pink-500'
  ];
  return colors[index % colors.length];
};

// Helper function to get category icon based on category name
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'diabetes': 'fa-heartbeat',
    'environment': 'fa-leaf',
    'hunger': 'fa-utensils',
    'cancer': 'fa-heart',
    'vision': 'fa-eye',
    'youth': 'fa-child',
    'disaster': 'fa-house-damage',
    'children': 'fa-baby',
    'waste': 'fa-trash-alt',
    'nutrition': 'fa-apple-alt',
    'peace': 'fa-dove',
    'sports': 'fa-futbol',
    'health': 'fa-heartbeat',
    'senior': 'fa-user-friends',
    'differently abled': 'fa-wheelchair',
    'public relations': 'fa-bullhorn',
    'fundraising': 'fa-hand-holding-usd',
    'education': 'fa-graduation-cap',
    'women': 'fa-female',
    'poverty': 'fa-hand-holding-heart',
    'water': 'fa-tint',
    'crime': 'fa-shield-alt',
    'infrastructure': 'fa-building',
    'research': 'fa-flask',
    'drug': 'fa-pills',
    'animal': 'fa-paw',
    'fellowship': 'fa-hands-helping',
    'leoism': 'fa-hands-helping'
  };

  const lowerName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return `fas ${icon}`;
    }
  }
  return 'fas fa-star';
};

const CategoryRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    contact_number: '',
    student_id: '',
    faculty: '',
    academic_year: '',
    semester: '',
    preference_1_category: '',
    preference_2_category: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
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

  // Category descriptions
  const categoryDescriptions = {
    'Project for Diabetes': 'Projects focused on diabetes awareness, prevention, and support for affected individuals. (Ref: Best Project for Diabetes)',
    'Project for Environment': 'Initiatives aimed at environmental conservation, sustainability, and eco-friendly practices. (Ref: Best Project for Environment)',
    'Project for Hunger': 'Programs dedicated to fighting hunger and food insecurity in local communities. (Ref: Best Project for Hunger)',
    'Project for Childhood Cancer': 'Efforts to support children with cancer and their families through treatment and care. (Ref: Best Project for Pediatric/Childhood Cancer)',
    'Project for Vision': 'Initiatives focused on vision care, eye health awareness, and support for the visually impaired. (Ref: Best Project for Vision)',
    'Project for Youth': 'Programs designed to empower and develop skills in young individuals. (Ref: Best Project for Youth)',
    'Project for Disaster Management & Prevention': 'Preparedness and response initiatives for natural and man-made disasters. (Ref: Best Project for Disaster Management and Prevention)',
    'Project for Spotlight on Children': 'Activities and programs focused on the welfare and development of children under 18. (Ref: Best Project for Spotlight on Children)',
    'Project for Responsible Consumption & Waste Management': 'Efforts to promote recycling, waste reduction, and sustainable waste disposal. (Ref: Best Project for Responsible Consumption & Waste Management)',
    'Project for Nutrition and Food Safety': 'Programs promoting healthy eating habits and nutrition education. (Ref: Best Project for Nutrition and Food Safety)',
    'Project for Peace & Religious Activities & Cultural Activities': 'Initiatives that promote peace, inter-religious harmony, and cultural understanding. (Ref: Best Project for Peace, Religious & Cultural Activities)',
    'Project for Sports & Recreation': 'Sports-based programs encouraging physical activity, fitness, and teamwork. (Ref: Best Project for Sports & Recreation)',
    'Project for Health & Wellbeing': 'General health awareness and medical care initiatives for the community. (Ref: Best Project for Health & Wellbeing)',
    'Project for Senior Citizens Development': 'Programs supporting the elderly and improving their quality of life. (Ref: Best Project for Senior Citizens Development)',
    'Project for Helping Hand to Differently Abled': 'Initiatives that promote inclusion and support for people with disabilities. (Ref: Best Project for Helping Hand to Differently Abled)',
    'Project for Public Relations': 'Activities focused on community engagement, awareness, and building a positive image of Leo clubs. (Ref: Best Project for Public Relations)',
    'Project for Fundraiser': 'Organized efforts to raise funds for various charitable causes. (Ref: Best Fundraiser)',
    'Project for Quality Education & Literacy': 'Programs that enhance learning opportunities and educational access. (Ref: Best Project for Quality Education & Literacy)',
    'Project for Women Empowerment': 'Initiatives that support and empower women in various aspects of life. (Ref: Best Project for Women Empowerment)',
    'Project for Poverty & Better Life': 'Efforts aimed at reducing poverty and improving living conditions. (Ref: Best Project for Poverty & Better Life)',
    'Project for Clean Water & Energy Conservation': 'Initiatives focused on water preservation, clean water access, and sustainable energy use. (Ref: Best Project for Clean Water & Energy Conservation)',
    'Project for Crime & Road Accident Prevention': 'Programs that work towards reducing crime and enhancing community safety. (Ref: Best Project for Crime & Road Accident Prevention)',
    'Project for Infrastructure': 'Initiatives to improve community infrastructure and facilities. (Ref: Best Project for Infrastructure Development)',
    'Project for Research and Development': 'Research-based projects aimed at finding solutions to community issues. (Ref: Best Project for Research and Development)',
    'Project for Drug Prevention and Rehabilitation': 'Programs focused on preventing substance abuse and supporting recovery. (Ref: Best Project for Drug Prevention and Rehabilitation)',
    'Project for Street Animals Wildlife & Life Below Water': 'Initiatives that protect and care for street animals, wildlife, and aquatic life. (Ref: Best Project for Street Animals, Wildlife & Life Below Water)',
    'Project for Fellowship': 'Programs that foster community building and leadership development. (Ref: Best Project for Fellowship)',
    'Project for Betterment of Leoism': 'Activities that promote the values and principles of Leoism and community service. (Ref: Best Project for Betterment of Leoism)'
}

;

  const categories = [
    'Project for Diabetes',
    'Project for Environment',
    'Project for Hunger',
    'Project for Childhood Cancer',
    'Project for Vision',
    'Project for Youth',
    'Project for Disaster Management & Prevention',
    'Project for Spotlight on Children',
    'Project for Responsible Consumption & Waste Management',
    'Project for Nutrition and Food Safety',
    'Project for Peace & Religious Activities & Cultural Activities',
    'Project for Sports & Recreation',
    'Project for Health & Wellbeing',
    'Project for Senior Citizens Development',
    'Project for Helping Hand to Differently Abled',
    'Project for Public Relations',
    'Project for Fundraiser',
    'Project for Quality Education & Literacy',
    'Project for Women Empowerment',
    'Project for Poverty & Better Life',
    'Project for Clean Water & Energy Conservation',
    'Project for Crime & Road Accident Prevention',
    'Project for Infrastructure',
    'Project for Research and Development',
    'Project for Drug Prevention and Rehabilitation',
    'Project for Street Animals Wildlife & Life Below Water',
    'Project for Fellowship',
    'Project for Betterment of Leoism'
  ];

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

    // First preference validation
    if (!formData.preference_1_category) {
      newErrors.preference_1_category = 'First preference category is required';
    }

    // Second preference validation
    if (!formData.preference_2_category) {
      newErrors.preference_2_category = 'Second preference category is required';
    } else if (formData.preference_1_category === formData.preference_2_category) {
      newErrors.preference_2_category = 'Second preference must be different from first preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
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
      
      const response = await fetch('https://dev.sliitleo.org/Backend/submit_registration.php', {
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

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
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
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-800'
    }`}>
      {/* Category Details Modal */}
      {selectedCategory && (
        <div 
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-900/90' : 'bg-black/70'
          }`}
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getCategoryColor(categories.indexOf(selectedCategory)).replace('bg-gradient-to-r', 'bg-gradient-to-br')}`}>
                      <i className={`${getCategoryIcon(selectedCategory)} text-white text-xl`}></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCategory}</h2>
                  </div>
                  <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-100/50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{categoryDescriptions[selectedCategory] || 'No description available for this category.'}</p>
                </div>
                
                
                
                <div className="bg-gray-100/50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Activities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                      <span className="text-gray-600">Community outreach and awareness programs</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                      <span className="text-gray-600">Workshops and training sessions</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-green-400 mt-1 mr-2"></i>
                      <span className="text-gray-600">Collaboration with local organizations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-3 pt-2">

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Leo Club Header Section */}
        <div className={`backdrop-blur-sm rounded-xl shadow-xl p-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/95 text-gray-100 border border-gray-700' 
            : 'bg-white/95 text-gray-800 border border-gray-200'
        }`}>
  <div className="p-6 text-left">
    {/* Header */}
    <div className="flex items-start gap-4 mb-6">
      <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-1">
        <img src="/logo192.png" alt="App Logo" className="w-full h-full object-contain" />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold leading-snug">
          PROJECT PREFERENCE FORM 25.26
        </h1>
        <p className="text-sm   font-medium mt-1 ">
        LEO CLUB OF SLIIT | LIONS INTERNATIONAL, DISTRICT 306 D6. 
        </p>
      </div>
    </div>

    {/* Description */}
    <div className="space-y-2 text-sm   mb-6">
      <p>The Leo Club of SLIIT is now welcoming all members to join project groups based on your passion and interest.</p>
      <p>Whether you're driven by creativity, leadership, or community service, there's a project waiting just for you.</p>
      <p className="text-orange-500 font-semibold uppercase tracking-wide">
        This is your moment — don’t miss out
      </p>
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
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <h2 className="text-lg font-semibold  ">
                Personal Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-medium  ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-envelope text-blue-400 text-xs "></i>
                    <span className="">Email Address</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400' 
                  } ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-medium  ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-id-card text-green-400 text-xs "></i>
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
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block text-xs font-medium    ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-phone text-indigo-400 text-xs  0"></i>
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
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } ${errors.contact_number ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.contact_number && <p className="text-red-400 text-xs mt-1">{errors.contact_number}</p>}
              </div>

              {/* Student ID */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-graduation-cap text-yellow-400 text-xs "></i>
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
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                  } ${errors.student_id ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.student_id && <p className="text-red-400 text-xs mt-1">{errors.student_id}</p>}
              </div>
            </div>
          </div>
 

          {/* Section 2: Academic Information */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800/90 border-gray-700 text-gray-100' 
              : 'bg-white border-gray-200 text-gray-800'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-university text-white text-sm"></i>
              </div>
              <h2 className="text-lg font-semibold    ">
                Academic Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Faculty */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-building text-emerald-400 text-xs "></i>
                    <span className="">Faculty</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    theme === 'dark' 
                      ? 'bg-gray-700/50 border-gray-600 text-gray-800' 
                      : 'bg-gray-700/50 border-gray-300 text-gray-800',
                    errors.faculty ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'
                  }`}
                >
                  <option value="" className={`${theme === 'dark' ? 'bg-gray-800 text-gray-800' : 'bg-white text-gray-800'}`}>Select faculty</option>
                  <option value="Computing" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Computing</option>
                  <option value="Business" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Business</option>
                  <option value="Engineering" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Engineering</option>
                  <option value="Humanities & Sciences" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Humanities & Sciences</option>
                  <option value="Architecture" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Architecture</option>
                  <option value="Law" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-700/50 text-gray-800'}>Law</option>
                </select>
                {errors.faculty && <p className="text-red-400 text-xs mt-1">{errors.faculty}</p>}
              </div>

              {/* Academic Year */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-calendar-alt text-teal-400 text-xs "></i>
                    <span className="">Academic Year</span>
                    <span className="text-red-400">*</span>
                  </span>
                </label>
                <select
                  name="academic_year"
                  value={formData.academic_year}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800',
                    errors.academic_year ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}>Select year</option>
                  <option value="Year 1" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Year 1</option>
                  <option value="Year 2" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Year 2</option>
                  <option value="Year 3" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Year 3</option>
                  <option value="Year 4" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Year 4</option>
                </select>
                {errors.academic_year && <p className="text-red-400 text-xs mt-1">{errors.academic_year}</p>}
              </div>

              {/* Semester */}
              <div className="space-y-1">
                <label className="block text-xs font-medium     ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-clock text-cyan-400 text-xs  "></i>
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
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800',
                    errors.semester ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}>Select semester</option>
                  <option value="Semester 1" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Semester 1</option>
                  <option value="Semester 2" className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}>Semester 2</option>
                </select>
                {errors.semester && <p className="text-red-400 text-xs mt-1">{errors.semester}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Project Preferences */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-white text-sm dark:text-white"></i>
              </div>
              <h2 className="text-lg font-semibold    ">
                Project Preferences
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* First Preference */}
              <div className="space-y-1">
                <label className="block text-xs font-medium     ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-trophy text-yellow-400 text-xs   "></i>
                    <span className=" ">First Preference</span>
                    <span className="text-red-400   ">*</span>
                  </span>
                </label>
                <select
                  name="preference_1_category"
                  value={formData.preference_1_category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 ${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800',
                    errors.preference_1_category ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'
                  }`}
                >
                  <option value="" className={theme === 'dark' ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-400'}>Select first preference</option>
                  {categories.map((category, index) => (
                    <option 
                      key={index} 
                      value={category} 
                      className={theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-50'}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                {errors.preference_1_category && <p className="text-red-400 text-xs mt-1">{errors.preference_1_category}</p>}
              </div>

              {/* Second Preference */}
              <div className="space-y-1">
                <label className="block text-xs font-medium   ">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-medal  text-xs "></i>
                    <span className=" ">Second Preference</span>
                    <span className="text-red-400 ">*</span>
                  </span>
                </label>
                <select
                  name="preference_2_category"
                  value={formData.preference_2_category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 bg-gray-700/50 text-gray-100 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-1   ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-800',
                    errors.preference_2_category ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'
                  }`}
                >
                  <option value="" className="{theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-400'}">Select second preference</option>
                  {categories.filter(category => category !== formData.preference_1_category).map((category, index) => (
                    <option 
                      key={index} 
                      value={category} 
                      className={theme === 'dark' ? 'bg-gray-100 text-gray-800 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-500'}
                    >
                      {category}
                    </option>
                  ))}
                </select>
                {errors.preference_2_category && <p className="text-red-400 text-xs mt-1">{errors.preference_2_category}</p>}
              </div>
            </div>
          </div>


          

          {/* Section 6: Submit */}
          <div className={`backdrop-blur-sm rounded-lg shadow-lg p-5 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-paper-plane text-white text-sm "></i>
              </div>
              <h2 className="text-lg font-semibold   ">
                Submit Registration
              </h2>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-4 ">Review your information and submit your registration</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 mx-auto"
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

    
          

          
          {/* Section 4: Available Categories */}
          <div className={`backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-6 border transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-gray-100/95 border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-project-diagram text-white text-sm sm:text-lg"></i>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800  ">
                    Project Categories
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{categories.length} categories available</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
                  <i className="fas fa-info-circle"></i>
                  <span className="hidden md:inline">Tap for details</span>
                </div>
                <button
                  onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                  className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600 hover:border-gray-500'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>{isCategoriesExpanded ? 'Collapse' : 'View All'}</span>
                  <i className={`fas fa-chevron-${isCategoriesExpanded ? 'up' : 'down'} text-xs transition-transform duration-200`}></i>
                </button>
              </div>
            </div>
            
            {/* Collapsible Categories Grid */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isCategoriesExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {categories.map((category, index) => {
                const getCategoryIcon = (category) => {
                  if (category.includes('Diabetes')) return 'fas fa-heartbeat';
                  if (category.includes('Environment')) return 'fas fa-leaf';
                  if (category.includes('Hunger')) return 'fas fa-utensils';
                  if (category.includes('Cancer')) return 'fas fa-ribbon';
                  if (category.includes('Vision')) return 'fas fa-eye';
                  if (category.includes('Youth')) return 'fas fa-users';
                  if (category.includes('Disaster')) return 'fas fa-shield-alt';
                  if (category.includes('Children')) return 'fas fa-child';
                  if (category.includes('Waste')) return 'fas fa-recycle';
                  if (category.includes('Nutrition')) return 'fas fa-apple-alt';
                  if (category.includes('Peace')) return 'fas fa-dove';
                  if (category.includes('Sports')) return 'fas fa-running';
                  if (category.includes('Health')) return 'fas fa-stethoscope';
                  if (category.includes('Senior')) return 'fas fa-user-friends';
                  if (category.includes('Differently')) return 'fas fa-hands-helping';
                  if (category.includes('Public Relations')) return 'fas fa-bullhorn';
                  if (category.includes('Fundraiser')) return 'fas fa-donate';
                  if (category.includes('Education')) return 'fas fa-graduation-cap';
                  if (category.includes('Women')) return 'fas fa-female';
                  if (category.includes('Poverty')) return 'fas fa-home';
                  if (category.includes('Water')) return 'fas fa-tint';
                  if (category.includes('Crime')) return 'fas fa-gavel';
                  if (category.includes('Infrastructure')) return 'fas fa-city';
                  if (category.includes('Research')) return 'fas fa-flask';
                  if (category.includes('Drug')) return 'fas fa-pills';
                  if (category.includes('Animals')) return 'fas fa-paw';
                  if (category.includes('Fellowship')) return 'fas fa-handshake';
                  if (category.includes('Leoism')) return 'fas fa-crown';
                  return 'fas fa-star';
                };
                
                const getCategoryColor = (index) => {
                  const colors = [
                    'from-red-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-violet-500',
                    'from-yellow-500 to-orange-500',
                    'from-indigo-500 to-blue-500',
                    'from-pink-500 to-rose-500',
                    'from-teal-500 to-green-500'
                  ];
                  return colors[index % colors.length];
                };
                
                return (
                  <div 
                    key={index} 
                    onClick={() => handleCategoryClick(category)}
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
                  >
                    <div className="flex items-center p-2 sm:p-3 space-x-2 sm:space-x-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${getCategoryColor(index)} rounded-lg flex items-center justify-center flex-shrink-0 group-active:scale-110 transition-transform duration-200`}>
                        <i className={`${getCategoryIcon(category)} text-white text-xs sm:text-sm`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-[0.95rem] mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight line-clamp-1">
                          {category.replace('Project for ', '')}
                        </h3>
                        <div className="space-y-0.5 sm:space-y-1">
                          <span className="inline-block text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-blue-50 text-blue-600">Impact Project</span>
                          <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs text-gray-500">
                            <i className="fas fa-clock text-[9px] sm:text-xs"></i>
                            <span>Long-term</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                        <i className="fas fa-chevron-right text-xs"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
              
              {/* Bottom info section - Only show when expanded */}
              {isCategoriesExpanded && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                      <i className="fas fa-lightbulb text-yellow-500 text-sm sm:text-base"></i>
                      <span className="hidden sm:inline">Innovation</span>
                      <span className="sm:hidden">Innovate</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                      <i className="fas fa-globe text-blue-500 text-sm sm:text-base"></i>
                      <span className="hidden sm:inline">Global Impact</span>
                      <span className="sm:hidden">Global</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                      <i className="fas fa-certificate text-green-500 text-sm sm:text-base"></i>
                      <span className="hidden sm:inline">Skill Dev</span>
                      <span className="sm:hidden">Skills</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Collapsed state preview */}
            {!isCategoriesExpanded && (
              <div className="text-center py-4 sm:py-6">
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="flex -space-x-1.5 sm:-space-x-2">
                    {categories.slice(0, 5).map((_, index) => {
                      const colors = [
                        'from-red-500 to-pink-500',
                        'from-green-500 to-emerald-500',
                        'from-blue-500 to-cyan-500',
                        'from-purple-500 to-violet-500',
                        'from-yellow-500 to-orange-500'
                      ];
                      return (
                        <div 
                          key={index}
                          className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${colors[index]} rounded-full border-2 border-white flex items-center justify-center`}
                        >
                          <i className="fas fa-star text-white text-[8px] sm:text-xs"></i>
                        </div>
                      );
                    })}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-[10px] sm:text-xs font-bold">+{categories.length - 5}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">
                  {categories.length} project categories available
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs">
                  Tap "View All" to explore all categories
                </p>
              </div>
            )}
          </div>
        </form>
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

export default CategoryRegistration;
