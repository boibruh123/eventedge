import type { GameItem } from "./types";

export const fallbackItems: GameItem[] = [
  {
    id: "iphone-15-pro-128gb",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Apple_iPhone_15_Pro.jpg",
    title: "Apple iPhone 15 Pro 128GB",
    category: "Electronics",
    price: 999,
    source: "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/",
    difficulty: "Easy"
  },
  {
    id: "nintendo-switch-oled",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Nintendo_Switch_-_OLED.jpg",
    title: "Nintendo Switch OLED Model",
    category: "Electronics",
    price: 349,
    source: "https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set-115461/",
    difficulty: "Easy"
  },
  {
    id: "playstation-5-disc-console",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_5_and_DualSense.jpg",
    title: "PlayStation 5 Disc Console with DualSense",
    category: "Electronics",
    price: 499,
    source: "https://direct.playstation.com/en-us/buy-consoles/playstation5-console-model-group-slim",
    difficulty: "Easy"
  },
  {
    id: "macbook-air-m2-midnight",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/M2_Macbook_Air_Midnight_model_-_1.jpg",
    title: "Apple MacBook Air M2 Midnight",
    category: "Electronics",
    price: 999,
    source: "https://www.apple.com/newsroom/2022/06/apple-unveils-all-new-macbook-air-supercharged-by-the-new-m2-chip/",
    difficulty: "Medium"
  },
  {
    id: "tesla-model-3-2023",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Tesla_Model_3_(2023)_1X7A1678.jpg",
    title: "Tesla Model 3",
    category: "Cars",
    price: 38990,
    source: "https://www.tesla.com/model3",
    difficulty: "Medium"
  },
  {
    id: "bmw-i8-coupe",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/26/BMW_i8_(50635052106).jpg",
    title: "BMW i8 Coupe",
    category: "Cars",
    price: 72000,
    source: "https://www.kbb.com/bmw/i8/",
    difficulty: "Hard"
  },
  {
    id: "rolex-submariner-date-16610",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Rolex-Submariner.jpg",
    title: "Rolex Submariner Date 16610",
    category: "Watches",
    price: 10250,
    source: "https://watchcharts.com/watch_model/734-rolex-submariner-16610/overview",
    difficulty: "Hard"
  },
  {
    id: "omega-speedmaster-professional",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/OMEGA-Speedmaster-Professional-Front.jpg",
    title: "Omega Speedmaster Professional Moonwatch",
    category: "Watches",
    price: 7100,
    source: "https://www.omegawatches.com/en-us/watches/speedmaster/moonwatch-professional/product",
    difficulty: "Hard"
  },
  {
    id: "eames-lounge-chair",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Eames_Lounge_Chair_-_side.jpg",
    title: "Eames Lounge Chair",
    category: "Furniture",
    price: 5895,
    source: "https://store.hermanmiller.com/living-room-furniture-lounge-chairs-ottomans/eames-lounge-chair-and-ottoman/5667.html",
    difficulty: "Medium"
  },
  {
    id: "canon-eos-r5-body",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Canon_EOS_R5.jpg",
    title: "Canon EOS R5 Camera Body",
    category: "Cameras",
    price: 3899,
    source: "https://www.usa.canon.com/shop/p/eos-r5",
    difficulty: "Medium"
  },
  {
    id: "leica-m6-rangefinder",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Leica_M6.jpg",
    title: "Leica M6 Rangefinder Camera",
    category: "Cameras",
    price: 5995,
    source: "https://leicacamerausa.com/leica-m6.html",
    difficulty: "Hard"
  },
  {
    id: "dji-mavic-3-pro",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/DJI_MAVIC_3_PRO.jpg",
    title: "DJI Mavic 3 Pro Drone",
    category: "Electronics",
    price: 2199,
    source: "https://store.dji.com/product/dji-mavic-3-pro",
    difficulty: "Medium"
  }
];

function hashDate(dateKey: string) {
  return dateKey.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

export function getDailyItems(date = new Date(), items = fallbackItems) {
  const dateKey = date.toISOString().slice(0, 10);
  const offset = hashDate(dateKey) % items.length;
  const rotated = [...items.slice(offset), ...items.slice(0, offset)];
  return rotated.slice(0, 10);
}

export const categories = Array.from(new Set(fallbackItems.map((item) => item.category)));
