import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Star, Clock, Flame, Leaf, Heart, ShoppingCart, ArrowLeft, Users } from 'lucide-react'
import { toast } from 'react-toastify'
import { addToCartStart, addToCartSuccess } from '../store/slices/cartSlice'
import { foodApi } from '../api/food'
import { cartApi } from '../api/cart'
import { favoritesApi } from '../api/favorites'

const SPICE_LABELS = ['', 'Mild', 'Medium', 'Spicy', 'Very Spicy', 'Extremely Spicy']
const SPICE_COLORS = ['', 'text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-red-700']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
        />
      ))}
    </div>
  )
}

export default function FoodDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { accessToken } = useSelector(state => state.auth)

  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true)
        const res = await foodApi.getById(id)
        setFood(res.data.data)

        if (accessToken) {
          const favRes = await favoritesApi.checkFavorite(id)
          setIsFav(favRes.data.data)
        }
      } catch {
        toast.error('Food not found')
        navigate('/explore')
      } finally {
        setLoading(false)
      }
    }
    fetchFood()
  }, [id, accessToken])

  const handleAddToCart = async () => {
    if (!accessToken) {
      toast.error('Please login to add to cart')
      navigate('/login')
      return
    }
    setAdding(true)
    dispatch(addToCartStart())
    try {
      const res = await cartApi.addItem(food.id, qty)
      dispatch(addToCartSuccess(res.data.data))
      toast.success(`${qty}× ${food.name} added to cart! 🛒`)
    } catch {
      toast.error('Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  const handleToggleFav = async () => {
    if (!accessToken) {
      toast.error('Please login to save favorites')
      navigate('/login')
      return
    }
    setFavLoading(true)
    try {
      if (isFav) {
        await favoritesApi.removeFavorite(food.id)
        setIsFav(false)
        toast.info('Removed from favorites')
      } else {
        await favoritesApi.addFavorite(food.id)
        setIsFav(true)
        toast.success('Added to favorites ❤️')
      }
    } catch {
      toast.error('Failed to update favorites')
    } finally {
      setFavLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream animate-pulse">
        <div className="h-72 bg-gray-200" />
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!food) return null

  const ingredients = food.ingredients
    ? food.ingredients.split(',').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 bg-gradient-to-br from-saffron/30 to-terracotta/30 overflow-hidden">
        {food.imageUrl
          ? <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-9xl">🍛</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-dark-brown rounded-full p-2.5 hover:bg-white transition shadow"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Fav button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleToggleFav}
          disabled={favLoading}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 hover:bg-white transition shadow"
        >
          <Heart
            size={20}
            className={`transition ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </motion.button>

        {/* Badge */}
        {food.vegetarian && (
          <span className="absolute bottom-4 left-4 bg-leaf-green text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium">
            <Leaf size={13} /> Pure Vegetarian
          </span>
        )}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + Meta */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-dark-brown">{food.name}</h1>
                <p className="text-2xl font-bold text-saffron whitespace-nowrap">₹{food.price}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={food.rating} />
                  <span className="text-sm font-bold">{food.rating?.toFixed(1)}</span>
                  <span className="text-sm text-gray-400 flex items-center gap-0.5">
                    <Users size={12} /> {food.ratingCount} reviews
                  </span>
                </div>
                <span className={`text-sm font-semibold ${SPICE_COLORS[food.spiceLevel]}`}>
                  🌶 {SPICE_LABELS[food.spiceLevel]}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={13} /> {food.preparationTime} min
                </span>
                <span className="text-sm text-gray-500">{food.calories} kcal</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {food.categoryName && (
                  <span className="bg-saffron/10 text-saffron text-xs px-3 py-1 rounded-full font-medium">{food.categoryName}</span>
                )}
                {food.regionName && (
                  <span className="bg-terracotta/10 text-terracotta text-xs px-3 py-1 rounded-full font-medium">📍 {food.regionName}</span>
                )}
                {food.cuisineName && (
                  <span className="bg-turmeric/10 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">{food.cuisineName}</span>
                )}
              </div>
            </div>

            {/* Description */}
            {food.description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-dark-brown mb-2">About this Dish</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{food.description}</p>
              </div>
            )}

            {/* Story */}
            {food.story && (
              <div className="bg-gradient-to-br from-saffron/5 to-terracotta/5 border border-saffron/20 rounded-2xl p-6">
                <h2 className="font-bold text-dark-brown mb-2 flex items-center gap-2">📖 The Story</h2>
                <p className="text-gray-700 leading-relaxed text-sm italic">{food.story}</p>
              </div>
            )}

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-dark-brown mb-3">Key Ingredients</h2>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing, i) => (
                    <span key={i} className="bg-cream text-dark-brown text-xs px-3 py-1.5 rounded-lg font-medium border border-gray-100">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              <h2 className="font-bold text-dark-brown text-lg mb-4">Order this Dish</h2>

              <div className="bg-cream rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-1">Price per serving</p>
                <p className="text-2xl font-bold text-saffron">₹{food.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm font-semibold text-dark-brown">Quantity</span>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-6 h-6 rounded-lg bg-white shadow flex items-center justify-center text-saffron font-bold text-lg hover:bg-saffron hover:text-white transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-6 h-6 rounded-lg bg-white shadow flex items-center justify-center text-saffron font-bold text-lg hover:bg-saffron hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4 font-medium">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-dark-brown">₹{(food.price * qty).toFixed(2)}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={adding || !food.available}
                className="w-full bg-gradient-to-r from-saffron to-terracotta text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 hover:shadow-lg transition"
              >
                <ShoppingCart size={17} />
                {!food.available ? 'Unavailable' : adding ? 'Adding…' : 'Add to Cart'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleToggleFav}
                disabled={favLoading}
                className={`mt-3 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border-2 transition ${
                  isFav
                    ? 'border-red-300 bg-red-50 text-red-500'
                    : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-400'
                }`}
              >
                <Heart size={17} className={isFav ? 'fill-red-500' : ''} />
                {isFav ? 'Saved to Favorites' : 'Save to Favorites'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
