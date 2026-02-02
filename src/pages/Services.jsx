import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="pt-24 md:pt-[125px] bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Our Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive trading solutions designed to meet your investment needs
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {[
            {
              title: "Cryptocurrency Trading",
              description: "Access the world's leading cryptocurrencies with advanced trading tools and real-time market data.",
              icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Stock Market Trading",
              description: "Trade stocks with professional-grade tools, real-time quotes, and advanced charting capabilities.",
              icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )
            },
            {
              title: "Forex Trading",
              description: "Access the global forex market with competitive spreads and advanced trading tools.",
              icon: (
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              )
            }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 sm:p-8 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">Premium Features</h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Real-time Analytics",
                description: "Get instant insights with our advanced analytics tools."
              },
              {
                title: "Professional Charts",
                description: "Access professional-grade charting tools and indicators."
              },
              {
                title: "Market News",
                description: "Stay updated with real-time market news and analysis."
              },
              {
                title: "Portfolio Management",
                description: "Manage and track your investments in one place."
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-500 p-2 rounded-full mr-3 sm:mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-500 text-white rounded-lg p-6 sm:p-10 md:p-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Trading?</h2>
          <p className="text-sm sm:text-base mb-6 sm:mb-8">Join thousands of traders who trust our platform</p>
          <Link to="/login" className="bg-white text-blue-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services; 