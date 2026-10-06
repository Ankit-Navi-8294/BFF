import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ backgroundImage: "url('/hero_bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold text-dark-brown mb-6 leading-tight"
              >
                Food is better with your <span className="text-saffron">BFF</span>.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-700 mb-8"
              >
                Discover India's vibrant flavors, rich stories, and ultimate comfort foods — all curated in one place for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link to="/explore" className="bg-saffron text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-terracotta hover:shadow-lg transition flex items-center justify-center">
                  Explore Menu
                </Link>
                <Link to="/explore" className="bg-white border-2 border-saffron text-saffron px-8 py-3.5 rounded-xl font-semibold hover:bg-saffron/5 hover:shadow transition flex items-center justify-center">
                  Find My Craving
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-md text-terracotta mt-6 font-medium italic"
              >
                Because some flavors feel like home.
              </motion.p>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg relative"
            >
              {/* Decorative elements behind the image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-saffron/30 to-terracotta/30 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -inset-1 bg-saffron/20 rounded-[2rem] transform rotate-3"></div>
              
              <img 
                src="/hero_biryani.jpg" 
                alt="Delicious Indian Biryani" 
                className="relative z-10 w-full h-[400px] object-cover rounded-[2rem] shadow-2xl border-4 border-white"
              />
              
              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🌱</div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Fresh Ingredients</p>
                  <p className="text-sm font-bold text-dark-brown">100% Authentic</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What's your BFF craving?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: '🍛 Comfort Food', query: '?categoryId=2' },
              { label: '🌶️ Spicy', query: '?spiceLevel=4' },
              { label: '🥗 Healthy', query: '?vegetarian=true' },
              { label: '🍰 Sweet', query: '?categoryId=4' }
            ].map((item, idx) => (
              <motion.button
                key={idx}
                onClick={() => navigate(`/explore${item.query}`)}
                whileHover={{ y: -8 }}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition text-center w-full"
              >
                <p className="text-3xl mb-3">{item.label.split(' ')[0]}</p>
                <p className="text-lg font-bold text-dark-brown">{item.label.split(' ').slice(1).join(' ')}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-saffron text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to discover your next favorite meal?</h2>
          <p className="text-lg mb-6">Join thousands of food lovers enjoying India's best cuisines.</p>
          <Link to="/register" className="inline-block bg-white text-saffron px-8 py-3 rounded-lg font-semibold hover:bg-cream transition">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
