export function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-gold text-2xl">🏠</div>
              <div>
                <h3 className="text-gold text-lg font-bold tracking-wider">TOP CHOICE</h3>
                <p className="text-gold/80 text-xs tracking-widest">REALTY LLC</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Our passion is Our clients. 🏠 Serving New York and New Jersey.
            </p>
            <p className="text-sm text-gold mt-2">📞 929-488-3666</p>
          </div>

              <div>
                <h4 className="text-gold text-sm font-semibold mb-4 tracking-wider">QUICK LINKS</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="hover:text-gold transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/listings" className="hover:text-gold transition-colors">
                      Browse Listings
                    </a>
                  </li>
                  <li>
                    <a href="/agents" className="hover:text-gold transition-colors">
                      Meet Our Agents
                    </a>
                  </li>
                  <li>
                    <a href="/login" className="hover:text-gold transition-colors">
                      Agent Login
                    </a>
                  </li>
                </ul>
              </div>

          <div>
            <h4 className="text-gold text-sm font-semibold mb-4 tracking-wider">CONTACT US</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>New York & New Jersey</li>
              <li className="text-gold">Phone: 929-488-3666</li>
              <li>Email: info@topchoicerealty.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Top Choice Realty LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

