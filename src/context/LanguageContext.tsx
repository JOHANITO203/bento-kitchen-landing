import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "ru" | "en";

const translations = {
  ru: {
    premiumDelivery: "Премиум Доставка",
    heroTitle: "Закажите\nвкус Африки.",
    heroSubtitle: "Лучшие африканские рестораны вашего города, доставка менее 30 минут.",
    addressPlaceholder: "Введите ваш адрес",
    find: "Найти",
    live: "В прямом эфире",
    nextDelivery: "Следующая доставка",
    min: "мин",
    restaurantToYou: "Ресторан → Вы",
    today: "Сегодня",
    avgTime: "Среднее время",
    satisfaction: "Удовлетворённость",
    popular: "Популярное",
    trending: "Тренды",
    healthy: "Полезное",
    jollofRice: "Джолоф Райс",
    tagine: "Тажин с бараниной",
    pokeBowl: "Мафе с овощами",
    discover: "Открыть",
    discount: "-20%",
    italianSelection: "Африканская Кухня",
    seeAll: "Все",
    filters: "Фильтры",
    yourCravings: "Ваши предпочтения",
    vegetarian: "Вегетарианское",
    fast: "Быстрое",
    starred: "Со звездой",
    healthyFilter: "Полезное",
    newFilter: "Новинки",
    restaurants: "Рестораны",
    categories: "Категории",
    offers: "Акции",
    cart: "Корзина",
    myCart: "Моя корзина",
    checkOrder: "Проверьте заказ перед оформлением.",
    emptyCart: "Ваша корзина пуста",
    total: "Итого",
    order: "Заказать",
    pastaTruffle: "Тажин Премиум",
    pokeSalmon: "Джолоф Специальный",
    pastaCarbonara: "Мафе Классик",
    currency: "₽",
  },
  en: {
    premiumDelivery: "Premium Delivery",
    heroTitle: "Order\nthe taste of Africa.",
    heroSubtitle: "The best African restaurants in your city, delivered in under 30 minutes.",
    addressPlaceholder: "Enter your address",
    find: "Find",
    live: "Live",
    nextDelivery: "Next delivery",
    min: "min",
    restaurantToYou: "Restaurant → You",
    today: "Today",
    avgTime: "Avg time",
    satisfaction: "Satisfaction",
    popular: "Popular",
    trending: "Trending",
    healthy: "Healthy",
    jollofRice: "Jollof Rice",
    tagine: "Lamb Tagine",
    pokeBowl: "Mafé Bowl",
    discover: "Discover",
    discount: "-20%",
    italianSelection: "African Cuisine",
    seeAll: "See all",
    filters: "Filters",
    yourCravings: "Your cravings",
    vegetarian: "Vegetarian",
    fast: "Fast",
    starred: "Starred",
    healthyFilter: "Healthy",
    newFilter: "New",
    restaurants: "Restaurants",
    categories: "Categories",
    offers: "Offers",
    cart: "Cart",
    myCart: "My Cart",
    checkOrder: "Review your order before continuing.",
    emptyCart: "Your cart is empty",
    total: "Total",
    order: "Order",
    pastaTruffle: "Tagine Premium",
    pokeSalmon: "Jollof Special",
    pastaCarbonara: "Mafé Classic",
    currency: "₽",
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
