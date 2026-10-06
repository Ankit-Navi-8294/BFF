import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react'
import { toast } from 'react-toastify'
import { ordersApi } from '../api/orders'

const STATUS_COLORS = {
  PLACED: 'bg-blue-100 text-blue-700',
  CONFIRMED: 'bg-purple-100 text-purple-700',
  PREPARING: 'bg-yellow-100 text-yellow-700',
  PACKED: 'bg-orange-100 text-orange-700',
  OUT_FOR_DELIVERY: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

const STATUS_ICONS = {
  PLACED: '📋',
  CONFIRMED: '✅',
  PREPARING: '👨‍🍳',
  PACKED: '📦',
  OUT_FOR_DELIVERY: '🛵',
  DELIVERED: '🎉',
  CANCELLED: '❌',
}

const STATUS_STEPS = ['PLACED', 'CONFIRMED', 'PREPARING', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED']

function OrderProgress({ status }) {
  if (status === 'CANCELLED') {
    return (
      <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
        ❌ This order was cancelled
      </div>
    )
  }
  const currentIdx = STATUS_STEPS.indexOf(status)
  return (
    <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-2">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`flex flex-col items-center min-w-[64px]`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < currentIdx ? 'bg-saffron text-white' :
              i === currentIdx ? 'bg-saffron text-white ring-4 ring-saffron/30' :
              'bg-gray-100 text-gray-400'
            }`}>
              {i <= currentIdx ? STATUS_ICONS[step] : i + 1}
            </div>
            <span className={`text-xs mt-1 text-center leading-tight ${i <= currentIdx ? 'text-saffron font-semibold' : 'text-gray-400'}`}>
              {step.replace('_', ' ')}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 w-8 mx-1 flex-shrink-0 rounded ${i < currentIdx ? 'bg-saffron' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
  const time = new Date(order.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      {/* Order Header */}
      <div
        className="p-5 cursor-pointer hover:bg-gray-50 transition"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-saffron/10 rounded-xl flex items-center justify-center text-xl">
              {STATUS_ICONS[order.status]}
            </div>
            <div>
              <p className="font-bold text-dark-brown text-sm">Order #{order.id}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <Clock size={11} /> {date} at {time}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-saffron">₹{order.total?.toFixed(2)}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                {order.status?.replace('_', ' ')}
              </span>
            </div>
            <div className="text-gray-400">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
        </div>

        {/* Progress */}
        <OrderProgress status={order.status} />
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <div className="p-5 space-y-4">
              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div>
                  <h4 className="font-semibold text-dark-brown text-sm mb-3">Ordered Items</h4>
                  <div className="space-y-2">
                    {[...order.items].map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-saffron/10 text-saffron rounded-lg flex items-center justify-center text-xs font-bold">
                            {item.quantity}×
                          </span>
                          <span className="text-dark-brown font-medium">{item.food?.name}</span>
                        </div>
                        <span className="text-gray-600">₹{item.total?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="bg-cream rounded-xl p-4 text-sm space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>₹{order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST</span><span>₹{order.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span><span>₹{order.deliveryFee?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-dark-brown border-t border-gray-200 pt-1.5">
                  <span>Total Paid</span><span className="text-saffron">₹{order.total?.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery info */}
              {order.deliveryAddress && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-saffron mt-0.5 flex-shrink-0" />
                  <span>{order.deliveryAddress}</span>
                </div>
              )}
              {order.specialInstructions && (
                <p className="text-xs text-gray-500 italic">
                  "{order.specialInstructions}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchOrders()
  }, [page])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await ordersApi.getOrders(page, 10)
      setOrders(res.data.data?.content || [])
      setTotalPages(res.data.data?.totalPages || 1)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-saffron to-terracotta rounded-xl flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark-brown">My Orders</h1>
            <p className="text-gray-500 text-sm">Track all your BFF deliveries</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-24 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-5">📦</div>
            <h2 className="text-2xl font-bold text-dark-brown mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Your order history will appear here</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => <OrderCard key={order.id} order={order} />)}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:border-saffron hover:text-saffron transition">← Prev</button>
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:border-saffron hover:text-saffron transition">Next →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
