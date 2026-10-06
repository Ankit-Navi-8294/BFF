-- Roles
INSERT INTO roles (id, name, description) VALUES
(1, 'USER', 'User Role'),
(2, 'ADMIN', 'Admin Role');

-- Regions
INSERT INTO regions (id, name, description, image_url, code, created_at, updated_at) VALUES
(1, 'North India', 'Rich curries and tandoori flavors', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', 'NORTH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'South India', 'Spicy, tangy, and coconut-based dishes', 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80', 'SOUTH', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'East India', 'Subtle flavors and sweet desserts', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', 'EAST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'West India', 'Diverse, colorful, and street food favorites', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', 'WEST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Cuisines
INSERT INTO cuisines (id, name, description, image_url, code, created_at, updated_at) VALUES
(1, 'Punjabi', 'Hearty and buttery', 'https://images.unsplash.com/photo-1603894584373-581d6fbc3dbb?w=800&q=80', 'PUNJABI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Chettinad', 'Fiery and aromatic', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80', 'CHETTINAD', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Bengali', 'Mustard oil and seafood', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', 'BENGALI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Gujarati', 'Sweet and savory thalis', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', 'GUJARATI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Categories
INSERT INTO categories (id, name, description, image_url, emoji, code, created_at, updated_at) VALUES
(1, 'Starters', 'Small bites to begin', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', '🥟', 'STARTER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Mains', 'The main course', 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80', '🍛', 'MAIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Breads', 'Indian flatbreads', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', '🫓', 'BREAD', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Desserts', 'Sweet treats', 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80', '🍰', 'DESSERT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Foods
INSERT INTO foods (id, name, description, story, price, image_url, vegetarian, spice_level, preparation_time, calories, rating, rating_count, available, ingredients, category_id, region_id, cuisine_id, created_at, updated_at) VALUES
(1, 'Butter Chicken', 'Classic creamy tomato curry with tender chicken pieces.', 'A staple of North Indian cuisine born in Delhi.', 350.0, 'https://images.unsplash.com/photo-1603894584373-581d6fbc3dbb?w=800&q=80', FALSE, 2, 45, 600, 4.8, 120, TRUE, 'Chicken, Tomato, Butter, Cream, Spices', 2, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Hyderabadi Biryani', 'Fragrant basmati rice layered with marinated meat and spices.', 'The royal dish of the Nizams of Hyderabad.', 420.0, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80', FALSE, 4, 60, 800, 4.9, 340, TRUE, 'Basmati Rice, Mutton, Spices, Saffron, Ghee', 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Paneer Tikka', 'Grilled cottage cheese cubes marinated in spiced yogurt.', 'The perfect vegetarian starter for any feast.', 280.0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', TRUE, 3, 25, 400, 4.7, 89, TRUE, 'Paneer, Yogurt, Capsicum, Onion, Spices', 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Masala Dosa', 'Crispy fermented crepe filled with spiced potato curry.', 'A breakfast favorite from the southern coast.', 150.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', TRUE, 2, 15, 350, 4.6, 210, TRUE, 'Rice, Lentils, Potato, Curry Leaves, Mustard Seeds', 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Gulab Jamun', 'Deep-fried milk dumplings soaked in rose-scented syrup.', 'The king of Indian desserts.', 120.0, 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80', TRUE, 1, 20, 450, 4.9, 450, TRUE, 'Khoya, Sugar, Rose Water, Cardamom', 4, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Punjabi Samosa', 'Crispy pastry filled with spiced potatoes and peas.', 'India''s most loved street snack.', 60.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', TRUE, 3, 15, 250, 4.8, 560, TRUE, 'Flour, Potato, Peas, Spices, Oil', 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Gujarati Thali', 'A grand platter featuring a mix of sweet, spicy, and savory dishes.', 'A complete meal showcasing the vibrant flavors of Gujarat.', 500.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', TRUE, 2, 30, 900, 4.7, 130, TRUE, 'Roti, Dal, Kadhi, Sabzi, Rice, Sweet', 2, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Chicken Chettinad', 'Fiery chicken curry made with fresh ground spices and coconut.', 'A classic from the Chettinad region of Tamil Nadu.', 380.0, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80', FALSE, 5, 50, 650, 4.8, 220, TRUE, 'Chicken, Coconut, Black Pepper, Star Anise, Spices', 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Palak Paneer', 'Soft paneer cubes in a smooth spinach curry.', 'A healthy and hearty vegetarian classic.', 260.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80', TRUE, 2, 30, 350, 4.7, 180, TRUE, 'Paneer, Spinach, Garlic, Spices, Cream', 2, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Vada Pav', 'Spiced potato dumpling inside a bread bun, served with chutneys.', 'The beating heart of Mumbai street food.', 40.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', TRUE, 4, 10, 300, 4.8, 420, TRUE, 'Potato, Bread Bun, Garlic Chutney, Green Chutney', 1, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Rasgulla', 'Spongy cheese balls soaked in a light sugar syrup.', 'A melt-in-the-mouth Bengali delicacy.', 90.0, 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80', TRUE, 1, 40, 200, 4.6, 310, TRUE, 'Milk, Sugar, Rose Water', 4, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Chole Bhature', 'Spicy chickpea curry served with puffy fried bread.', 'The ultimate North Indian comfort food.', 180.0, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80', TRUE, 3, 45, 750, 4.9, 580, TRUE, 'Chickpeas, Flour, Onion, Spices, Tomato', 2, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Fish Curry (Machher Jhol)', 'Traditional Bengali fish stew with mustard oil and spices.', 'A daily staple in Bengal.', 320.0, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', FALSE, 3, 35, 450, 4.7, 150, TRUE, 'Fish, Mustard Oil, Potato, Spices', 2, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Dhokla', 'Steamed savory sponge cake made from fermented batter.', 'A healthy and light snack from Gujarat.', 80.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', TRUE, 2, 25, 180, 4.5, 290, TRUE, 'Gram Flour, Yogurt, Mustard Seeds, Curry Leaves', 1, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Gajar Ka Halwa', 'Slow-cooked carrot dessert with milk, sugar, and nuts.', 'A winter favorite across India.', 140.0, 'https://images.unsplash.com/photo-1603894584373-581d6fbc3dbb?w=800&q=80', TRUE, 1, 60, 400, 4.8, 410, TRUE, 'Carrots, Milk, Ghee, Sugar, Nuts', 4, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Idli Sambar', 'Soft steamed rice cakes served with lentil vegetable stew.', 'A wholesome and healthy South Indian breakfast.', 110.0, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80', TRUE, 2, 20, 250, 4.7, 630, TRUE, 'Rice, Lentils, Vegetables, Tamarind, Spices', 2, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);