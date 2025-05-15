/*
  # Seed Initial Data for Event Management App

  1. Sample Events
    - Creates 10 sample events with different categories, dates, and locations
  
  2. Admin User
    - Creates an admin user in the profiles table
*/

-- Seed events table with sample data
INSERT INTO events (title, description, date, time, location, image, category, organizer, price)
VALUES
  (
    'Tech Conference 2025',
    'Join us for the biggest tech conference of the year. Learn from industry experts, network with professionals, and discover the latest innovations in technology.',
    '2025-03-15',
    '9:00 AM',
    'Convention Center, New York',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Conference',
    'Tech Events Inc.',
    99.99
  ),
  (
    'Music Festival',
    'A three-day music festival featuring top artists from around the world. Experience amazing performances, great food, and unforgettable memories.',
    '2025-04-20',
    '4:00 PM',
    'Central Park, New York',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Concert',
    'Music Productions',
    149.99
  ),
  (
    'Startup Networking Mixer',
    'Connect with fellow entrepreneurs, investors, and industry professionals. Share ideas, find potential partners, and grow your business network.',
    '2025-02-28',
    '6:30 PM',
    'Innovation Hub, San Francisco',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Networking',
    'Startup Accelerator',
    0
  ),
  (
    'Web Development Workshop',
    'Learn the fundamentals of web development in this hands-on workshop. Topics include HTML, CSS, JavaScript, and responsive design principles.',
    '2025-03-05',
    '10:00 AM',
    'Tech Campus, Austin',
    'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Workshop',
    'Code Academy',
    49.99
  ),
  (
    'Art Exhibition: Modern Perspectives',
    'Explore contemporary art from emerging artists around the world. The exhibition features paintings, sculptures, digital art, and interactive installations.',
    '2025-03-10',
    '11:00 AM',
    'Metropolitan Art Gallery, Chicago',
    'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Exhibition',
    'Arts Council',
    15.00
  ),
  (
    'Charity Run for Education',
    'Join our annual 5K run to raise funds for underprivileged children''s education. All proceeds go directly to providing educational resources and scholarships.',
    '2025-04-05',
    '8:00 AM',
    'Riverside Park, Boston',
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Sports',
    'Education Foundation',
    25.00
  ),
  (
    'Business Leadership Summit',
    'A two-day summit focused on developing leadership skills for the modern business environment. Learn from successful CEOs and business leaders.',
    '2025-03-25',
    '9:30 AM',
    'Grand Hotel, Seattle',
    'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Conference',
    'Business Leaders Association',
    199.99
  ),
  (
    'Cooking Masterclass: Italian Cuisine',
    'Learn to cook authentic Italian dishes from a renowned chef. The class includes hands-on cooking experience and a delicious meal to enjoy afterward.',
    '2025-02-20',
    '6:00 PM',
    'Culinary Institute, Los Angeles',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Workshop',
    'Gourmet Cooking School',
    75.00
  ),
  (
    'Film Festival',
    'A celebration of independent cinema featuring screenings, director Q&As, and workshops. Discover groundbreaking films from around the world.',
    '2025-04-15',
    '2:00 PM',
    'Cinema Center, Miami',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Festival',
    'Independent Film Society',
    35.00
  ),
  (
    'Yoga and Wellness Retreat',
    'A weekend of yoga, meditation, and wellness activities. Recharge your mind and body in a peaceful natural setting with expert instructors.',
    '2025-05-10',
    '7:00 AM',
    'Mountain Resort, Denver',
    'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Wellness',
    'Harmony Wellness Center',
    299.99
  );

-- Note: We don't need to seed the admin user here as it will be created
-- when the user signs up through the application and then manually
-- updated to have admin role in the database.