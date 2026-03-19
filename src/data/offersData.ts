import jollofImg from "@/assets/dishes/jollof.webp";
import mafeImg from "@/assets/dishes/mafe.webp";
import thiebImg from "@/assets/dishes/thieb.webp";
import suyaImg from "@/assets/dishes/suya.webp";
import yassaImg from "@/assets/dishes/yassa.webp";
import allocoImg from "@/assets/dishes/alloco.webp";
import bissapImg from "@/assets/dishes/bissap.webp";
import beignetsImg from "@/assets/dishes/beignets.webp";

export interface PromoOffer {
  id: string;
  nameRu: string;
  nameEn: string;
  descRu: string;
  descEn: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  badge: "hot" | "new" | "limited" | "weekly";
  endsInHours: number; // countdown hours from page load
}

export const promoOfTheDay: PromoOffer = {
  id: "promo-jollof-day",
  nameRu: "Джолоф Специальный",
  nameEn: "Jollof Special",
  descRu: "Наш хит #1 — пряный рис с курицей гриль, перец и томатный соус по рецепту Западной Африки. Сегодня со скидкой -30%!",
  descEn: "Our #1 hit — spicy rice with grilled chicken, pepper and tomato sauce from West Africa. Today with -30% off!",
  oldPrice: 1250,
  newPrice: 890,
  image: jollofImg,
  badge: "hot",
  endsInHours: 2,
};

export const discountedDishes: PromoOffer[] = [
  {
    id: "promo-mafe",
    nameRu: "Мафе Классик",
    nameEn: "Mafé Classic",
    descRu: "Тушёное мясо в арахисовом соусе — нежный вкус Сенегала.",
    descEn: "Meat stew in peanut sauce — tender Senegalese flavor.",
    oldPrice: 750,
    newPrice: 590,
    image: mafeImg,
    badge: "weekly",
    endsInHours: 48,
  },
  {
    id: "promo-thieb",
    nameRu: "Тьебудьен Роял",
    nameEn: "Thiéboudienne Royal",
    descRu: "Рыба, рис и овощи в пряном бульоне — национальное блюдо Сенегала.",
    descEn: "Fish, rice and veggies in spiced broth — Senegal's national dish.",
    oldPrice: 850,
    newPrice: 690,
    image: thiebImg,
    badge: "limited",
    endsInHours: 6,
  },
  {
    id: "promo-suya",
    nameRu: "Суя Брошетт x2",
    nameEn: "Suya Skewers x2",
    descRu: "Две порции пряных куриных шашлычков по цене одной!",
    descEn: "Two portions of spicy chicken skewers for the price of one!",
    oldPrice: 980,
    newPrice: 490,
    image: suyaImg,
    badge: "hot",
    endsInHours: 3,
  },
  {
    id: "promo-yassa",
    nameRu: "Яcca Пуле",
    nameEn: "Yassa Chicken",
    descRu: "Курица в лимонно-луковом соусе — новинка недели со скидкой.",
    descEn: "Chicken in lemon-onion sauce — new this week at a discount.",
    oldPrice: 720,
    newPrice: 550,
    image: yassaImg,
    badge: "new",
    endsInHours: 24,
  },
  {
    id: "promo-alloco",
    nameRu: "Алоко XL",
    nameEn: "Alloco XL",
    descRu: "Двойная порция хрустящих жареных бананов плантейн.",
    descEn: "Double portion of crispy fried plantain.",
    oldPrice: 450,
    newPrice: 290,
    image: allocoImg,
    badge: "limited",
    endsInHours: 5,
  },
  {
    id: "promo-bissap-pack",
    nameRu: "Биссап 3 за 2",
    nameEn: "Bissap 3 for 2",
    descRu: "Три освежающих напитка из гибискуса по цене двух.",
    descEn: "Three refreshing hibiscus drinks for the price of two.",
    oldPrice: 750,
    newPrice: 500,
    image: bissapImg,
    badge: "weekly",
    endsInHours: 72,
  },
  {
    id: "promo-beignets",
    nameRu: "Бенье Фамили",
    nameEn: "Beignets Family",
    descRu: "Большой набор пончиков для всей семьи — 12 штук.",
    descEn: "Big family box of donuts — 12 pieces.",
    oldPrice: 590,
    newPrice: 390,
    image: beignetsImg,
    badge: "new",
    endsInHours: 12,
  },
];
