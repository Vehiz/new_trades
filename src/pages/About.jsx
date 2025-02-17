// import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-[125px] bg-white">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About BlockMine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in the world of trading and investments. We provide cutting-edge tools and insights for traders of all levels.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To democratize trading by providing accessible, professional-grade tools and education to traders worldwide, enabling them to make informed decisions in the financial markets.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the world&apos;s leading platform for trading education and analysis, creating a community where traders of all levels can thrive and succeed.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose BlockMine</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Execution</h3>
              <p className="text-gray-600">Lightning-fast trade execution with real-time market data updates.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Bank-grade security measures to protect your assets and data.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support to assist you with any queries.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-12">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Frederick Cooper', role: 'Technical Analyst', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
              { name: 'Sarah Smith', role: 'Head of Trading', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
              { name: 'Mike Johnson', role: 'Chief Analyst', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
              { name: 'Emily Brown', role: 'Head of Support', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About; 