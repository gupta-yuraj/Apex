import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  CheckCircle, 
  X, 
  Loader2,
  FileText,
  Users,
  Target,
  TrendingUp,
  Award,
  Mail,
  Building2,
  ChevronRight
} from 'lucide-react';

// API URL - change this after deploying backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

const JobPosting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    resume: '',
    message: ''
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            college: '',
            year: '',
            resume: '',
            message: ''
          });
        }, 3002);
      } else {
        alert(result.error || 'Failed to submit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setIsSuccess(false);
    }
  };

  const responsibilities = [
    'Assist in gathering and documenting business requirements from stakeholders',
    'Conduct market research and competitive analysis using industry databases',
    'Analyze operational data using Excel to identify trends and process improvements',
    'Prepare reports, presentations, and documentation for management review',
    'Collaborate with cross-functional teams on live client projects',
    'Support project management activities and track deliverables',
    'Participate in client meetings and workshops (shadowing)'
  ];

  const requirements = [
    'Currently pursuing or recently completed BBA/B.Com/BM (2022-2025 batches)',
    'Strong analytical mindset with proficiency in MS Excel and PowerPoint',
    'Excellent written and verbal communication skills',
    'Basic understanding of business processes and market research techniques',
    'Ability to work independently and manage multiple tasks',
    'Prior internship experience is a plus but not mandatory'
  ];

  const skills = [
    'Excel', 'PowerPoint', 'Data Analysis', 'Market Research', 
    'Business Strategy', 'Client Management'
  ];

  const timeline = [
    {
      title: 'Application Review',
      desc: 'Screening of CV and cover letter (3-5 days)',
      icon: FileText
    },
    {
      title: 'Aptitude Test',
      desc: 'Online assessment: Analytical & business case (30 mins)',
      icon: Target
    },
    {
      title: 'Interview Round',
      desc: 'Technical + HR interview via Google Meet (45 mins)',
      icon: Users
    },
    {
      title: 'Offer Rollout',
      desc: 'Final selection and onboarding within 1 week',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 font-sans text-slate-800">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
        
        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                A
              </div>
              <span className="text-2xl font-bold tracking-tight">ApexCore Solutions</span>
            </div>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium border border-white/30">
              Actively Hiring
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 leading-tight">
            Business Operations & Strategy Intern
          </h1>
          
          <div className="flex items-center gap-2 text-blue-700 mb-6 text-lg">
            <MapPin className="w-5 h-5" />
            <span>ApexCore Solutions Pvt. Ltd. • Bengaluru, India</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b-2 border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">₹12-18K</p>
              <p className="text-sm text-slate-600">per month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">3-6 Months</p>
              <p className="text-sm text-slate-600">Duration</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">Hybrid</p>
              <p className="text-sm text-slate-600">3 days in office</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">Immediate</p>
              <p className="text-sm text-slate-600">Start Date</p>
            </div>
          </div>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Join our fast-growing consulting team and gain hands-on experience in business analysis, 
            process optimization, and strategic planning. Work on real client projects with mentorship 
            from industry experts.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
            >
              Apply Now
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Applications closing soon • 12 positions available
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About the Role */}
            <div 
              id="card-1"
              className={`animate-card bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 ${
                visibleCards['card-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">About the Role</h2>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                We are seeking motivated BBA students to join our Business Operations team. This internship 
                offers exposure to consulting methodologies, data-driven decision making, and client management.
              </p>

              <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Responsibilities:</h3>
              <ul className="space-y-3">
                {responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="text-orange-500 mt-1">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div 
              id="card-2"
              className={`animate-card bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 delay-100 ${
                visibleCards['card-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Requirements</h2>
              </div>

              <ul className="space-y-3 mb-6">
                {requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-slate-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Selection Process */}
            <div 
              id="card-3"
              className={`animate-card bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 delay-200 ${
                visibleCards['card-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-700" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900">Selection Process</h2>
              </div>

              <div className="relative pl-8 border-l-2 border-gradient-to-b from-orange-400 to-blue-700">
                {timeline.map((step, idx) => (
                  <div key={idx} className="relative mb-8 last:mb-0 pl-6">
                    <div className="absolute -left-[41px] top-1 w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                      <step.icon className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Perks Card */}
            <div 
              id="card-4"
              className={`animate-card bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-lg p-8 text-white transition-all duration-700 ${
                visibleCards['card-4'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Perks & Benefits</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-200 mb-1">Stipend</p>
                  <p className="text-xl font-bold">₹12,000 - ₹18,000/month</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-200 mb-1">Certificate</p>
                  <p className="text-xl font-bold">Internship Certificate + LOR</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-sm text-blue-200 mb-1">PPO Opportunity</p>
                  <p className="text-xl font-bold">Pre-placement offer for top performers</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  Mentorship from senior consultants
                </li>
                <li className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Building2 className="w-4 h-4 text-orange-400" />
                  Real client project exposure
                </li>
                <li className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  Networking events & workshops
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  Flexible work arrangements
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div 
              id="card-5"
              className={`animate-card bg-white rounded-2xl shadow-lg p-8 transition-all duration-700 delay-100 ${
                visibleCards['card-5'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-slate-700" />
                </div>
                <h2 className="text-xl font-bold text-blue-900">Company Info</h2>
              </div>

              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                ApexCore Solutions is a boutique management consulting firm specializing in 
                business transformation and operational excellence for mid-market enterprises.
              </p>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>BTM 2nd Stage, 7th cross, 8th Main Road, Bangaluru, Karnataka-560076</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>50-200 employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>Consulting & Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 mt-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg '%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to kickstart your career?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50+ interns who have launched their consulting careers with ApexCore Solutions
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Apply for this Internship
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-blue-200 text-sm">
            <Mail className="w-4 h-4" />
            <span>Questions? Write to us at </span>
            <a href="mailto:careers@apexcore-solutions.in" className="text-orange-400 hover:underline font-medium">
              careers@apexcore-solutions.in
            </a>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            {!isSuccess ? (
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900">Apply for Internship</h2>
                    <p className="text-slate-600 mt-1">Business Operations & Strategy Intern</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        College/University *
                      </label>
                      <input
                        type="text"
                        name="college"
                        required
                        value={formData.college}
                        onChange={handleInputChange}
                        placeholder="e.g., Christ University"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Year of Study *
                      </label>
                      <input
                        type="text"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleInputChange}
                        placeholder="e.g., 3rd Year"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Resume/CV Link (Google Drive/Dropbox) *
                    </label>
                    <input
                      type="url"
                      name="resume"
                      required
                      value={formData.resume}
                      onChange={handleInputChange}
                      placeholder="https://drive.google.com/ ..."
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Why should we hire you? (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your interest and relevant skills..."
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Application Submitted!</h2>
                <p className="text-slate-600 mb-6">
                  We've received your application. Check your email for confirmation within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;