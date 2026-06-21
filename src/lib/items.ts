import type { Difficulty, GameItem } from "./types";

type ItemSeed = [string, number, Difficulty?];
type DeckSeed = {
  category: string;
  imageQuery: string;
  source: string;
  difficulty?: Difficulty;
  items: ItemSeed[];
};

const deckSeeds: DeckSeed[] = [
  {
    category: "Everyday Items",
    imageQuery: "everyday household products",
    source: "https://www.target.com/",
    items: [
      ["Tide Liquid Laundry Detergent 92 fl oz", 12],
      ["Bounty Select-A-Size Paper Towels 8 Rolls", 23],
      ["Charmin Ultra Soft Toilet Paper 12 Mega Rolls", 19],
      ["Dawn Platinum Dish Soap 32.7 oz", 6],
      ["Clorox Disinfecting Wipes 75 Count", 5],
      ["Colgate Total Toothpaste 4.8 oz", 4],
      ["Dove Beauty Bar 8 Pack", 12],
      ["Duracell AA Batteries 16 Pack", 18],
      ["Glad Tall Kitchen Trash Bags 110 Count", 20],
      ["Ziploc Sandwich Bags 145 Count", 7]
    ]
  },
  {
    category: "Groceries",
    imageQuery: "grocery food",
    source: "https://www.walmart.com/cp/food/976759",
    items: [
      ["Gallon of Whole Milk", 4],
      ["Dozen Large Eggs", 3],
      ["Bananas 1 lb", 1],
      ["Honeycrisp Apples 3 lb Bag", 6],
      ["Ground Beef 1 lb", 6],
      ["Chicken Breast 1 lb", 5],
      ["Cheerios Cereal Family Size", 6],
      ["Sourdough Bread Loaf", 5],
      ["Starbucks Ground Coffee 12 oz", 12],
      ["Ben and Jerry's Ice Cream Pint", 6]
    ]
  },
  {
    category: "Fast Food",
    imageQuery: "fast food meal",
    source: "https://www.fastfoodmenuprices.com/",
    items: [
      ["McDonald's Big Mac Meal", 11],
      ["Chick-fil-A Sandwich Meal", 10],
      ["Taco Bell Crunchwrap Supreme Combo", 9],
      ["Wendy's Baconator Combo", 12],
      ["Burger King Whopper Meal", 11],
      ["Chipotle Chicken Burrito", 10],
      ["Popeyes Chicken Sandwich Combo", 10],
      ["Subway Footlong Turkey Sandwich", 11],
      ["Five Guys Cheeseburger and Fries", 18],
      ["Domino's Medium Pepperoni Pizza", 13]
    ]
  },
  {
    category: "Household Products",
    imageQuery: "cleaning supplies",
    source: "https://www.homedepot.com/",
    items: [
      ["Dyson V8 Cordless Vacuum", 469, "Medium"],
      ["Swiffer WetJet Starter Kit", 27],
      ["Mr. Clean Magic Eraser 10 Pack", 10],
      ["Febreze Air Freshener 2 Pack", 7],
      ["O-Cedar EasyWring Spin Mop", 35],
      ["Simplehuman 45L Step Trash Can", 120, "Medium"],
      ["Brita Large Water Filter Pitcher", 38],
      ["Rubbermaid Storage Tote 18 Gal", 14],
      ["Command Picture Hanging Strips 16 Pairs", 12],
      ["Shark Steam Pocket Mop", 90, "Medium"]
    ]
  },
  {
    category: "School Supplies",
    imageQuery: "school supplies",
    source: "https://www.staples.com/",
    items: [
      ["Five Star Spiral Notebook 5 Subject", 8],
      ["Ticonderoga Pencils 24 Count", 6],
      ["Crayola Colored Pencils 50 Count", 10],
      ["TI-84 Plus Graphing Calculator", 118, "Medium"],
      ["JanSport SuperBreak Backpack", 38],
      ["Elmer's Glue Sticks 12 Pack", 5],
      ["Expo Dry Erase Markers 12 Pack", 11],
      ["Sharpie Permanent Markers 12 Count", 10],
      ["Avery 1 Inch Binder", 6],
      ["Post-it Notes 12 Pads", 14]
    ]
  },
  {
    category: "Pet Supplies",
    imageQuery: "pet supplies",
    source: "https://www.chewy.com/",
    items: [
      ["Purina Pro Plan Dog Food 35 lb", 72],
      ["Blue Buffalo Cat Food 15 lb", 42],
      ["Fresh Step Cat Litter 42 lb", 22],
      ["Kong Classic Dog Toy Large", 13],
      ["Greenies Dental Treats 36 oz", 37],
      ["Seresto Flea Collar for Dogs", 65],
      ["Frisco Cat Tree 72 inch", 95, "Medium"],
      ["Petmate Two Door Dog Kennel", 58],
      ["Aquarium Starter Kit 10 Gallon", 74],
      ["Temptations Cat Treats 30 oz", 17]
    ]
  },
  {
    category: "Smartphones",
    imageQuery: "smartphone",
    source: "https://www.bestbuy.com/site/mobile-cell-phones/",
    difficulty: "Medium",
    items: [
      ["Apple iPhone 15 Pro 128GB", 999],
      ["Samsung Galaxy S24 Ultra 256GB", 1299],
      ["Google Pixel 8 Pro 128GB", 999],
      ["OnePlus 12 256GB", 799],
      ["Motorola Razr Plus 2024", 999],
      ["Samsung Galaxy Z Fold6", 1899, "Hard"],
      ["Apple iPhone SE 64GB", 429],
      ["Google Pixel 8a", 499],
      ["Samsung Galaxy A35 5G", 399],
      ["Nothing Phone 2", 599]
    ]
  },
  {
    category: "Laptops",
    imageQuery: "laptop computer",
    source: "https://www.bestbuy.com/site/laptop-computers/",
    difficulty: "Medium",
    items: [
      ["Apple MacBook Air 13 M3", 1099],
      ["Apple MacBook Pro 14 M3 Pro", 1999],
      ["Dell XPS 13", 1299],
      ["HP Spectre x360 14", 1449],
      ["Lenovo ThinkPad X1 Carbon", 1789],
      ["Microsoft Surface Laptop 7", 999],
      ["ASUS ROG Zephyrus G14", 1599],
      ["Acer Chromebook Plus 515", 399],
      ["Razer Blade 16", 2999, "Hard"],
      ["Framework Laptop 13", 1049]
    ]
  },
  {
    category: "Gaming Consoles",
    imageQuery: "gaming console",
    source: "https://www.bestbuy.com/site/video-games/",
    difficulty: "Easy",
    items: [
      ["PlayStation 5 Slim Disc Console", 499],
      ["Xbox Series X 1TB Console", 499],
      ["Nintendo Switch OLED Model", 349],
      ["Steam Deck OLED 512GB", 549],
      ["Meta Quest 3 128GB", 499],
      ["Nintendo Switch Lite", 199],
      ["Xbox Series S 512GB", 299],
      ["PlayStation Portal Remote Player", 199],
      ["ASUS ROG Ally Z1 Extreme", 699],
      ["Lenovo Legion Go", 699]
    ]
  },
  {
    category: "Headphones",
    imageQuery: "headphones",
    source: "https://www.bestbuy.com/site/headphones/",
    difficulty: "Easy",
    items: [
      ["Sony WH-1000XM5 Headphones", 399],
      ["Apple AirPods Max", 549],
      ["Bose QuietComfort Ultra Headphones", 429],
      ["Beats Studio Pro", 349],
      ["Sennheiser Momentum 4", 379],
      ["Apple AirPods Pro 2", 249],
      ["Jabra Elite 10 Earbuds", 249],
      ["Sony WF-1000XM5 Earbuds", 299],
      ["Bose QuietComfort Ultra Earbuds", 299],
      ["Anker Soundcore Space One", 99]
    ]
  },
  {
    category: "Smart Home Devices",
    imageQuery: "smart home device",
    source: "https://www.amazon.com/smart-home/b?node=6563140011",
    items: [
      ["Amazon Echo Dot 5th Gen", 50],
      ["Google Nest Hub 2nd Gen", 100],
      ["Ring Battery Doorbell Plus", 180],
      ["Nest Learning Thermostat", 249],
      ["Philips Hue Starter Kit", 199],
      ["Blink Outdoor 4 Camera", 120],
      ["Apple HomePod Mini", 99],
      ["Kasa Smart Plug 4 Pack", 30],
      ["August Wi-Fi Smart Lock", 229],
      ["Eufy RoboVac 11S", 230]
    ]
  },
  {
    category: "Cars",
    imageQuery: "car",
    source: "https://www.kbb.com/",
    difficulty: "Medium",
    items: [
      ["Toyota Corolla LE", 23200],
      ["Honda Civic Sport", 26300],
      ["Tesla Model 3", 38990],
      ["Ford Mustang GT", 46950],
      ["Toyota GR Supra", 56250],
      ["Jeep Wrangler Rubicon", 47500],
      ["Chevrolet Corvette Stingray", 69995, "Hard"],
      ["BMW M3 Competition", 83595, "Hard"],
      ["Mercedes-Benz G-Class", 148250, "Insane"],
      ["Porsche 911 Carrera", 120100, "Insane"]
    ]
  },
  {
    category: "Motorcycles",
    imageQuery: "motorcycle",
    source: "https://www.cycletrader.com/",
    difficulty: "Medium",
    items: [
      ["Honda Grom", 3599],
      ["Kawasaki Ninja 400", 5299],
      ["Yamaha MT-07", 8199],
      ["Harley-Davidson Iron 883", 11999],
      ["Indian Scout Bobber", 12999],
      ["Ducati Monster Plus", 12995],
      ["BMW R 1250 GS", 17995],
      ["Honda Gold Wing Tour", 28900, "Hard"],
      ["Ducati Panigale V4", 24500, "Hard"],
      ["Harley-Davidson Road Glide", 25999, "Hard"]
    ]
  },
  {
    category: "Boats",
    imageQuery: "boat",
    source: "https://www.boattrader.com/",
    difficulty: "Hard",
    items: [
      ["Sea-Doo Spark 2up", 6999, "Medium"],
      ["Tracker Pro Team 175 TXW", 23995],
      ["Bayliner Element M17", 22499],
      ["Yamaha AR190 Jet Boat", 36999],
      ["Boston Whaler 170 Montauk", 47500],
      ["MasterCraft NXT22", 108000],
      ["Bennington 22 SX Pontoon", 45000],
      ["Jeanneau Merry Fisher 895", 245000, "Insane"],
      ["Grady-White Canyon 336", 425000, "Insane"],
      ["Sea Ray SLX 400", 850000, "Insane"]
    ]
  },
  {
    category: "RVs",
    imageQuery: "recreational vehicle rv",
    source: "https://www.rvtrader.com/",
    difficulty: "Hard",
    items: [
      ["Forest River Cherokee Wolf Pup", 18995, "Medium"],
      ["Jayco Jay Flight SLX", 22995],
      ["Airstream Basecamp 20X", 66900],
      ["Winnebago Micro Minnie", 39900],
      ["Grand Design Reflection 150", 62900],
      ["Thor Motor Coach Four Winds", 115000],
      ["Winnebago Travato", 165000],
      ["Airstream Classic 33FB", 199900],
      ["Tiffin Allegro Bus", 530000, "Insane"],
      ["Prevost Marathon Coach", 2500000, "Insane"]
    ]
  },
  {
    category: "Luxury Vehicles",
    imageQuery: "luxury car",
    source: "https://www.cars.com/",
    difficulty: "Insane",
    items: [
      ["Bentley Bentayga", 203000],
      ["Rolls-Royce Ghost", 354750],
      ["Lamborghini Urus", 241843],
      ["Ferrari Roma", 247310],
      ["Aston Martin DB12", 248086],
      ["McLaren Artura", 238000],
      ["Mercedes-Maybach S 680", 234300],
      ["Range Rover SV", 209000],
      ["Porsche Taycan Turbo S", 209000],
      ["Maserati MC20", 242995]
    ]
  },
  {
    category: "Furniture",
    imageQuery: "furniture",
    source: "https://www.wayfair.com/furniture/",
    items: [
      ["IKEA Billy Bookcase", 89],
      ["Wayfair Sectional Sofa", 899],
      ["Eames Lounge Chair", 5895, "Hard"],
      ["Herman Miller Aeron Chair", 1275, "Medium"],
      ["West Elm Mid-Century Bed", 1299],
      ["Article Sven Sofa", 1499],
      ["La-Z-Boy Recliner", 799],
      ["Pottery Barn Dining Table", 1999, "Medium"],
      ["Crate and Barrel Media Console", 1299],
      ["Restoration Hardware Cloud Sofa", 4395, "Hard"]
    ]
  },
  {
    category: "Appliances",
    imageQuery: "home appliance",
    source: "https://www.lowes.com/c/Appliances",
    difficulty: "Medium",
    items: [
      ["KitchenAid Stand Mixer", 449],
      ["Ninja Creami Deluxe", 249],
      ["Instant Pot Duo 6 Quart", 100],
      ["Samsung French Door Refrigerator", 1899],
      ["LG Front Load Washer", 899],
      ["Bosch 300 Series Dishwasher", 1099],
      ["Dyson Airwrap", 599],
      ["Breville Barista Express", 699],
      ["GE Electric Range", 749],
      ["Miele Complete C3 Vacuum", 1159]
    ]
  },
  {
    category: "Home Décor",
    imageQuery: "home decor",
    source: "https://www.wayfair.com/decor-pillows/",
    items: [
      ["Ruggable 8x10 Washable Rug", 399],
      ["West Elm Table Lamp", 179],
      ["Target Decorative Throw Pillow", 25],
      ["CB2 Wall Mirror", 349],
      ["Yankee Candle Large Jar", 31],
      ["IKEA Artificial Potted Plant", 50],
      ["Pottery Barn Curtain Panels", 129],
      ["Anthropologie Vase", 88],
      ["Framebridge Gallery Frame", 95],
      ["Lulu and Georgia Floor Lamp", 598]
    ]
  },
  {
    category: "Mattresses",
    imageQuery: "mattress bedroom",
    source: "https://www.mattressfirm.com/",
    difficulty: "Medium",
    items: [
      ["Casper Original Queen Mattress", 1295],
      ["Purple RestorePlus Queen Mattress", 2395],
      ["Tempur-Pedic ProAdapt Queen", 3399, "Hard"],
      ["Saatva Classic Queen Mattress", 2095],
      ["Nectar Memory Foam Queen", 1099],
      ["Tuft and Needle Original Queen", 995],
      ["Helix Midnight Luxe Queen", 2373],
      ["Sleep Number i8 Queen", 3699, "Hard"],
      ["Sealy Posturepedic Queen", 999],
      ["Avocado Green Queen Mattress", 1999]
    ]
  },
  {
    category: "Kitchen Gadgets",
    imageQuery: "kitchen gadget",
    source: "https://www.williams-sonoma.com/",
    items: [
      ["OXO Good Grips Salad Spinner", 30],
      ["ThermoPro Instant Read Thermometer", 16],
      ["Microplane Premium Zester", 18],
      ["Vitamix 5200 Blender", 480, "Medium"],
      ["Le Creuset Dutch Oven 5.5 Quart", 420, "Medium"],
      ["All-Clad Stainless Fry Pan", 130],
      ["KitchenAid Food Processor", 120],
      ["Cuisinart Ice Cream Maker", 70],
      ["Ooni Koda 16 Pizza Oven", 599, "Medium"],
      ["Zwilling Knife Block Set", 350]
    ]
  },
  {
    category: "Sneakers",
    imageQuery: "sneakers",
    source: "https://stockx.com/sneakers",
    difficulty: "Medium",
    items: [
      ["Nike Air Force 1 Low White", 115],
      ["Adidas Samba OG", 100],
      ["New Balance 550 White Green", 110],
      ["Air Jordan 1 Retro High Chicago", 850, "Hard"],
      ["Nike Dunk Low Panda", 115],
      ["Yeezy Boost 350 V2 Zebra", 290],
      ["Nike Kobe 6 Protro Grinch", 600, "Hard"],
      ["Travis Scott Jordan 1 Low Reverse Mocha", 1300, "Insane"],
      ["Converse Chuck 70 High", 90],
      ["ASICS Gel-Kayano 14", 150]
    ]
  },
  {
    category: "Designer Handbags",
    imageQuery: "designer handbag",
    source: "https://www.fashionphile.com/",
    difficulty: "Hard",
    items: [
      ["Louis Vuitton Neverfull MM", 2030],
      ["Gucci Marmont Small Shoulder Bag", 2550],
      ["Chanel Classic Flap Medium", 10800, "Insane"],
      ["Hermes Birkin 30", 22000, "Insane"],
      ["Prada Re-Edition 2005 Bag", 1950],
      ["Dior Saddle Bag", 4200],
      ["Saint Laurent Lou Camera Bag", 1690],
      ["Bottega Veneta Jodie Mini", 2650],
      ["Celine Triomphe Shoulder Bag", 3950],
      ["Goyard Saint Louis PM Tote", 1620]
    ]
  },
  {
    category: "Watches",
    imageQuery: "luxury watch",
    source: "https://watchcharts.com/",
    difficulty: "Hard",
    items: [
      ["Apple Watch Series 9", 399, "Easy"],
      ["Seiko 5 Sports Watch", 295, "Medium"],
      ["Tissot PRX Powermatic 80", 725],
      ["Hamilton Khaki Field Mechanical", 595],
      ["Omega Speedmaster Moonwatch", 7100],
      ["Rolex Submariner Date", 10250],
      ["Cartier Santos Medium", 7050],
      ["Tudor Black Bay 58", 4000],
      ["Patek Philippe Nautilus 5711", 95000, "Insane"],
      ["Audemars Piguet Royal Oak", 54000, "Insane"]
    ]
  },
  {
    category: "Sunglasses",
    imageQuery: "sunglasses",
    source: "https://www.sunglasshut.com/",
    items: [
      ["Ray-Ban Wayfarer Classic", 171],
      ["Oakley Holbrook", 174],
      ["Maui Jim Peahi", 279],
      ["Persol 714 Steve McQueen", 594, "Medium"],
      ["Prada Symbole Sunglasses", 545],
      ["Gucci Aviator Sunglasses", 505],
      ["Costa Del Mar Fantail", 200],
      ["Tom Ford Snowdon", 470],
      ["Warby Parker Haskell", 95],
      ["Cartier Santos Sunglasses", 1300, "Hard"]
    ]
  },
  {
    category: "Clothing",
    imageQuery: "clothing fashion",
    source: "https://www.nordstrom.com/",
    items: [
      ["Levi's 501 Original Jeans", 80],
      ["Nike Tech Fleece Hoodie", 130],
      ["Patagonia Better Sweater Jacket", 159],
      ["Lululemon Align Leggings", 98],
      ["Ralph Lauren Polo Shirt", 110],
      ["Canada Goose Chilliwack Bomber", 1495, "Hard"],
      ["The North Face Nuptse Jacket", 330],
      ["Supreme Box Logo Hoodie", 650, "Hard"],
      ["Uniqlo Heattech Crew Neck", 25],
      ["Arc'teryx Beta Jacket", 400]
    ]
  },
  {
    category: "Restaurant Meals",
    imageQuery: "restaurant meal",
    source: "https://www.opentable.com/",
    items: [
      ["Olive Garden Tour of Italy", 22],
      ["Cheesecake Factory Chicken Madeira", 26],
      ["Texas Roadhouse 12 oz Ribeye", 27],
      ["Shake Shack ShackBurger Meal", 15],
      ["Panera You Pick Two Meal", 14],
      ["Outback Bloomin' Onion", 11],
      ["Red Lobster Ultimate Feast", 40],
      ["PF Chang's Mongolian Beef", 23],
      ["Buffalo Wild Wings 10 Boneless Wings", 14],
      ["Local Steakhouse Dinner for Two", 120, "Medium"]
    ]
  },
  {
    category: "Specialty Coffee",
    imageQuery: "specialty coffee",
    source: "https://www.starbucks.com/menu",
    items: [
      ["Starbucks Grande Caramel Macchiato", 6],
      ["Dunkin Large Iced Coffee", 4],
      ["Blue Bottle New Orleans Iced Coffee", 6],
      ["Dutch Bros Golden Eagle", 6],
      ["La Colombe Draft Latte 4 Pack", 12],
      ["Nespresso Vertuo Capsules 10 Pack", 13],
      ["Stumptown Holler Mountain Beans", 16],
      ["Counter Culture Coffee 12 oz", 18],
      ["Chemex Pour-Over Brewer", 48],
      ["Breville Bambino Espresso Machine", 300, "Medium"]
    ]
  },
  {
    category: "Snacks",
    imageQuery: "snacks",
    source: "https://www.walmart.com/cp/snacks-cookies-chips/976787",
    items: [
      ["Doritos Nacho Cheese Party Size", 6],
      ["Takis Fuego 9.9 oz", 4],
      ["Oreos Family Size", 5],
      ["Cheetos Crunchy Party Size", 6],
      ["Reese's Peanut Butter Cups 18 Pack", 12],
      ["Pringles Original Can", 3],
      ["Sour Patch Kids Theater Box", 2],
      ["Cheez-It Extra Toasty Family Size", 6],
      ["Pop-Tarts Frosted Strawberry 12 Count", 5],
      ["Beef Jerky 10 oz Bag", 15]
    ]
  },
  {
    category: "Alcoholic Beverages",
    imageQuery: "wine beer bottle",
    source: "https://www.totalwine.com/",
    difficulty: "Medium",
    items: [
      ["Bud Light 24 Pack", 24],
      ["White Claw Variety 12 Pack", 18],
      ["Josh Cellars Cabernet Sauvignon", 17],
      ["Veuve Clicquot Brut Champagne", 65],
      ["Tito's Handmade Vodka 750 ml", 21],
      ["Casamigos Blanco Tequila", 50],
      ["Jameson Irish Whiskey 750 ml", 31],
      ["Hennessy VS Cognac", 43],
      ["Macallan 12 Year Scotch", 90, "Hard"],
      ["Dom Perignon Vintage Champagne", 270, "Hard"]
    ]
  },
  {
    category: "Desserts",
    imageQuery: "dessert",
    source: "https://www.goldbelly.com/",
    items: [
      ["Crumbl Cookies 6 Pack", 25],
      ["Nothing Bundt Cakes 8 inch Cake", 35],
      ["Cheesecake Factory Whole Cheesecake", 65],
      ["Milk Bar Birthday Cake", 62],
      ["Levain Bakery Cookies 8 Pack", 49],
      ["Krispy Kreme Original Glazed Dozen", 16],
      ["Insomnia Cookies 12 Pack", 30],
      ["Magnolia Bakery Banana Pudding", 45],
      ["Jeni's Ice Cream 5 Pint Collection", 68],
      ["Local Wedding Cake", 500, "Hard"]
    ]
  },
  {
    category: "Sports Equipment",
    imageQuery: "sports equipment",
    source: "https://www.dickssportinggoods.com/",
    items: [
      ["Wilson Evolution Basketball", 80],
      ["Nike Premier League Soccer Ball", 165, "Medium"],
      ["Rawlings Heart of the Hide Glove", 300],
      ["Wilson Pro Staff Tennis Racket", 279],
      ["Easton Ghost Advanced Softball Bat", 500, "Hard"],
      ["YETI Roadie 24 Cooler", 250],
      ["Bowflex SelectTech Dumbbells Pair", 429],
      ["Spalding Portable Basketball Hoop", 400],
      ["Garmin Forerunner 965", 600],
      ["Goalrilla In-Ground Basketball Hoop", 1900, "Hard"]
    ]
  },
  {
    category: "Golf Clubs",
    imageQuery: "golf clubs",
    source: "https://www.pgatoursuperstore.com/",
    difficulty: "Medium",
    items: [
      ["Titleist Pro V1 Golf Balls 12 Pack", 55],
      ["TaylorMade Qi10 Driver", 600],
      ["Callaway Paradym Ai Smoke Irons Set", 1000],
      ["Scotty Cameron Phantom Putter", 449],
      ["Ping G430 Driver", 600],
      ["Vokey SM10 Wedge", 189],
      ["Odyssey Ai-One Putter", 300],
      ["Garmin Approach R10 Launch Monitor", 600],
      ["PXG 0317 Irons Set", 1699, "Hard"],
      ["Titleist Players 5 Golf Bag", 265]
    ]
  },
  {
    category: "Baseball Bats",
    imageQuery: "baseball bat",
    source: "https://www.justbats.com/",
    items: [
      ["Louisville Slugger Select PWR BBCOR Bat", 399],
      ["Marucci CATX BBCOR Bat", 380],
      ["DeMarini The Goods BBCOR Bat", 400],
      ["Easton Hype Fire USSSA Bat", 350],
      ["Rawlings Icon BBCOR Bat", 500, "Hard"],
      ["Victus Nox BBCOR Bat", 400],
      ["Axe Avenge Pro Bat", 350],
      ["Mizuno B23 Hot Metal Bat", 300],
      ["Warstic Bonesaber Hybrid Bat", 380],
      ["Baum Bat Gold Stock Pro", 280]
    ]
  },
  {
    category: "Bicycles",
    imageQuery: "bicycle",
    source: "https://www.specialized.com/",
    difficulty: "Medium",
    items: [
      ["Schwinn Discover Hybrid Bike", 350],
      ["Trek Marlin 5 Gen 3", 740],
      ["Specialized Sirrus X 3.0", 950],
      ["Cannondale Quick 3", 900],
      ["Rad Power RadRunner 2 E-Bike", 1499],
      ["Aventon Level.2 E-Bike", 1899],
      ["Trek Domane AL 5", 1999],
      ["Santa Cruz Hightower Mountain Bike", 5499, "Hard"],
      ["Specialized S-Works Tarmac SL8", 14000, "Insane"],
      ["Cervelo S5 Force AXS", 9000, "Hard"]
    ]
  },
  {
    category: "Gym Equipment",
    imageQuery: "gym equipment",
    source: "https://www.roguefitness.com/",
    items: [
      ["Peloton Bike Plus", 2495, "Hard"],
      ["NordicTrack Commercial 1750 Treadmill", 2499, "Hard"],
      ["Rogue Ohio Bar", 295],
      ["Bowflex Adjustable Dumbbells", 429],
      ["Concept2 RowErg", 990],
      ["REP Fitness Power Rack", 899],
      ["TRX Suspension Trainer", 230],
      ["Hydrow Wave Rower", 1695],
      ["Tonel Smart Home Gym", 3995, "Insane"],
      ["Manduka PRO Yoga Mat", 138]
    ]
  },
  {
    category: "Pokémon Cards",
    imageQuery: "pokemon trading card",
    source: "https://www.pricecharting.com/category/pokemon-cards",
    difficulty: "Insane",
    items: [
      ["Pokemon Base Set Charizard Card", 4200],
      ["Pokemon Base Set Blastoise Card", 1200],
      ["Pokemon Base Set Venusaur Card", 800],
      ["Pokemon Moonbreon Umbreon VMAX Alt Art", 900],
      ["Pokemon Lugia V Alt Art", 180],
      ["Pokemon Pikachu Illustrator Card", 5000000],
      ["Pokemon Shining Charizard Neo Destiny", 1100],
      ["Pokemon Mewtwo Base Set Holo", 75, "Hard"],
      ["Pokemon Rayquaza Gold Star", 3500],
      ["Pokemon Booster Box Base Set Unlimited", 15000]
    ]
  },
  {
    category: "Video Games",
    imageQuery: "video game case",
    source: "https://www.pricecharting.com/category/video-games",
    items: [
      ["Marvel's Spider-Man 2 PS5", 69],
      ["God of War Ragnarok PS5", 69],
      ["Helldivers 2 PS5", 39],
      ["Starfield Xbox Series X", 69],
      ["Forza Motorsport Xbox Series X", 69],
      ["Halo Infinite Xbox", 59],
      ["The Legend of Zelda Tears of the Kingdom", 69],
      ["Super Mario Bros Wonder", 59],
      ["Elden Ring", 59],
      ["Call of Duty Modern Warfare III", 69]
    ]
  },
  {
    category: "Funko Pops",
    imageQuery: "funko pop figure",
    source: "https://www.hobbydb.com/",
    difficulty: "Medium",
    items: [
      ["Funko Pop Darth Vader", 12],
      ["Funko Pop Spider-Man", 13],
      ["Funko Pop Michael Jordan", 15],
      ["Funko Pop Batman 01", 20],
      ["Funko Pop Freddy Funko as Venom", 550, "Hard"],
      ["Funko Pop Metallic Genie", 400, "Hard"],
      ["Funko Pop Tony Stark SDCC", 1200, "Insane"],
      ["Funko Pop Naruto Kurama Mode", 35],
      ["Funko Pop Pikachu", 14],
      ["Funko Pop The Mandalorian", 12]
    ]
  },
  {
    category: "LEGO Sets",
    imageQuery: "lego set",
    source: "https://www.lego.com/en-us",
    difficulty: "Medium",
    items: [
      ["LEGO Titanic 10294", 679],
      ["LEGO Millennium Falcon 75192", 849],
      ["LEGO Eiffel Tower 10307", 629],
      ["LEGO Colosseum 10276", 549],
      ["LEGO Daily Bugle 76178", 349],
      ["LEGO Disney Castle 43222", 399],
      ["LEGO Technic Lamborghini Sian", 449],
      ["LEGO Rivendell 10316", 499],
      ["LEGO Starry Night 21333", 169],
      ["LEGO UCS AT-AT 75313", 849]
    ]
  },
  {
    category: "Trading Cards",
    imageQuery: "sports trading cards",
    source: "https://www.pricecharting.com/",
    difficulty: "Hard",
    items: [
      ["1986 Fleer Michael Jordan Rookie Card", 6500],
      ["Topps Shohei Ohtani Rookie Card", 85],
      ["Panini Prizm Luka Doncic Rookie Card", 450],
      ["Topps Chrome Victor Wembanyama Rookie", 120],
      ["1952 Topps Mickey Mantle Card", 12000000, "Insane"],
      ["Tom Brady Bowman Chrome Rookie Card", 1500],
      ["Charizard Base Set Pokemon Card", 4200],
      ["Magic Black Lotus Card", 250000, "Insane"],
      ["One Piece Manga Shanks Card", 900],
      ["Yu-Gi-Oh Blue-Eyes White Dragon DDS", 3000]
    ]
  },
  {
    category: "Airline Tickets",
    imageQuery: "airplane ticket travel",
    source: "https://www.google.com/travel/flights",
    difficulty: "Medium",
    items: [
      ["NYC to Miami Round Trip Economy", 180],
      ["Los Angeles to Tokyo Round Trip Economy", 950],
      ["Chicago to Paris Round Trip Economy", 780],
      ["Atlanta to Orlando Round Trip Economy", 120],
      ["Seattle to Honolulu Round Trip Economy", 520],
      ["NYC to London Round Trip Business Class", 3500, "Hard"],
      ["Los Angeles to Sydney Round Trip Economy", 1100],
      ["Dallas to Cancun Round Trip Economy", 280],
      ["Boston to Rome Round Trip Economy", 840],
      ["San Francisco to Dubai Business Class", 5200, "Insane"]
    ]
  },
  {
    category: "Hotel Rooms",
    imageQuery: "hotel room",
    source: "https://www.booking.com/",
    difficulty: "Medium",
    items: [
      ["Holiday Inn Express One Night", 145],
      ["Hampton Inn One Night", 159],
      ["Disney World Resort One Night", 450],
      ["Las Vegas Strip Hotel One Night", 220],
      ["NYC Midtown Hotel One Night", 350],
      ["Ritz-Carlton One Night", 850, "Hard"],
      ["Four Seasons Maui One Night", 1400, "Insane"],
      ["Motel 6 One Night", 75],
      ["Paris Boutique Hotel One Night", 260],
      ["Bora Bora Overwater Bungalow One Night", 1800, "Insane"]
    ]
  },
  {
    category: "Cruises",
    imageQuery: "cruise ship",
    source: "https://www.cruisecritic.com/",
    difficulty: "Hard",
    items: [
      ["3-Night Bahamas Cruise Interior Cabin", 299, "Medium"],
      ["7-Night Caribbean Cruise Balcony Cabin", 1099],
      ["Alaska Cruise Oceanview Cabin", 1499],
      ["Mediterranean Cruise Balcony Cabin", 1899],
      ["Disney Cruise 4-Night Family Cabin", 3200],
      ["Virgin Voyages Caribbean Cruise", 1600],
      ["Royal Caribbean Icon of the Seas Suite", 5200],
      ["Norwegian Haven Suite", 6500],
      ["Antarctica Expedition Cruise", 15000, "Insane"],
      ["World Cruise Segment", 28000, "Insane"]
    ]
  },
  {
    category: "Vacation Packages",
    imageQuery: "vacation resort",
    source: "https://www.expedia.com/",
    difficulty: "Hard",
    items: [
      ["Orlando Family Vacation Package", 1800],
      ["Cancun All-Inclusive 5 Nights", 2400],
      ["Hawaii 7-Night Vacation Package", 5200],
      ["Paris Flight and Hotel Package", 3200],
      ["Las Vegas Weekend Package", 900],
      ["Disney World Family Package", 6500],
      ["Bora Bora Honeymoon Package", 12000, "Insane"],
      ["Japan Two-Week Vacation Package", 8000],
      ["Iceland Northern Lights Package", 4300],
      ["African Safari Package", 9500, "Insane"]
    ]
  },
  {
    category: "Theme Park Tickets",
    imageQuery: "theme park",
    source: "https://www.undercovertourist.com/",
    items: [
      ["Disney World 1-Day Park Ticket", 159],
      ["Universal Orlando 1-Day Ticket", 119],
      ["Disneyland 1-Day Ticket", 169],
      ["Six Flags 1-Day Ticket", 55],
      ["SeaWorld Orlando Ticket", 99],
      ["Cedar Point Ticket", 50],
      ["Dollywood 1-Day Ticket", 92],
      ["Busch Gardens Ticket", 110],
      ["Knott's Berry Farm Ticket", 75],
      ["Disney World Annual Pass", 1549, "Hard"]
    ]
  },
  {
    category: "Diamonds",
    imageQuery: "diamond ring",
    source: "https://www.bluenile.com/",
    difficulty: "Hard",
    items: [
      ["1 Carat Round Diamond Ring", 5500],
      ["2 Carat Round Diamond Ring", 18000],
      ["Lab Grown 1 Carat Diamond Ring", 1200],
      ["Tiffany Solitaire Engagement Ring", 16000],
      ["Cartier Love Wedding Band", 1450],
      ["Van Cleef Diamond Bracelet", 15500],
      ["Diamond Tennis Bracelet 5 ct", 6500],
      ["Harry Winston Diamond Earrings", 28000, "Insane"],
      ["3 Carat Oval Diamond Ring", 42000, "Insane"],
      ["Pink Diamond Ring", 250000, "Insane"]
    ]
  },
  {
    category: "Yachts",
    imageQuery: "yacht",
    source: "https://www.yachtworld.com/",
    difficulty: "Insane",
    items: [
      ["Used 30 ft Center Console Yacht", 150000],
      ["Sea Ray Sundancer 320", 425000],
      ["Azimut 53 Flybridge", 1600000],
      ["Princess V50 Yacht", 1400000],
      ["Sunseeker Predator 65", 2800000],
      ["Pershing 8X Yacht", 6500000],
      ["Benetti 100 ft Superyacht", 12000000],
      ["Feadship Custom Superyacht", 75000000],
      ["Lurssen 250 ft Superyacht", 150000000],
      ["Annual Superyacht Crew Cost", 1500000]
    ]
  },
  {
    category: "Supercars",
    imageQuery: "supercar",
    source: "https://www.dupontregistry.com/",
    difficulty: "Insane",
    items: [
      ["Lamborghini Huracan Tecnica", 249865],
      ["Ferrari 296 GTB", 342205],
      ["McLaren 750S", 324000],
      ["Porsche 911 GT3 RS", 241300],
      ["Aston Martin Valkyrie", 3500000],
      ["Bugatti Chiron", 3200000],
      ["Koenigsegg Jesko", 3000000],
      ["Pagani Huayra", 3400000],
      ["Rimac Nevera", 2200000],
      ["Ferrari LaFerrari", 4500000]
    ]
  },
  {
    category: "Luxury Watches",
    imageQuery: "luxury watch rolex",
    source: "https://www.chrono24.com/",
    difficulty: "Insane",
    items: [
      ["Rolex Daytona Panda", 32000],
      ["Rolex GMT-Master II Pepsi", 21000],
      ["Patek Philippe Nautilus 5711", 95000],
      ["Audemars Piguet Royal Oak Jumbo", 85000],
      ["Richard Mille RM 011", 190000],
      ["Vacheron Constantin Overseas", 28000],
      ["Omega Snoopy Speedmaster", 22000],
      ["Cartier Crash Watch", 185000],
      ["Patek Philippe Aquanaut", 72000],
      ["Rolex Rainbow Daytona", 500000]
    ]
  },
  {
    category: "Rare Collectibles",
    imageQuery: "rare collectible",
    source: "https://www.ha.com/",
    difficulty: "Insane",
    items: [
      ["Sealed Super Mario Bros NES", 2000000],
      ["First Edition Harry Potter Book", 55000],
      ["Action Comics No. 1", 3200000],
      ["Original Star Wars Figure Set", 25000],
      ["Beanie Baby Princess Diana Bear", 500],
      ["Vintage Rolex Paul Newman Daytona", 500000],
      ["Michael Jordan Game-Worn Jersey", 1000000],
      ["Pokemon First Edition Booster Box", 400000],
      ["Apple-1 Computer", 500000],
      ["Honus Wagner Baseball Card", 7250000]
    ]
  },
  {
    category: "Private Jets",
    imageQuery: "private jet",
    source: "https://www.controller.com/",
    difficulty: "Insane",
    items: [
      ["Cessna Citation CJ3", 8000000],
      ["Embraer Phenom 300E", 11000000],
      ["Pilatus PC-24", 12000000],
      ["Bombardier Challenger 350", 27000000],
      ["Gulfstream G280", 25000000],
      ["Dassault Falcon 8X", 58000000],
      ["Gulfstream G650ER", 70000000],
      ["Bombardier Global 7500", 78000000],
      ["HondaJet Elite II", 7000000],
      ["Private Jet Charter NYC to Miami", 18000]
    ]
  },
  {
    category: "Mansions",
    imageQuery: "mansion house",
    source: "https://www.zillow.com/",
    difficulty: "Insane",
    items: [
      ["Miami Waterfront Mansion", 12000000],
      ["Beverly Hills Modern Mansion", 35000000],
      ["Hamptons Estate", 22000000],
      ["Aspen Ski Mansion", 45000000],
      ["Malibu Beach House", 28000000],
      ["Texas Hill Country Mansion", 8500000],
      ["Palm Beach Estate", 55000000],
      ["Manhattan Penthouse", 38000000],
      ["Lake Tahoe Estate", 18000000],
      ["Mega Mansion The One Los Angeles", 141000000]
    ]
  },
  {
    category: "Famous Paintings",
    imageQuery: "famous painting museum",
    source: "https://www.sothebys.com/",
    difficulty: "Insane",
    items: [
      ["Picasso Painting Auction Price", 179000000],
      ["Basquiat Untitled Auction Price", 110500000],
      ["Warhol Marilyn Painting", 195000000],
      ["Van Gogh Irises Estimated Value", 110000000],
      ["Monet Water Lilies Auction Price", 84600000],
      ["Da Vinci Salvator Mundi", 450300000],
      ["Banksy Shredded Painting", 25400000],
      ["Kaws Painting Auction Price", 14700000],
      ["Hockney Portrait Auction Price", 90300000],
      ["Rothko Color Field Painting", 86500000]
    ]
  },
  {
    category: "Race Horses",
    imageQuery: "race horse",
    source: "https://www.keeneland.com/",
    difficulty: "Insane",
    items: [
      ["Yearling Race Horse", 150000],
      ["Kentucky Derby Prospect Horse", 1000000],
      ["Thoroughbred Stud Fee", 250000],
      ["Fusaichi Pegasus Sale Price", 70000000],
      ["American Pharoah Stud Fee", 100000],
      ["Race Horse Monthly Training Cost", 4500],
      ["Breeders' Cup Winner Value", 15000000],
      ["Two-Year-Old In Training Horse", 550000],
      ["Retired Champion Broodmare", 5000000],
      ["Share in Elite Race Horse", 25000]
    ]
  },
  {
    category: "Space Tourism Tickets",
    imageQuery: "space tourism rocket",
    source: "https://www.virgingalactic.com/",
    difficulty: "Insane",
    items: [
      ["Virgin Galactic Spaceflight Ticket", 450000],
      ["Blue Origin New Shepard Seat", 1250000],
      ["Space Perspective Balloon Seat", 125000],
      ["Zero-G Weightless Flight", 8200],
      ["Axiom Space ISS Mission Seat", 55000000],
      ["Private Spacewalk Add-On", 15000000],
      ["Lunar Flyby Reservation", 100000000],
      ["Space Camp Adult Program", 1299],
      ["Suborbital Training Package", 50000],
      ["Mars Simulation Habitat Stay", 6000]
    ]
  },
  {
    category: "Weird Amazon Products",
    imageQuery: "weird product",
    source: "https://www.amazon.com/",
    items: [
      ["Banana Slicer Kitchen Tool", 6],
      ["Yodeling Pickle Toy", 13],
      ["Nicolas Cage Sequin Pillow", 18],
      ["Desktop Boxing Mini Set", 12],
      ["Burrito Blanket", 25],
      ["Tiny Hands Finger Puppets", 8],
      ["Inflatable Tube Guy", 20],
      ["Emergency Underpants Tin", 10],
      ["Cat Butt Tissue Holder", 35],
      ["Useless Box Switch Toy", 28]
    ]
  },
  {
    category: "Celebrity Purchases",
    imageQuery: "celebrity luxury purchase",
    source: "https://www.architecturaldigest.com/",
    difficulty: "Insane",
    items: [
      ["Celebrity Diamond Grill", 50000],
      ["Rapper's Custom Chain", 250000],
      ["Celebrity Private Island Vacation", 500000],
      ["Famous Athlete Sneaker Collection", 1000000],
      ["Influencer Birkin Bag", 22000],
      ["Celebrity Super Bowl Suite", 2500000],
      ["Pop Star Tour Bus", 1500000],
      ["A-List Red Carpet Dress", 15000],
      ["Celebrity Mansion Purchase", 30000000],
      ["Luxury Dog House for Celebrity Pet", 325000]
    ]
  },
  {
    category: "Shark Tank Products",
    imageQuery: "shark tank product",
    source: "https://abc.com/shows/shark-tank",
    items: [
      ["Scrub Daddy Sponge Pack", 10],
      ["Bombas Socks 4 Pack", 54],
      ["Squatty Potty", 25],
      ["The Comfy Original", 45],
      ["Tipsy Elves Sweater", 70],
      ["Ring Video Doorbell", 100],
      ["Simply Fit Board", 40],
      ["Kodiak Cakes Mix 3 Pack", 18],
      ["Sleep Styler Hair Rollers", 30],
      ["Lollacup Toddler Cup", 18]
    ]
  },
  {
    category: "World's Largest Items",
    imageQuery: "world largest object",
    source: "https://www.guinnessworldrecords.com/",
    difficulty: "Hard",
    items: [
      ["World's Largest Pizza Event Cost", 75000],
      ["Giant Adirondack Chair Build", 12000],
      ["World's Largest Rubber Duck Rental", 20000],
      ["Giant Pumpkin Prize Winner", 30000],
      ["Oversized Shopping Cart Build", 18000],
      ["World's Largest Bounce House Rental", 35000],
      ["Giant Chocolate Bar Production", 60000],
      ["Largest LEGO Set Retail Price", 849, "Medium"],
      ["Giant Sneaker Display Build", 25000],
      ["Record-Size Firework Shell", 150000]
    ]
  },
  {
    category: "Viral TikTok Products",
    imageQuery: "viral tiktok product",
    source: "https://www.tiktok.com/",
    items: [
      ["Stanley Quencher 40 oz Tumbler", 45],
      ["Ninja Creami Ice Cream Maker", 249],
      ["Sol de Janeiro Bum Bum Cream", 48],
      ["Laneige Lip Sleeping Mask", 24],
      ["Ugg Tasman Slippers", 110],
      ["Sunset Projection Lamp", 20],
      ["Revlon One-Step Hair Dryer", 60],
      ["The Pink Stuff Cleaning Paste", 6],
      ["Mini Waffle Maker", 13],
      ["Skims Fits Everybody Bodysuit", 58]
    ]
  },
  {
    category: "Houses",
    imageQuery: "house real estate",
    source: "https://www.realtor.com/",
    difficulty: "Hard",
    items: [
      ["Starter Home in Ohio", 225000],
      ["Suburban Florida House", 425000],
      ["Austin Texas Family Home", 585000],
      ["Denver Townhouse", 650000],
      ["Seattle Craftsman Home", 950000],
      ["Brooklyn Brownstone", 3200000],
      ["Los Angeles Hills Home", 4500000],
      ["Miami Waterfront Home", 7800000],
      ["Aspen Ski Chalet", 18000000],
      ["Palm Beach Oceanfront Estate", 55000000]
    ]
  },
  {
    category: "Travel Destinations",
    imageQuery: "travel destination",
    source: "https://www.expedia.com/",
    difficulty: "Medium",
    items: [
      ["Weekend Trip to New York", 1200],
      ["Las Vegas Weekend for Two", 950],
      ["Cancun All-Inclusive Trip", 2400],
      ["Hawaii Family Vacation", 6200],
      ["Paris Vacation for Two", 4200],
      ["Tokyo Two-Week Trip", 7600],
      ["Iceland Road Trip", 3900],
      ["Bali Honeymoon", 5200],
      ["African Safari", 9500, "Hard"],
      ["Antarctica Expedition", 15000, "Insane"]
    ]
  },
  {
    category: "Random Amazon Finds",
    imageQuery: "amazon product box",
    source: "https://www.amazon.com/",
    items: [
      ["Magnetic Phone Mount", 15],
      ["Sunrise Alarm Clock", 40],
      ["Mini Projector", 90],
      ["Portable Carpet Cleaner", 124],
      ["Reusable Water Balloons", 20],
      ["Car Vacuum Cleaner", 35],
      ["LED Strip Lights 65 ft", 18],
      ["Electric Spin Scrubber", 45],
      ["Standing Desk Converter", 130],
      ["Portable Power Station", 299, "Medium"]
    ]
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categoryPhotoIds: Record<string, string> = {
  "Everyday Items": "photo-1584473457409-cef4dd8c9fdc",
  Groceries: "photo-1542838132-92c53300491e",
  "Fast Food": "photo-1568901346375-23c9450c58cd",
  "Household Products": "photo-1585421514284-efb74c2b69ba",
  "School Supplies": "photo-1516321497487-e288fb19713f",
  "Pet Supplies": "photo-1601758124510-52d02ddb7cbd",
  Smartphones: "photo-1511707171634-5f897ff02aa9",
  Laptops: "photo-1516321318423-f06f85e504b3",
  "Gaming Consoles": "photo-1606144042614-b2417e99c4e3",
  Headphones: "photo-1505740420928-5e560c06d30e",
  "Smart Home Devices": "photo-1558002038-1055907df827",
  Cars: "photo-1492144534655-ae79c964c9d7",
  Motorcycles: "photo-1558981806-ec527fa84c39",
  Boats: "photo-1500375592092-40eb2168fd21",
  RVs: "photo-1523983302122-73e869e1f850",
  "Luxury Vehicles": "photo-1503376780353-7e6692767b70",
  Furniture: "photo-1555041469-a586c61ea9bc",
  Appliances: "photo-1556911220-bff31c812dba",
  "Home Décor": "photo-1513519245088-0e12902e5a38",
  Mattresses: "photo-1505693416388-ac5ce068fe85",
  "Kitchen Gadgets": "photo-1556911220-e15b29be8c8f",
  Sneakers: "photo-1542291026-7eec264c27ff",
  "Designer Handbags": "photo-1584917865442-de89df76afd3",
  Watches: "photo-1523275335684-37898b6baf30",
  Sunglasses: "photo-1572635196237-14b3f281503f",
  Clothing: "photo-1445205170230-053b83016050",
  "Restaurant Meals": "photo-1504674900247-0877df9cc836",
  "Specialty Coffee": "photo-1495474472287-4d71bcdd2085",
  Snacks: "photo-1621939514649-280e2ee25f60",
  "Alcoholic Beverages": "photo-1510812431401-41d2bd2722f3",
  Desserts: "photo-1551024506-0bccd828d307",
  "Sports Equipment": "photo-1517649763962-0c623066013b",
  "Golf Clubs": "photo-1535131749006-b7f58c99034b",
  "Baseball Bats": "photo-1562771242-a02d9090c90c",
  Bicycles: "photo-1485965120184-e220f721d03e",
  "Gym Equipment": "photo-1534438327276-14e5300c3a48",
  "Pokémon Cards": "photo-1613771404784-3a5686aa2be3",
  "Video Games": "photo-1550745165-9bc0b252726f",
  "Funko Pops": "photo-1635805737707-575885ab0820",
  "LEGO Sets": "photo-1587654780291-39c9404d746b",
  "Trading Cards": "photo-1606761568499-6d2451b23c66",
  "Airline Tickets": "photo-1436491865332-7a61a109cc05",
  "Hotel Rooms": "photo-1566073771259-6a8506099945",
  Cruises: "photo-1548574505-5e239809ee19",
  "Vacation Packages": "photo-1507525428034-b723cf961d3e",
  "Theme Park Tickets": "photo-1597466599360-3b9775841aec",
  Diamonds: "photo-1515562141207-7a88fb7ce338",
  Yachts: "photo-1567899378494-47b22a2ae96a",
  Supercars: "photo-1503376780353-7e6692767b70",
  "Luxury Watches": "photo-1523170335258-f5ed11844a49",
  "Rare Collectibles": "photo-1524230572899-a752b3835840",
  "Private Jets": "photo-1540962351504-03099e0a754b",
  Mansions: "photo-1600596542815-ffad4c1539a9",
  "Famous Paintings": "photo-1541961017774-22349e4a1262",
  "Race Horses": "photo-1553284965-83fd3e82fa5a",
  "Space Tourism Tickets": "photo-1446776811953-b23d57bd21aa",
  "Weird Amazon Products": "photo-1523474253046-8cd2748b5fd2",
  "Celebrity Purchases": "photo-1515886657613-9f3515b0c78f",
  "Shark Tank Products": "photo-1526947425960-945c6e72858f",
  "World's Largest Items": "photo-1500530855697-b586d89ba3ee",
  "Viral TikTok Products": "photo-1516321318423-f06f85e504b3",
  Houses: "photo-1564013799919-ab600027ffc6",
  "Travel Destinations": "photo-1507525428034-b723cf961d3e",
  "Random Amazon Finds": "photo-1523474253046-8cd2748b5fd2"
};

function imageFor(category: string, title: string, imageQuery: string, index: number) {
  const photoId = categoryPhotoIds[category] ?? "photo-1498050108023-c5249f4df085";
  const signature = Math.abs(`${category}-${title}-${imageQuery}`.split("").reduce((sum, char) => sum + char.charCodeAt(0), index + 1000));
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=800&q=80&ixid=${signature}`;
}

export const categoryDecks = deckSeeds.map((deck) => ({
  category: deck.category,
  items: deck.items.map(([title, price, difficulty], index): GameItem => ({
    id: `${slugify(deck.category)}-${slugify(title)}`,
    image: imageFor(deck.category, title, deck.imageQuery, index),
    title,
    category: deck.category,
    price,
    source: deck.source,
    difficulty: difficulty ?? deck.difficulty ?? "Easy"
  }))
}));

export const fallbackItems: GameItem[] = categoryDecks.flatMap((deck) => deck.items);

export const deckSections = [
  {
    title: "Everyday Items",
    categories: ["Groceries", "Fast Food", "Household Products", "School Supplies", "Pet Supplies"]
  },
  {
    title: "📱 Technology",
    categories: ["Smartphones", "Laptops", "Gaming Consoles", "Headphones", "Smart Home Devices"]
  },
  {
    title: "🚗 Vehicles",
    categories: ["Cars", "Motorcycles", "Boats", "RVs", "Luxury Vehicles"]
  },
  {
    title: "🏠 Home & Living",
    categories: ["Furniture", "Appliances", "Home Décor", "Mattresses", "Kitchen Gadgets"]
  },
  {
    title: "👕 Fashion",
    categories: ["Sneakers", "Designer Handbags", "Watches", "Sunglasses", "Clothing"]
  },
  {
    title: "🍔 Food & Drinks",
    categories: ["Restaurant Meals", "Specialty Coffee", "Snacks", "Alcoholic Beverages", "Desserts"]
  },
  {
    title: "⚾ Sports & Recreation",
    categories: ["Sports Equipment", "Golf Clubs", "Baseball Bats", "Bicycles", "Gym Equipment"]
  },
  {
    title: "🎮 Gaming & Collectibles",
    categories: ["Pokémon Cards", "Video Games", "Funko Pops", "LEGO Sets", "Trading Cards"]
  },
  {
    title: "🏝️ Travel",
    categories: ["Airline Tickets", "Hotel Rooms", "Cruises", "Vacation Packages", "Theme Park Tickets"]
  },
  {
    title: "💎 Luxury",
    categories: ["Diamonds", "Yachts", "Supercars", "Luxury Watches", "Rare Collectibles"]
  },
  {
    title: "🏗️ Crazy Expensive",
    categories: ["Private Jets", "Mansions", "Famous Paintings", "Race Horses", "Space Tourism Tickets"]
  },
  {
    title: "😂 Funny Categories",
    categories: ["Weird Amazon Products", "Celebrity Purchases", "Shark Tank Products", "World's Largest Items", "Viral TikTok Products"]
  },
  {
    title: "🔥 Most Addicting Categories",
    categories: ["Sneakers", "Cars", "Fast Food", "Smartphones", "Celebrity Purchases", "Luxury Watches", "Houses", "Pokémon Cards", "Travel Destinations", "Random Amazon Finds"]
  }
];

export function mergeWithDefaultDecks(items: GameItem[]) {
  const customItems = items.filter((item) => !fallbackItems.some((defaultItem) => defaultItem.id === item.id));
  return [...fallbackItems, ...customItems];
}

function hashString(value: string) {
  return value.split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function seededShuffle(items: GameItem[], seed: string) {
  const shuffled = [...items];
  let state = Math.abs(hashString(seed)) || 1;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function getDailyItems(date = new Date(), items = fallbackItems) {
  const dateKey = date.toISOString().slice(0, 10);
  const monthKey = dateKey.slice(0, 7);
  const dayOfMonth = Number(dateKey.slice(8, 10)) || 1;
  const shuffled = seededShuffle(items, monthKey);
  const start = ((dayOfMonth - 1) * 10) % shuffled.length;
  const daily = [...shuffled.slice(start), ...shuffled.slice(0, start)].slice(0, 10);

  return daily.length === 10 ? daily : seededShuffle(items, dateKey).slice(0, 10);
}

export function getDecks(items = fallbackItems) {
  const groups = items.reduce((map, item) => {
    const next = map.get(item.category) ?? [];
    next.push(item);
    map.set(item.category, next);
    return map;
  }, new Map<string, GameItem[]>());

  return Array.from(groups, ([category, deckItems]) => ({ category, items: deckItems.slice(0, 10) })).sort((a, b) =>
    a.category.localeCompare(b.category)
  );
}

export const categories = categoryDecks.map((deck) => deck.category);
