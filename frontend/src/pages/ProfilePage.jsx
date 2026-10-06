import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Camera, Save, LogOut } from 'lucide-react'
import { toast } from 'react-toastify'
import { setUser, logout } from '../store/slices/authSlice'
import { authApi } from '../api/auth'
import api from '../api/client'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApi.me()
        const u = res.data.data
        dispatch(setUser(u))
        setForm({
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          phoneNumber: u.phoneNumber || '',
        })
      } catch {
        // user already in redux
        if (user) {
          setForm({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            phoneNumber: user.phoneNumber || '',
          })
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Update profile endpoint
      const res = await api.put('/profile', form)
      dispatch(setUser(res.data.data))
      toast.success('Profile updated! ✅')
      setEditing(false)
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    toast.info('Logged out successfully')
  }

  const currentUser = user || {}
  const initials = `${form.firstName?.[0] || ''}${form.lastName?.[0] || ''}`.toUpperCase() || '?'
  const memberSince = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '—'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6"
        >
          {/* Cover */}
          <div className="h-28 bg-gradient-to-r from-saffron to-terracotta relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
          </div>

          {/* Avatar + Name */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-saffron to-terracotta flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                  {currentUser.profileImageUrl
                    ? <img src={currentUser.profileImageUrl} alt="profile" className="w-full h-full object-cover rounded-2xl" />
                    : initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-cream transition">
                  <Camera size={12} className="text-saffron" />
                </div>
              </div>
              <div className="flex gap-2">
                {!editing ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 rounded-xl bg-saffron text-white text-sm font-semibold hover:bg-terracotta transition"
                  >
                    Edit Profile
                  </motion.button>
                ) : (
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {!editing ? (
              <div>
                <h1 className="text-2xl font-bold text-dark-brown">
                  {form.firstName} {form.lastName}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
                  <Mail size={13} /> {currentUser.email}
                </p>
                {form.phoneNumber && (
                  <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1.5">
                    <Phone size={13} /> {form.phoneNumber}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">Member since {memberSince}</p>

                <div className="flex gap-3 mt-4">
                  {currentUser.emailVerified && (
                    <span className="text-xs bg-leaf-green/10 text-leaf-green px-3 py-1 rounded-full font-medium">✓ Email Verified</span>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">First Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Last Name</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-saffron to-terracotta text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Save size={15} />
                  {saving ? 'Saving…' : 'Save Changes'}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="font-bold text-dark-brown mb-4">Account</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 text-red-500 font-semibold text-sm hover:bg-red-50 transition"
          >
            <LogOut size={16} /> Sign Out
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
