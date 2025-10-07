import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import profileImage from '../assets/topchoicerealtypfp.jpg';
import { SalesSlideshow } from '../components/SalesSlideshow';

export function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[700px] bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-5xl px-4">
            <div className="mb-6">
              <div className="inline-block text-gold text-6xl mb-4">🏠</div>
              <h1 className="text-6xl md:text-7xl font-bold mb-2 tracking-tight">
                <span className="text-gold">TOP CHOICE</span> <span className="text-white">REALTY</span>
              </h1>
              <p className="text-gold/90 text-lg tracking-widest mb-8">REALTY LLC</p>
            </div>
            <p className="text-2xl md:text-3xl mb-4 font-light text-gray-100">
              Our Passion is Our Clients
            </p>
            <p className="text-xl md:text-2xl mb-10 text-gray-300">
              🏠 Serving New York and New Jersey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/listings">
                <Button size="lg" className="min-w-[200px]">Browse Listings</Button>
              </Link>
              <a href="tel:929-488-3666">
                <Button size="lg" variant="outline" className="min-w-[200px] border-gold text-gold hover:bg-gold hover:text-black">
                  📞 929-488-3666
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Recent <span className="text-gold">Success Stories</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">See our latest successful transactions</p>
        </div>
        
        <SalesSlideshow />
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-gold opacity-10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-black to-gray-900 rounded-3xl p-8 border-4 border-gold shadow-2xl">
                <div className="text-center">
                  <img
                    src={profileImage}
                    alt="Top Choice Realty"
                    className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-gold shadow-2xl mb-6"
                  />
                  <h3 className="text-3xl font-bold text-gold mb-2">TOP CHOICE REALTY</h3>
                  <p className="text-gold/80 text-sm tracking-widest mb-4">REALTY LLC</p>
                  <div className="border-t border-gold/30 pt-4 space-y-2">
                    <p className="text-gray-300 text-lg">Our Passion is Our Clients</p>
                    <p className="text-gold/90 text-sm">🏠 Serving NY & NJ</p>
                    <a href="tel:929-488-3666" className="block text-gold font-bold text-2xl mt-4 hover:text-gold-light transition-colors">
                      📞 929-488-3666
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                About <span className="text-gold">Top Choice Realty</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-gold mb-6"></div>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Our passion is serving our clients across <strong>New York and New Jersey</strong>. 
                We specialize in helping families and individuals find their perfect homes with 
                personalized service and deep local market expertise.
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Whether you're buying your first home, upgrading to a larger property, or
                looking for an investment opportunity, we're here to guide you through every
                step with integrity and dedication.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-gold text-3xl">📞</div>
                <div>
                  <p className="text-sm text-gray-500">Call us today</p>
                  <a href="tel:929-488-3666" className="text-2xl font-bold text-gold hover:text-gold-dark">
                    929-488-3666
                  </a>
                </div>
              </div>
              <Link to="/listings">
                <Button variant="primary" size="lg">View All Properties</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black py-16 border-y-2 border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-gold mb-2">10+</div>
              <p className="text-gray-300 text-lg">Years Experience</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gold mb-2">500+</div>
              <p className="text-gray-300 text-lg">Happy Families</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gold mb-2">100%</div>
              <p className="text-gray-300 text-lg">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose <span className="text-gold">Top Choice</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gold/10">
              <div className="bg-gradient-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Agents</h3>
              <p className="text-gray-600">
                Our experienced team knows NY & NJ markets inside and out
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gold/10">
              <div className="bg-gradient-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Access to exclusive listings and off-market properties
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gold/10">
              <div className="bg-gradient-gold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Client-Focused</h3>
              <p className="text-gray-600">
                Our passion is our clients - dedicated support every step of the way
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-20 border-t-2 border-gold">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Find Your <span className="text-gold">Dream Home</span>?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Browse our current listings or contact our agents today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/listings">
              <Button size="lg" className="min-w-[200px]">
                View Listings
              </Button>
            </Link>
            <a href="tel:929-488-3666">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                📞 Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

