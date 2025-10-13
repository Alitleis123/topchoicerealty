import { useQuery } from '@tanstack/react-query';
import { agentsApi } from '../lib/api';
import { Button } from '../components/Button';
import profileImage from '../assets/topchoicerealtypfp.jpg';

export function Agents() {
  const { data, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => agentsApi.getAll(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-gold">Expert Team</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our passionate real estate professionals are dedicated to helping you find your perfect home. 
            With years of experience across New York and New Jersey, we're here to guide you every step of the way.
          </p>
        </div>

        {/* Agents Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gold mx-auto"></div>
            <p className="mt-4 text-gray-700 font-medium">Loading our team...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {data?.data.agents.map((agent, index) => (
              <div
                key={agent._id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gold/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover-lift animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              >
                {/* Agent Photo */}
                <div className="relative h-64 bg-gradient-to-br from-gold/10 to-gold/5">
                  <img
                    src={profileImage}
                    alt={agent.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gold shadow-2xl mx-auto mt-8"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Licensed Agent
                  </div>
                </div>

                {/* Agent Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                  <p className="text-gold font-semibold mb-4">📞 {agent.phone}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      Licensed Agent
                    </span>
                    {agent.name === 'John Doe' && (
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Luxury Properties
                      </span>
                    )}
                    {agent.name === 'Jane Lee' && (
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        First-Time Buyers
                      </span>
                    )}
                    {agent.name === 'Ola Tleis' && (
                      <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                        Investment Properties
                      </span>
                    )}
                  </div>
                  
                  {agent.bio && (
                    <div className="text-gray-600 mb-6 leading-relaxed">
                      <p className="text-sm">{agent.bio}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center justify-center w-full px-4 py-3 bg-gradient-gold text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Send Email
                    </a>

                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-12 text-center border-4 border-gold">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Work With Our <span className="text-gold">Expert Team</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our agents are standing by to help you buy, sell, or invest in real estate. 
            Contact us today for a free consultation!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:929-488-3666">
              <Button size="lg" className="min-w-[200px]">
                📞 Call 929-488-3666
              </Button>
            </a>
            <a href="mailto:info@topchoicerealty.com">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                ✉️ Send Email
              </Button>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gold/30">
            <p className="text-gold font-semibold text-lg">
              🏠 Serving New York & New Jersey
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Licensed Real Estate Professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
