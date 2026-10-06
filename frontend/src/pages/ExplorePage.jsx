import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, Star, Clock, Flame, Leaf } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addToCartStart, addToCartSuccess } from '../store/slices/cartSlice'
import { foodApi, categoryApi, regionApi, cuisineApi } from '../api/food'
import { cartApi } from '../api/cart'

const SPICE_ICONS = ['', '🌶', '🌶🌶', '🌶🌶🌶', '🌶🌶🌶🌶', '🌶🌶🌶🌶🌶']

function FoodCard({ food }) {
  const dispatch = useDispatch()
  const [adding, setAdding] = useState(false)

  const addToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    dispatch(addToCartStart())
    try {
      const res = await cartApi.addItem(food.id, 1)
      dispatch(addToCartSuccess(res.data.data))
      toast.success(`${food.name} added to cart! 🛒`)
    } catch (err) {
      toast.error(err.response?.status === 403 ? 'Please login to add to cart' : 'Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
    >
      <Link to={`/food/${food.id}`}>
        <div className="relative h-44 bg-gradient-to-br from-saffron/20 to-terracotta/20 overflow-hidden flex items-center justify-center text-5xl">
          {food.imageUrl
            ? <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            : <span>🍛</span>}
          {food.vegetarian && (
            <span className="absolute top-2 left-2 bg-leaf-green text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf size={10} /> Veg
            </span>
          )}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium text-yellow-600">
            <Star size={10} className="fill-yellow-400 text-yellow-400" /> {food.rating?.toFixed(1) || '—'}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-dark-brown text-base mb-0.5 truncate">{food.name}</h3>
          <p className="text-gray-500 text-xs mb-2 truncate">{food.categoryName} • {food.regionName}</p>
          <p className="text-gray-600 text-xs line-clamp-2 mb-3">{food.description}</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-saffron font-bold text-lg">₹{food.price}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-0.5"><Clock size={10} /> {food.preparationTime}m</span>
                <span>{SPICE_ICONS[food.spiceLevel] || ''}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              disabled={adding}
              className="bg-saffron text-white text-xs px-3 py-2 rounded-xl hover:bg-terracotta transition font-semibold disabled:opacity-50"
            >
              {adding ? '…' : '+ Cart'}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ExplorePage() {
  const [foods, setFoods] = useState([])
  const [categories, setCategories] = useState([])
  const [regions, setRegions] = useState([])
  const [cuisines, setCuisines] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const location = useLocation()
  
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search)
    return {
      name: searchParams.get('name') || '',
      categoryId: searchParams.get('categoryId') || '',
      regionId: searchParams.get('regionId') || '',
      cuisineId: searchParams.get('cuisineId') || '',
      vegetarian: searchParams.get('vegetarian') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      spiceLevel: searchParams.get('spiceLevel') || '',
    }
  })

  useEffect(() => {
    Promise.all([categoryApi.getAll(), regionApi.getAll(), cuisineApi.getAll()])
      .then(([c, r, cu]) => {
        setCategories(c.data.data || [])
        setRegions(r.data.data || [])
        setCuisines(cu.data.data || [])
      })
      .catch(() => {})
  }, [])

  const fetchFoods = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, size: 12 }
      Object.entries(filters).forEach(([k, v]) => { if (v !== '') params[k] = v })
      const res = await foodApi.search(params)
      setFoods(res.data.data?.content || [])
      setTotalPages(res.data.data?.totalPages || 1)
    } catch {
      toast.error('Failed to load foods')
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    const delay = setTimeout(fetchFoods, 300)
    return () => clearTimeout(delay)
  }, [fetchFoods])

  const updateFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: val }))
    setPage(0)
  }

  const clearFilters = () => {
    setFilters({ name: '', categoryId: '', regionId: '', cuisineId: '', vegetarian: '', minPrice: '', maxPrice: '', spiceLevel: '' })
    setPage(0)
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron to-terracotta text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Explore Indian Cuisine</h1>
          <p className="text-white/80">Discover thousands of authentic dishes from across India</p>

          {/* Search */}
          <div className="mt-6 relative max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter('name', e.target.value)}
              placeholder="Search for biryani, dosa, butter chicken…"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-dark-brown focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md text-sm"
            />
            {filters.name && (
              <button onClick={() => updateFilter('name', '')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              filtersOpen ? 'bg-saffron text-white border-saffron' : 'bg-white text-gray-600 border-gray-200 hover:border-saffron'
            }`}
          >
            <SlidersHorizontal size={15} /> Filters {hasActiveFilters && <span className="bg-white text-saffron rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">{Object.values(filters).filter(v => v !== '').length}</span>}
          </button>

          {/* Quick filters */}
          <button
            onClick={() => updateFilter('vegetarian', filters.vegetarian === 'true' ? '' : 'true')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              filters.vegetarian === 'true' ? 'bg-leaf-green text-white border-leaf-green' : 'bg-white text-gray-600 border-gray-200 hover:border-leaf-green'
            }`}
          >
            <Leaf size={14} /> Vegetarian
          </button>
          <button
            onClick={() => updateFilter('spiceLevel', filters.spiceLevel === '2' ? '' : '2')}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium border transition ${
              filters.spiceLevel === '2' ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-gray-600 border-gray-200 hover:border-terracotta'
            }`}
          >
            <Flame size={14} /> Mild (≤2)
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-saffron transition flex items-center gap-1">
              <X size={14} /> Clear all
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                  <select
                    value={filters.categoryId}
                    onChange={(e) => updateFilter('categoryId', e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Region</label>
                  <select
                    value={filters.regionId}
                    onChange={(e) => updateFilter('regionId', e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  >
                    <option value="">All Regions</option>
                    {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Cuisine</label>
                  <select
                    value={filters.cuisineId}
                    onChange={(e) => updateFilter('cuisineId', e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  >
                    <option value="">All Cuisines</option>
                    {cuisines.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Spice Level (max)</label>
                  <select
                    value={filters.spiceLevel}
                    onChange={(e) => updateFilter('spiceLevel', e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  >
                    <option value="">Any</option>
                    {[1,2,3,4,5].map(l => <option key={l} value={l}>{SPICE_ICONS[l]} Level {l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Min Price (₹)</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    placeholder="0"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Max Price (₹)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    placeholder="1000"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-saffron/50"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-dark-brown mb-2">No dishes found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{foods.length} dishes found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {foods.map(food => <FoodCard key={food.id} food={food} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-saffron hover:text-saffron transition"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition ${
                      page === i ? 'bg-saffron text-white' : 'bg-white border border-gray-200 hover:border-saffron hover:text-saffron'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:border-saffron hover:text-saffron transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
