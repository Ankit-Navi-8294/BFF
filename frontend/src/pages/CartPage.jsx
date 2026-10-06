import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { toast } from 'react-toastify'
import { setCart, addToCartSuccess, removeFromCart, clearCart } from '../store/slices/cartSlice'
import { cartApi } from '../api/cart'
import { ordersApi } from '../api/orders'

const SPICE_DOTS = (level) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`w-2 h-2 rounded-full inline-block mx-0.5 ${i < level ? 'bg-terracotta' : 'bg-gray-200'}`} />
  ))

export default function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, subtotal } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(true)
  const [checkoutModal, setCheckoutModal] = useState(false)
  const [orderForm, setOrderForm] = useState({ deliveryAddress: '', phoneNumber: '', specialInstructions: '' })
  const [placingOrder, setPlacingOrder] = useState(false)

  const tax = subtotal * 0.05
  const deliveryFee = subtotal > 0 ? 50 : 0
  const total = subtotal + tax + deliveryFee

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await cartApi.getCart()
      dispatch(setCart(res.data.data))
    } catch {
      // Cart fetch error, probably not logged in
    } finally {
      setLoading(false)
    }
  }

  const handleQuantityChange = async (cartItemId, newQty) => {
    try {
      if (newQty <= 0) {
        await cartApi.removeItem(cartItemId)
        dispatch(removeFromCart(cartItemId))
      } else {
        const res = await cartApi.updateItem(cartItemId, newQty)
        dispatch(addToCartSuccess(res.data.data))
      }
    } catch {
      toast.error('Failed to update cart')
    }
  }

  const handleRemove = async (cartItemId) => {
    try {
      await cartApi.removeItem(cartItemId)
      dispatch(removeFromCart(cartItemId))
      toast.success('Item removed')
    } catch {
      toast.error('Failed to remove item')
    }
  }

  const handleClear = async () => {
    try {
      await cartApi.clearCart()
      dispatch(clearCart())
      toast.success('Cart cleared')
    } catch {
      toast.error('Failed to clear cart')
    }
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setPlacingOrder(true)
    try {
      await ordersApi.createOrder(orderForm.deliveryAddress, orderForm.phoneNumber, orderForm.specialInstructions)
      dispatch(clearCart())
      setCheckoutModal(false)
      toast.success('Order placed successfully! 🎉')
      navigate('/orders')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally {
      setPlacingOrder(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500">Loading your cart…</p>
        </div>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-dark-brown mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet!</p>
          <Link to="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-saffron text-white px-6 py-3 rounded-xl font-semibold hover:bg-terracotta transition"
            >
              Explore Food
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-dark-brown">
            Shopping Cart <span className="text-saffron">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </h1>
          <button
            onClick={handleClear}
            className="text-sm text-red-400 hover:text-red-600 transition flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="bg-white rounded-2xl shadow-sm p-5 flex gap-4"
                >
                  {/* Food image placeholder */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-saffron/20 to-terracotta/20 flex-shrink-0 flex items-center justify-center text-3xl overflow-hidden">
                    {item.food?.imageUrl
                      ? <img src={item.food.imageUrl} alt={item.food?.name} className="w-full h-full object-cover rounded-xl" />
                      : '🍛'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-dark-brown text-base truncate">{item.food?.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {item.food?.vegetarian && (
                            <span className="text-xs bg-leaf-green/10 text-leaf-green px-2 py-0.5 rounded-full font-medium">🌱 Veg</span>
                          )}
                          <div className="flex items-center">{SPICE_DOTS(item.food?.spiceLevel || 0)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-300 hover:text-red-400 transition ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-saffron font-bold text-lg">
                        ₹{((item.price || item.food?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      {/* Qty Controls */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-saffron hover:text-white transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-saffron hover:text-white transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-dark-brown mb-5 flex items-center gap-2">
                <Tag size={18} className="text-saffron" /> Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-dark-brown text-base">
                  <span>Total</span>
                  <span className="text-saffron">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCheckoutModal(true)}
                className="mt-6 w-full bg-gradient-to-r from-saffron to-terracotta text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </motion.button>

              <Link to="/explore" className="block text-center text-sm text-saffron mt-4 hover:text-terracotta transition">
                ← Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={(e) => e.target === e.currentTarget && setCheckoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-dark-brown mb-2 flex items-center gap-2">
                <ShoppingBag className="text-saffron" /> Delivery Details
              </h2>
              <p className="text-gray-500 text-sm mb-6">Tell us where to deliver your food 🚚</p>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-1.5">Delivery Address *</label>
                  <textarea
                    value={orderForm.deliveryAddress}
                    onChange={(e) => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                    required
                    rows={3}
                    placeholder="123 MG Road, Bengaluru, Karnataka 560001"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={orderForm.phoneNumber}
                    onChange={(e) => setOrderForm({ ...orderForm, phoneNumber: e.target.value })}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-brown mb-1.5">Special Instructions</label>
                  <input
                    type="text"
                    value={orderForm.specialInstructions}
                    onChange={(e) => setOrderForm({ ...orderForm, specialInstructions: e.target.value })}
                    placeholder="Less spice, no onions…"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/50 text-sm"
                  />
                </div>

                <div className="bg-cream rounded-xl p-4 text-sm">
                  <div className="flex justify-between font-bold text-dark-brown">
                    <span>Total to Pay</span>
                    <span className="text-saffron text-lg">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutModal(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    disabled={placingOrder}
                    className="flex-1 bg-gradient-to-r from-saffron to-terracotta text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60"
                  >
                    {placingOrder ? 'Placing…' : 'Place Order 🎉'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
