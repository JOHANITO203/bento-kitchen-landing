import jollofImg from "@/assets/dishes/jollof.png";
import mafeImg from "@/assets/dishes/mafe.png";
import thiebImg from "@/assets/dishes/thieb.png";
import suyaImg from "@/assets/dishes/suya.png";
import allocoImg from "@/assets/dishes/alloco.png";
import bissapImg from "@/assets/dishes/bissap.png";
import beignetsImg from "@/assets/dishes/beignets.png";
import yassaImg from "@/assets/dishes/yassa.png";
import poissonImg from "@/assets/dishes/poisson-grille.png";
import gingembreImg from "@/assets/dishes/gingembre.png";
import fatayaImg from "@/assets/dishes/fataya.png";
import bananaImg from "@/assets/dishes/banana-fritters.png";
import pouletMayoAttiekeImg from "@/assets/dishes/poulet-mayo-attieke.png";
import porcBraiseAttiekeImg from "@/assets/dishes/porc-braise-attieke.png";
import sauceArachidePouletImg from "@/assets/dishes/sauce-arachide-poulet.png";
import comboPouletMayoImg from "@/assets/dishes/combo-poulet-mayo.png";
import comboPorcBraiseImg from "@/assets/dishes/combo-porc-braise.png";

export type CategoryKey = "popular" | "grillades" | "traditionalDishes" | "streetFood" | "drinks" | "desserts" | "combo";

export type Badge = "popular" | "new" | "spicy" | "vegetarian" | "healthy";

export interface Dish {
  id: string;
  nameRu: string;
  nameEn: string;
  descRu: string;
  descEn: string;
  price: number;
  image: string;
  category: CategoryKey;
  badges: Badge[];
  prepTime: number; // minutes
}

