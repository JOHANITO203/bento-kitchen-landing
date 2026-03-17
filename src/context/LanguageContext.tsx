import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "ru" | "en";

const translations = {
  ru: {
    // Header
    menu: "Меню",
    categories: "Категории",
    offers: "Акции",
    restaurants: "Рестораны",
    cart: "Корзина",
    account: "Аккаунт",
    // Hero
    heroTitle: "Вкус Африки\nс доставкой.",
    heroSubtitle: "Лучшие африканские блюда вашего города — горячие, свежие, за 30 минут.",
    orderNow: "Заказать сейчас",
    viewMenu: "Смотреть меню",
    // Categories
    popular: "Популярные",
    grillades: "Грильяды",
    africanDishes: "Платы африканские",
    streetFood: "Стрит-фуд",
    desserts: "Десерты",
    drinks: "Напитки",
    discover: "Открыть",
    // Live tracker
    live: "В прямом эфире",
    nextDelivery: "Следующая доставка",
    min: "мин",
    restaurantToYou: "Ресторан → Вы",
    // Stats
    today: "Сегодня",
    avgTime: "Среднее время",
    satisfaction: "Удовлетворённость",
    // Flash offer
    discount: "-20%",
    africanCuisine: "Африканская Кухня",
    seeAll: "Все",
    // Filters
    filters: "Фильтры",
    yourCravings: "Ваши предпочтения",
    vegetarian: "Вегетарианское",
    fast: "Быстрое",
    starred: "Со звездой",
    healthyFilter: "Полезное",
    newFilter: "Новинки",
    // Cart
    myCart: "Моя корзина",
    checkOrder: "Проверьте заказ перед оформлением.",
    emptyCart: "Ваша корзина пуста",
    total: "Итого",
    order: "Заказать",
    currency: "₽",
    // Dishes
    taginePremiun: "Тажин Премиум",
    jollofSpecial: "Джолоф Специальный",
    mafeClassic: "Мафе Классик",
    // Address
    addressPlaceholder: "Введите ваш адрес доставки",
    deliveryAddress: "Адрес доставки",
  },
  en: {
    menu: "Menu",
    categories: "Categories",
    offers: "Offers",
    restaurants: "Restaurants",
    cart: "Cart",
    account: "Account",
    heroTitle: "Taste of Africa\ndelivered.",
    heroSubtitle: "The best African dishes in your city — hot, fresh, in 30 minutes.",
    orderNow: "Order now",
    viewMenu: "View menu",
    popular: "Popular",
    grillades: "Grills",
    africanDishes: "African Dishes",
    streetFood: "Street Food",
    desserts: "Desserts",
    drinks: "Drinks",
    discover: "Discover",
    live: "Live",
    nextDelivery: "Next delivery",
    min: "min",
    restaurantToYou: "Restaurant → You",
    today: "Today",
    avgTime: "Avg time",
    satisfaction: "Satisfaction",
    discount: "-20%",
    africanCuisine: "African Cuisine",
    seeAll: "See all",
    filters: "Filters",
    yourCravings: "Your cravings",
    vegetarian: "Vegetarian",
    fast: "Fast",
    starred: "Starred",
    healthyFilter: "Healthy",
    newFilter: "New",
    myCart: "My Cart",
    checkOrder: "Review your order before continuing.",
    emptyCart: "Your cart is empty",
    total: "Total",
    order: "Order",
    currency: "₽",
    taginePremiun: "Tagine Premium",
    jollofSpecial: "Jollof Special",
    mafeClassic: "Mafé Classic",
    addressPlaceholder: "Enter your delivery address",
    deliveryAddress: "Delivery address",
  },
} as const;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ru");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
