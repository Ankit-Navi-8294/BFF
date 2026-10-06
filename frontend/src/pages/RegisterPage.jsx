import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Heart } from 'lucide-react'
import { toast } from 'react-toastify'
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import { authApi } from '../api/auth'

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    dispatch(loginStart())
    try {
      const res = await authApi.register(form.firstName, form.lastName, form.email, form.password)
      const { accessToken, refreshToken, user } = res.data.data
      dispatch(loginSuccess({ accessToken, refreshToken, user }))
      toast.success(`Welcome to BFF, ${user.firstName}! 🎉`)
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.'
      dispatch(loginFailure(msg))
      toast.error(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-white to-saffron/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-terracotta to-saffron p-8 text-center text-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 text-3xl"
            >
              🍛
            </motion.div>
            <h1 className="text-3xl font-bold">Join BFF</h1>
            <p className="text-white/80 mt-1">Discover India's best flavors</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-1.5">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      placeholder="Priya"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron transition text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-1.5">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      placeholder="Sharma"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron transition text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-dark-brown mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron transition text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-dark-brown mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Min. 8 characters"
                    className="w-full pl-9 pr-12 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron transition text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-saffron"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Password strength bar */}
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      form.password.length === 0 ? 'w-0' :
                      form.password.length < 8 ? 'w-1/3 bg-red-400' :
                      form.password.length < 12 ? 'w-2/3 bg-yellow-400' :
                      'w-full bg-leaf-green'
                    }`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-terracotta to-saffron text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating account…
                  </span>
                ) : 'Create My Account'}
              </motion.button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-500">
              Already a foodie?{' '}
              <Link to="/login" className="text-saffron font-semibold hover:text-terracotta transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
