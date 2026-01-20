// Beautiful nature images from Unsplash for room backgrounds
// These are high-quality landscape and nature photos

export const NATURE_IMAGES = [
  // Mountains & Landscapes
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80', // Mountain landscape
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80', // Mountain peak
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80', // Mountain valley
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop&q=80', // Sunset mountains
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', // Mountain meadow

  // Forests & Trees
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80', // Forest path
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', // Forest road
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&auto=format&fit=crop&q=80', // Forest sunlight
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80', // Dense forest
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80', // Foggy forest

  // Lakes & Water
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop&q=80', // Lake landscape
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80', // Foggy lake
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=80', // Lake sunset
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&auto=format&fit=crop&q=80', // Ocean rocks

  // Fields & Meadows
  'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=80', // Flower field
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=80', // Golden wheat field
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80', // Green meadow

  // Sky & Clouds
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80', // Dramatic sky
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80', // Mountain with clouds
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=80', // Aurora borealis

  // Coastal & Beach
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', // Tropical beach
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=80', // Coastal cliffs
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop&q=80', // Misty lake

  // Canyons & Deserts
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=800&auto=format&fit=crop&q=80', // Desert sunset
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop&q=80', // Canyon landscape

  // Seasons
  'https://images.unsplash.com/photo-1478827217976-0fbaa8fdf530?w=800&auto=format&fit=crop&q=80', // Autumn forest
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&auto=format&fit=crop&q=80', // Winter mountains
  'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&auto=format&fit=crop&q=80', // Spring flowers

  // Rivers & Waterfalls
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=80', // Mountain river
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80', // Waterfall
];

/**
 * Get a nature image by index, cycling through available images
 */
export const getNatureImage = (index: number): string => {
  return NATURE_IMAGES[index % NATURE_IMAGES.length];
};

/**
 * Get a random nature image
 */
export const getRandomNatureImage = (): string => {
  return NATURE_IMAGES[Math.floor(Math.random() * NATURE_IMAGES.length)];
};
