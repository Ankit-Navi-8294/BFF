import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-saffron mb-4">❤️ BFF</h3>
            <p className="text-cream">Good Food. Great Memories. Forever BFF.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-saffron transition">Explore</Link></li>
              <li><Link to="/favorites" className="hover:text-saffron transition">Favorites</Link></li>
              <li><Link to="/orders" className="hover:text-saffron transition">Orders</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:hello@bff.com" className="hover:text-saffron transition">hello@bff.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+919876543210" className="hover:text-saffron transition">+91 9876 543 210</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-saffron transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-saffron transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-saffron transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream mt-8 pt-8 text-center">
          <p>&copy; 2024 Best Food Forever. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
