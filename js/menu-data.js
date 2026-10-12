/**
 * Coffee & Cuddles - Complete Menu and Origin Data
 * As specified in Client Brief 3: Coffee & Cuddles
 * Digvijay Kaushal & Vaishnavi Sharma, Dehradun
 */

const MENU_ITEMS = [
  // 1. Espresso
  {
    id: "espresso",
    name: "Espresso",
    category: "Espresso",
    categorySlug: "espresso",
    tastingNote: "Dark chocolate, caramel, a clean finish",
    noteTags: ["chocolate-caramel", "bold"],
    inspiredBy: "Milan, Italy",
    coordinates: { lat: 45.4642, lng: 9.1900 },
    region: "Europe",
    description: "Extracted under nine bars of pressure to deliver a dense crema, rich cocoa depth, and a whisper of golden caramel.",
    curatorNote: "Milan taught us that an espresso is not rushed; it is an punctuation mark in the middle of a bustling day."
  },
  {
    id: "doppio",
    name: "Doppio",
    category: "Espresso",
    categorySlug: "espresso",
    tastingNote: "Double shot, rich and syrupy",
    noteTags: ["bold", "chocolate-caramel"],
    inspiredBy: "Trieste, Italy",
    coordinates: { lat: 45.6495, lng: 13.7768 },
    region: "Europe",
    description: "Two precise extractions pulled into a warm porcelain cup. Thick, concentrated, and enduringly complex.",
    curatorNote: "In Trieste's windy seaside piazzas, writers drank double shots while watching ships dock from distant continents."
  },
  {
    id: "americano",
    name: "Americano",
    category: "Espresso",
    categorySlug: "espresso",
    tastingNote: "Smooth and bright, brewed long",
    noteTags: ["fruity-floral", "bold"],
    inspiredBy: "New York, USA",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    region: "Americas",
    description: "Rich double espresso elongated with hot filtered spring water, preserving delicate floral aromatics and clean body.",
    curatorNote: "Walking through Manhattan in late autumn, clutching a warm long brew as the avenues turn gold."
  },
  {
    id: "ristretto",
    name: "Ristretto",
    category: "Espresso",
    categorySlug: "espresso",
    tastingNote: "Short and concentrated, with a sweet edge",
    noteTags: ["sweet-creamy", "bold"],
    inspiredBy: "Rome, Italy",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    region: "Europe",
    description: "Restricted extraction pulling only the sweetest, most aromatic first drops of the grind.",
    curatorNote: "Near the Pantheon, where Digvijay learned that sweetness in coffee comes from discipline, not sugar."
  },

  // 2. Espresso and milk
  {
    id: "cortado",
    name: "Cortado",
    category: "Espresso and milk",
    categorySlug: "espresso-milk",
    tastingNote: "Equal parts espresso and warm milk",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Madrid, Spain",
    coordinates: { lat: 40.4168, lng: -3.7038 },
    region: "Europe",
    description: "Served in a small Gibraltar glass; equal measures of bold espresso cut gently with textured warm whole milk.",
    curatorNote: "Ordered at midday in Barrio de las Letras while waiting for the afternoon light to soften for photography."
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Espresso and milk",
    categorySlug: "espresso-milk",
    tastingNote: "Velvety microfoam over a double shot",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Melbourne, Australia",
    coordinates: { lat: -37.8136, lng: 144.9631 },
    region: "Oceania",
    description: "Silky microfoam poured seamlessly over a double ristretto, highlighting the inherent butterscotch notes of our roast.",
    curatorNote: "Melbourne treated milk like silk; their baristas taught us the temperature threshold where lactose becomes naturally sweet."
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Espresso and milk",
    categorySlug: "espresso-milk",
    tastingNote: "Balanced, with a thick cloud of foam",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Florence, Italy",
    coordinates: { lat: 43.7696, lng: 11.2558 },
    region: "Europe",
    description: "One third espresso, one third steamed milk, one third dense velvety foam dusted with raw cocoa.",
    curatorNote: "Never after eleven in the morning if you ask an Italian, but here on Rajpur Road, you may have it anytime the mist rolls in."
  },
  {
    id: "caffe-latte",
    name: "Caffe Latte",
    category: "Espresso and milk",
    categorySlug: "espresso-milk",
    tastingNote: "Mellow, creamy and comforting",
    noteTags: ["sweet-creamy"],
    inspiredBy: "Vienna, Austria",
    coordinates: { lat: 48.2082, lng: 16.3738 },
    region: "Europe",
    description: "Gentle espresso folded into generous steamed milk with a feather-light crest of foam. Mild, warming, and comforting.",
    curatorNote: "In historic Viennese coffeehouses, where patrons would sit for five hours with one cup and three morning newspapers."
  },
  {
    id: "mocha",
    name: "Mocha",
    category: "Espresso and milk",
    categorySlug: "espresso-milk",
    tastingNote: "Espresso, dark chocolate and steamed milk",
    noteTags: ["chocolate-caramel", "sweet-creamy"],
    inspiredBy: "Yemen",
    coordinates: { lat: 15.3694, lng: 44.1910 },
    region: "Middle East",
    description: "Single-origin espresso blended with 70% stone-ground dark chocolate and gentle steamed milk.",
    curatorNote: "Honoring Al-Makha, the ancient Red Sea port from where coffee first crossed oceans to conquer the world."
  },

  // 3. Signature
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    category: "Signature",
    categorySlug: "signature",
    tastingNote: "Sweet condensed milk over espresso",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Valencia, Spain",
    coordinates: { lat: 39.4699, lng: -0.3763 },
    region: "Europe",
    description: "Rich condensed milk nestled under a freshly pulled double shot and silky steamed milk.",
    curatorNote: "Drank cold under the orange trees of Valencia, sweet and fortifying after long walking journeys."
  },
  {
    id: "kerala-filter-kaapi",
    name: "Kerala Filter Kaapi",
    category: "Signature",
    categorySlug: "signature",
    tastingNote: "Strong decoction with frothed milk, served in a steel tumbler",
    noteTags: ["bold", "smoky-earthy", "sweet-creamy"],
    inspiredBy: "Kerala, India",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    region: "Asia",
    description: "Slow brass-filter decoction of chicory-kissed Arabica, aerated repeatedly with boiling milk, poured at height into a traditional dabarah and tumbler.",
    curatorNote: "The sound of coffee being meter-poured in Malabar at dawn; a sensory memory that anchored us during twenty years overseas."
  },
  {
    id: "vietnamese-egg-coffee",
    name: "Vietnamese Egg Coffee",
    category: "Signature",
    categorySlug: "signature",
    tastingNote: "Whipped egg cream over strong robusta",
    noteTags: ["sweet-creamy", "bold"],
    inspiredBy: "Hanoi, Vietnam",
    coordinates: { lat: 21.0285, lng: 105.8542 },
    region: "Asia",
    description: "Intense drip-brewed robusta topped with an airy, meringue-like custard whipped from egg yolk and condensed milk.",
    curatorNote: "Tucked inside an alleyway off Hoan Kiem Lake, Hanoi showed us that coffee can be both dessert and sanctuary."
  },

  // 4. Traditional
  {
    id: "turkish-coffee",
    name: "Turkish Coffee",
    category: "Traditional",
    categorySlug: "traditional",
    tastingNote: "Fine grind, thick and aromatic, served with a sweet",
    noteTags: ["spiced-earthy", "bold"],
    inspiredBy: "Istanbul, Turkey",
    coordinates: { lat: 41.0082, lng: 28.9784 },
    region: "Middle East",
    description: "Micro-ground beans brewed slowly in a hand-hammered copper cezve on hot sand. Unfiltered, fragrant with cardamom, served with Turkish delight.",
    curatorNote: "A Turkish proverb says coffee should be black as night, strong as death, and sweet as love. We serve it with quiet reverence."
  },
  {
    id: "ethiopian-coffee-ceremony",
    name: "Ethiopian Coffee Ceremony",
    category: "Traditional",
    categorySlug: "traditional",
    tastingNote: "Floral, fruity and spiced, poured slowly from a clay pot",
    noteTags: ["fruity-floral", "spiced-earthy"],
    inspiredBy: "Addis Ababa, Ethiopia",
    coordinates: { lat: 9.0320, lng: 38.7481 },
    region: "Africa",
    description: "Ceremonial heirloom beans roasted green, hand-crushed, and brewed in a terracotta jebena over glowing charcoal embers.",
    curatorNote: "Our first posting together in 2004. We sat on rushes in Addis Ababa, bathed in frankincense, as our neighbor poured three graceful rounds: Abol, Tona, and Baraka."
  },

  // 5. Slow brew
  {
    id: "v60-pour-over",
    name: "V60 Pour Over",
    category: "Slow brew",
    categorySlug: "slow-brew",
    tastingNote: "Clean, delicate and fruity",
    noteTags: ["fruity-floral"],
    inspiredBy: "Tokyo, Japan",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    region: "Asia",
    description: "Precision hand-pour through a spiral glass cone. Accentuates nuanced berry brightness, jasmine floral notes, and a translucent tea-like clarity.",
    curatorNote: "Tokyo kissatens taught us the meditative art of the goose-neck kettle. Breath, water, bean, and silence."
  },
  {
    id: "french-press",
    name: "French Press",
    category: "Slow brew",
    categorySlug: "slow-brew",
    tastingNote: "Full-bodied and earthy",
    noteTags: ["smoky-earthy", "bold"],
    inspiredBy: "Paris, France",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    region: "Europe",
    description: "Four-minute full immersion steep followed by a steel mesh plunge. Preserves natural coffee oils for an unctuous, rustic mouthfeel.",
    curatorNote: "Overcast mornings in Montmartre, dipping warm butter brioche into a ceramic bowl of dark French roast."
  },
  {
    id: "aeropress",
    name: "Aeropress",
    category: "Slow brew",
    categorySlug: "slow-brew",
    tastingNote: "Crisp and sweet with low bitterness",
    noteTags: ["fruity-floral", "chocolate-caramel"],
    inspiredBy: "Stockholm, Sweden",
    coordinates: { lat: 59.3293, lng: 18.0686 },
    region: "Europe",
    description: "Air-pressure rapid extraction yielding exceptional sweetness, bright acidity, and zero sediment.",
    curatorNote: "During Swedish Fika, enjoying clean light-roast coffee with cinnamon buns while snow fell gently outside the glass."
  },

  // 6. Cold
  {
    id: "cold-brew",
    name: "Cold Brew",
    category: "Cold",
    categorySlug: "cold",
    tastingNote: "Steeped for 18 hours, smooth and low in acidity",
    noteTags: ["chocolate-caramel", "bold"],
    inspiredBy: "Brooklyn, USA",
    coordinates: { lat: 40.6782, lng: -73.9442 },
    region: "Americas",
    description: "Coarse single-origin grounds submerged in cold mountain water for 18 slow hours. Velvety cocoa notes and zero astringency.",
    curatorNote: "Drank in repurposed warehouse cafes along the East River while discussing art and photography."
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "Cold",
    categorySlug: "cold",
    tastingNote: "Espresso poured over ice and cold milk",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Seoul, South Korea",
    coordinates: { lat: 37.5665, lng: 126.9780 },
    region: "Asia",
    description: "Hand-shaken double espresso floated over fresh cold milk and crystal-clear ice blocks. Clean layers, brisk refreshment.",
    curatorNote: "In Seoul, even in midwinter, students and artists carry iced lattes through the narrow streets of Bukchon."
  },

  // 7. Dessert
  {
    id: "affogato",
    name: "Affogato",
    category: "Dessert",
    categorySlug: "dessert",
    tastingNote: "Hot espresso poured over vanilla gelato",
    noteTags: ["sweet-creamy", "chocolate-caramel"],
    inspiredBy: "Naples, Italy",
    coordinates: { lat: 40.8518, lng: 14.2681 },
    region: "Europe",
    description: "A quenelle of artisan Madagascar vanilla bean gelato ‘drowned’ tableside under a piping hot, syrupy shot of espresso.",
    curatorNote: "In the shadow of Mount Vesuvius, where sweet and bitter collide in twenty exquisite seconds before the gelato melts."
  },

  // 8. House blend
  {
    id: "hills-special",
    name: "Hills Special",
    category: "House blend",
    categorySlug: "house-blend",
    tastingNote: "Smoky, nutty and honeyed, made with beans from Coorg",
    noteTags: ["smoky-earthy", "chocolate-caramel"],
    inspiredBy: "Dehradun, India",
    coordinates: { lat: 30.3165, lng: 78.0322 },
    region: "India",
    description: "Our signature tribute to the Himalayas. Shade-grown Arabica from ancient Coorg estates, hand-roasted weekly in Dehradun.",
    curatorNote: "The culmination of our two-decade voyage. Crafted specifically for chilly Doon mornings and misty views of Mussoorie."
  }
];

const CATEGORIES = [
  { name: "All", slug: "all" },
  { name: "Espresso", slug: "espresso" },
  { name: "Espresso & Milk", slug: "espresso-milk" },
  { name: "Signature", slug: "signature" },
  { name: "Traditional", slug: "traditional" },
  { name: "Slow Brew", slug: "slow-brew" },
  { name: "Cold", slug: "cold" },
  { name: "Dessert", slug: "dessert" },
  { name: "House Blend", slug: "house-blend" }
];

const TASTING_PROFILES = [
  { name: "All Notes", tag: "all" },
  { name: "Chocolate & Caramel", tag: "chocolate-caramel" },
  { name: "Fruity & Floral", tag: "fruity-floral" },
  { name: "Sweet & Creamy", tag: "sweet-creamy" },
  { name: "Bold & Concentrated", tag: "bold" },
  { name: "Spiced & Earthy", tag: "spiced-earthy" }
];
