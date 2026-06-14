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
  },
  {
    id: "ps5-spider-man-2",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/3df214ed8f2c4a490f22b4e765b9d88b2f3f8f33ed5354b2.png",
    title: "Marvel's Spider-Man 2 PS5",
    category: "PlayStation Games",
    price: 69,
    source: "https://store.playstation.com/en-us/concept/10002456",
    difficulty: "Easy"
  },
  {
    id: "ps5-god-of-war-ragnarok",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
    title: "God of War Ragnarok PS5",
    category: "PlayStation Games",
    price: 69,
    source: "https://store.playstation.com/en-us/concept/10001850",
    difficulty: "Easy"
  },
  {
    id: "ps5-helldivers-2",
    image: "https://image.api.playstation.com/vulcan/ap/rnd/202309/0718/4cd046555aeb0e1e0d68f4cb0fda5ad3dd04f41a5f53d9e0.png",
    title: "Helldivers 2 PS5",
    category: "PlayStation Games",
    price: 39,
    source: "https://store.playstation.com/en-us/concept/10000657",
    difficulty: "Medium"
  },
  {
    id: "xbox-starfield",
    image: "https://store-images.s-microsoft.com/image/apps.59745.14449121111680903.4f9f1b57-b2f8-45f6-a863-b90079fd7b9c.64f0fd9b-a403-42b8-89b0-6f5f3f61f3c1",
    title: "Starfield Xbox Series X",
    category: "Xbox Games",
    price: 69,
    source: "https://www.xbox.com/en-US/games/store/starfield/9NCJSXWZTP88",
    difficulty: "Medium"
  },
  {
    id: "xbox-forza-motorsport",
    image: "https://store-images.s-microsoft.com/image/apps.40750.13636858907626688.3f2cdb54-9c5f-4b6a-9cb7-49d2d0a7aa19.44d76f3a-6d0f-49da-9c6a-0c60d5bdf10e",
    title: "Forza Motorsport Xbox Series X",
    category: "Xbox Games",
    price: 69,
    source: "https://www.xbox.com/en-US/games/store/forza-motorsport/9PLKVSWR299F",
    difficulty: "Medium"
  },
  {
    id: "xbox-halo-infinite",
    image: "https://store-images.s-microsoft.com/image/apps.56512.13510798887586219.4782f8e7-3d12-47a0-82d2-1ea2463d94d4.9d6ae4ed-d553-4a69-bf9e-dc96cca2f71b",
    title: "Halo Infinite Xbox",
    category: "Xbox Games",
    price: 59,
    source: "https://www.xbox.com/en-US/games/store/halo-infinite/9PP5G1F0C2B6",
    difficulty: "Easy"
  },
  {
    id: "toyota-supra-mk5",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/2020_Toyota_GR_Supra_%28United_States%29.png",
    title: "Toyota GR Supra",
    category: "Cars",
    price: 56250,
    source: "https://www.toyota.com/grsupra/",
    difficulty: "Medium"
  },
  {
    id: "ford-mustang-gt",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/2024_Ford_Mustang_GT_%2853860759617%29.jpg",
    title: "Ford Mustang GT",
    category: "Cars",
    price: 46950,
    source: "https://www.ford.com/cars/mustang/",
    difficulty: "Medium"
  },
  {
    id: "sony-wh-1000xm5",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Sony_WH-1000XM5.jpg",
    title: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    price: 399,
    source: "https://electronics.sony.com/audio/headphones/headband/p/wh1000xm5-b",
    difficulty: "Easy"
  },
  {
    id: "apple-airpods-max",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Apple_AirPods_Max_Silver.png",
    title: "Apple AirPods Max",
    category: "Audio",
    price: 549,
    source: "https://www.apple.com/airpods-max/",
    difficulty: "Easy"
  },
  {
    id: "lego-titanic",
    image: "https://www.lego.com/cdn/cs/set/assets/blt2819bba7e08bc751/10294.png",
    title: "LEGO Titanic 10294",
    category: "Collectibles",
    price: 679,
    source: "https://www.lego.com/en-us/product/lego-titanic-10294",
    difficulty: "Medium"
  },
  {
    id: "pokemon-charizard-card",
    image: "https://upload.wikimedia.org/wikipedia/en/9/95/Pokemon_Charizard_Base_Set_4.jpg",
    title: "Pokemon Base Set Charizard Card",
    category: "Trading Cards",
    price: 4200,
    source: "https://www.pricecharting.com/game/pokemon-base-set/charizard-4",
    difficulty: "Insane"
  },
  {
    id: "louis-vuitton-neverfull-mm",
    image: "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm-monogram-handbags--M46975_PM2_Front%20view.png",
    title: "Louis Vuitton Neverfull MM",
    category: "Luxury Bags",
    price: 2030,
    source: "https://us.louisvuitton.com/eng-us/products/neverfull-mm-monogram-nvprod5350106v/M46975",
    difficulty: "Hard"
  },
  {
    id: "hermes-birkin-30",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Hermes_Birkin_Bag.jpg",
    title: "Hermes Birkin 30",
    category: "Luxury Bags",
    price: 22000,
    source: "https://www.fashionphile.com/shop/hermes-birkin-30",
    difficulty: "Insane"
  },
  {
    id: "specialized-tarmac-sl8",
    image: "https://assets.specialized.com/i/specialized/94924-00_TARMAC-SL8-SW-DI2-BLKPRL_HERO?$scom-pdp-product-image-xl$",
    title: "Specialized S-Works Tarmac SL8",
    category: "Bikes",
    price: 14000,
    source: "https://www.specialized.com/us/en/s-works-tarmac-sl8-shimano-dura-ace-di2/p/216953",
    difficulty: "Hard"
  },
  {
    id: "peloton-bike-plus",
    image: "https://images.ctfassets.net/6ilvqec50fal/6JzXu37Fl8sEORoUYC0sMu/54cb965c3fbd8804aa0f05f15f154e0a/bike-plus-carousel-1.png",
    title: "Peloton Bike Plus",
    category: "Fitness",
    price: 2495,
    source: "https://www.onepeloton.com/shop/bike-plus",
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
