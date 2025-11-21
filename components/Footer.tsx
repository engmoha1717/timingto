import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-20 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Global Time
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your trusted time zone converter for seamless global communication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#converter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Time Converter
                </Link>
              </li>
              <li>
                <Link href="/#popular-cities" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Popular Cities
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a href="https://www.timeanddate.com/time/dst/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Time Zones
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Daylight_saving_time" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Daylight Saving Time
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-white">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a href="mailto:contact@globaltime.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {currentYear} Global Time. Made with ❤️ for travelers worldwide.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>Powered by IANA Time Zone Database</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}