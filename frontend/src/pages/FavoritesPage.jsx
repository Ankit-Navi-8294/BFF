import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToCartStart, addToCartSuccess } from '../store/slices/cartSlice'
import { favoritesApi } from '../api/favorites'
import { cartApi } from '../api/cart'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchFavorites()
  }, [page])

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const res = await favoritesApi.getFavorites(page, 12)
      setFavorites(res.data.data?.content || [])
      setTotalPages(res.data.data?.totalPages || 1)
    } catch {
      toast.error('Failed to load favorites')
    } finally {
      setLoading(false)
    }
  }

  const handleUnfavorite = async (foodId, foodName) => {
    try {
      await favoritesApi.removeFavorite(foodId)
      setFavorites(prev => prev.filter(f => f.food?.id !== foodId))
      toast.success(`${foodName} removed from favorites`)
    } catch {
      toast.error('Failed to remove from favorites')
    }
  }

  const handleAddToCart = async (food) => {
    dispatch(addToCartStart())
    try {
      const res = await cartApi.addItem(food.id, 1)
      dispatch(addToCartSuccess(res.data.data))
      toast.success(`${food.name} added to cart! 🛒`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="min-h-screen bg-cream py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
            <Heart size={20} className="fill-white text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark-brown">My Favorites</h1>
            <p className="text-gray-500 text-sm">Foods your heart loves ❤️</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-5">💔</div>
            <h2 className="text-2xl font-bold text-dark-brown mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start exploring and save dishes you love!</p>
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-saffron text-white px-6 py-3 rounded-xl font-semibold"
              >
                Explore Food
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {favorites.map(({ food, id: favId }) => food && (
                  <motion.div
                    key={favId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
                  >
                    <Link to={`/food/${food.id}`}>
                      <div className="relative h-44 bg-gradient-to-br from-saffron/20 to-terracotta/20 flex items-center justify-center text-5xl overflow-hidden">
                        {food.imageUrl
                          ? <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          : <span>🍛</span>}
                        <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-medium text-yellow-600 flex items-center gap-1">
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          {food.rating?.toFixed(1) || '—'}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-dark-brown truncate mb-1">{food.name}</h3>
                        <p className="text-saffron font-bold text-lg">₹{food.price}</p>
                      </div>
                    </Link>

                    <div className="px-4 pb-4 flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        onClick={() => handleAddToCart(food)}
                        className="flex-1 bg-saffron text-white text-xs py-2 rounded-xl font-semibold hover:bg-terracotta transition"
                      >
                        + Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleUnfavorite(food.id, food.name)}
                        className="w-9 h-9 rounded-xl border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:border-saffron hover:text-saffron transition">← Prev</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition ${page === i ? 'bg-saffron text-white' : 'bg-white border border-gray-200 hover:border-saffron'}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:border-saffron hover:text-saffron transition">Next →</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