export const dishes: Dish[] = [
  {
    id: "jollof-special",
    nameRu: "Джолоф Специальный",
    nameEn: "Jollof Special",
    descRu: "Пряный рис с курицей на огне, перец, томатный соус — хит Западной Африки.",
    descEn: "Spicy rice with grilled chicken, pepper, tomato sauce — West Africa's finest.",
    price: 690,
    image: jollofImg,
    category: "popular",
    badges: ["popular", "spicy"],
    prepTime: 25,
  },
  {
    id: "mafe-classic",
    nameRu: "Мафе Классик",
    nameEn: "Mafé Classic",
    descRu: "Тушёное мясо в арахисовом соусе с овощами и рисом.",
    descEn: "Meat stew in rich peanut sauce with vegetables and rice.",
    price: 750,
    image: mafeImg,
    category: "traditionalDishes",
    badges: ["popular"],
    prepTime: 30,
  },
  {
    id: "thieb-royal",
    nameRu: "Тьебудьен Роял",
    nameEn: "Thiéboudienne Royal",
    descRu: "Сенегальский рис с рыбой, овощами и пряным томатным бульоном.",
    descEn: "Senegalese rice with fish, vegetables, and spiced tomato broth.",
    price: 850,
    image: thiebImg,
    category: "traditionalDishes",
    badges: ["popular", "healthy"],
    prepTime: 35,
  },
  {
    id: "suya-skewers",
    nameRu: "Суя Брошетт",
    nameEn: "Suya Skewers",
    descRu: "Пряные куриные шашлычки с ореховой обсыпкой и соусом.",
    descEn: "Spicy chicken skewers with peanut crust and dipping sauce.",
    price: 490,
    image: suyaImg,
    category: "grillades",
    badges: ["popular", "spicy"],
    prepTime: 15,
  },
  {
    id: "yassa-poulet",
    nameRu: "Яcca Пуле",
    nameEn: "Yassa Chicken",
    descRu: "Курица в лимонно-луковом соусе с рисом — классика Сенегала.",
    descEn: "Chicken in lemon-onion sauce with rice — Senegalese classic.",
    price: 720,
    image: yassaImg,
    category: "traditionalDishes",
    badges: ["new"],
    prepTime: 30,
  },
  {
    id: "poisson-grille",
    nameRu: "Рыба на гриле",
    nameEn: "Grilled Fish",
    descRu: "Целая рыба на гриле с африканскими специями и лимоном.",
    descEn: "Whole grilled fish with African spices and lemon.",
    price: 890,
    image: poissonImg,
    category: "grillades",
    badges: ["healthy"],
    prepTime: 25,
  },
  {
    id: "alloco",
    nameRu: "Алоко",
    nameEn: "Alloco",
    descRu: "Жареные бананы плантейн — хрустящие, сладко-солёные, аддиктивные.",
    descEn: "Fried plantain — crispy, sweet-salty, addictive.",
    price: 290,
    image: allocoImg,
    category: "streetFood",
    badges: ["vegetarian", "popular"],
    prepTime: 10,
  },
  {
    id: "fataya",
    nameRu: "Фатая",
    nameEn: "Fataya",
    descRu: "Жареные пирожки с пряным мясным фаршем — идеальный перекус.",
    descEn: "Fried pastries with spiced meat filling — perfect snack.",
    price: 350,
    image: fatayaImg,
    category: "streetFood",
    badges: ["new", "spicy"],
    prepTime: 12,
  },
  {
    id: "bissap",
    nameRu: "Биссап",
    nameEn: "Bissap",
    descRu: "Освежающий напиток из гибискуса с мятой и сахаром.",
    descEn: "Refreshing hibiscus drink with mint and sugar.",
    price: 250,
    image: bissapImg,
    category: "drinks",
    badges: ["popular", "healthy", "vegetarian"],
    prepTime: 5,
  },
  {
    id: "gingembre",
    nameRu: "Имбирный сок",
    nameEn: "Ginger Juice",
    descRu: "Натуральный имбирный сок с лимоном — заряд энергии.",
    descEn: "Natural ginger juice with lemon — energy boost.",
    price: 220,
    image: gingembreImg,
    category: "drinks",
    badges: ["healthy", "vegetarian"],
    prepTime: 5,
  },
  {
    id: "beignets",
    nameRu: "Бенье",
    nameEn: "Beignets",
    descRu: "Пышные пончики с сахарной пудрой — африканская классика.",
    descEn: "Fluffy donuts with powdered sugar — African classic.",
    price: 280,
    image: beignetsImg,
    category: "desserts",
    badges: ["popular", "vegetarian"],
    prepTime: 10,
  },
  {
    id: "banana-fritters",
    nameRu: "Банановые оладьи",
    nameEn: "Banana Fritters",
    descRu: "Хрустящие банановые оладьи с корицей и мёдом.",
    descEn: "Crispy banana fritters with cinnamon and honey.",
    price: 260,
    image: bananaImg,
    category: "desserts",
    badges: ["vegetarian", "new"],
    prepTime: 10,
  },
  // Combos
  {
    id: "combo-jollof",
    nameRu: "Комбо Джолоф",
    nameEn: "Jollof Combo",
    descRu: "Джолоф Специальный + Биссап + Бенье — выгодный набор.",
    descEn: "Jollof Special + Bissap + Beignets — great value set.",
    price: 990,
    image: jollofImg,
    category: "combo",
    badges: ["popular"],
    prepTime: 25,
  },
  {
    id: "combo-grill",
    nameRu: "Комбо Гриль",
    nameEn: "Grill Combo",
    descRu: "Суя Брошетт + Алоко + Имбирный сок — идеальный обед.",
    descEn: "Suya Skewers + Alloco + Ginger Juice — perfect lunch.",
    price: 890,
    image: suyaImg,
    category: "combo",
    badges: ["new"],
    prepTime: 20,
  },
];

export const categoryKeys: CategoryKey[] = [
  "popular", "grillades", "traditionalDishes", "streetFood", "drinks", "desserts", "combo"
];
