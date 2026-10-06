import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Menu, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { logout } from '../store/slices/authSlice'

export default function Navbar() {
  const { user, accessToken } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-saffron"
            >
              ❤️ BFF
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="hover:text-saffron transition">
              Explore
            </Link>
            {accessToken && (
              <>
                <Link to="/favorites" className="flex items-center gap-1 hover:text-saffron transition">
                  <Heart size={20} /> Favorites
                </Link>
                <Link to="/orders" className="hover:text-saffron transition">
                  Orders
                </Link>
                <Link to="/profile" className="hover:text-saffron transition">
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
              >
                <ShoppingCart className="text-saffron" size={24} />
              </motion.div>
            </Link>

            {!accessToken ? (
              <Link to="/login" className="bg-saffron text-white px-4 py-2 rounded-lg hover:bg-terracotta transition">
                Login
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-dark-brown transition"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
