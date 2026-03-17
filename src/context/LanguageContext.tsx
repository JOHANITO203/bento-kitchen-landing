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
    popularDesc: "Самые заказываемые блюда",
    grillades: "Гриль",
    grilladesDesc: "Курица, мясо на огне",
    traditionalDishes: "Традиционные блюда",
    traditionalDesc: "Рис, соусы, африканские рецепты",
    streetFood: "Стрит-фуд",
    streetFoodDesc: "Алоко, брошетт, быстрые закуски",
    desserts: "Десерты",
    dessertsDesc: "Бенье, кокос, банановые сладости",
    drinks: "Напитки",
    drinksDesc: "Биссап, имбирь, натуральные соки",
    combo: "Комбо",
    comboDesc: "Блюдо + напиток, выгодные наборы",
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
    jollofSpecial: "Джолоф Специальный",
    mafeClassic: "Мафе Классик",
    thiebRoyal: "Тьебудьен Роял",
    // Address
    addressPlaceholder: "Введите ваш адрес доставки",
    deliveryAddress: "Адрес доставки",
    // About
    aboutTag: "О нас",
    aboutTitle: "Союз двух культур",
    aboutDesc: "Солнце Африки — это проект, рождённый из желания познакомить Россию с богатством африканской кухни. Мы не просто готовим — мы адаптируем аутентичные рецепты для русского вкуса, создавая уникальный союз двух культур. Это больше, чем еда — это мост между континентами, созданный для удовольствия каждого.",
    aboutValue1Title: "Культурный мост",
    aboutValue1Desc: "Мы объединяем африканские традиции и русские вкусы в каждом блюде — настоящий брак культур.",
    aboutValue2Title: "С любовью к каждому",
    aboutValue2Desc: "Каждый рецепт адаптирован с заботой, чтобы вы открыли новые вкусы без границ.",
    aboutValue3Title: "Аутентичные рецепты",
    aboutValue3Desc: "Настоящие африканские блюда, приготовленные с уважением к традициям и свежими ингредиентами.",
    // Footer
    footerTagline: "Вкус Африки, адаптированный для России. Союз двух культур на вашем столе.",
    footerNav: "Навигация",
    footerAbout: "О нас",
    footerContact: "Контакты",
    footerAddress: "Москва, ул. Примерная, 12",
    footerHours: "Ежедневно 10:00 — 23:00",
    footerApp: "Приложение",
    footerAppDesc: "Скачайте наше приложение для быстрого заказа и эксклюзивных предложений.",
    footerDownload: "Скачать в",
    footerRights: "Все права защищены.",
    footerPrivacy: "Политика конфиденциальности",
    footerTerms: "Условия использования",
    footerCookies: "Файлы cookie",
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
    popularDesc: "Most ordered dishes",
    grillades: "Grills",
    grilladesDesc: "Chicken, meat on fire",
    traditionalDishes: "Traditional Dishes",
    traditionalDesc: "Rice, sauces, African recipes",
    streetFood: "Street Food",
    streetFoodDesc: "Alloco, skewers, quick bites",
    desserts: "Desserts",
    dessertsDesc: "Beignets, coconut, banana sweets",
    drinks: "Drinks",
    drinksDesc: "Bissap, ginger, natural juices",
    combo: "Combo",
    comboDesc: "Meal + drink, great value sets",
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
    aboutTag: "About us",
    aboutTitle: "A union of two cultures",
    aboutDesc: "Солнце Африки was born from the desire to introduce Russia to the richness of African cuisine. We don't just cook — we adapt authentic recipes for Russian tastes, creating a unique marriage of two cultures. It's more than food — it's a bridge between continents, made for the enjoyment of all.",
    aboutValue1Title: "Cultural bridge",
    aboutValue1Desc: "We blend African traditions with Russian palates in every dish — a true marriage of cultures.",
    aboutValue2Title: "Made with love",
    aboutValue2Desc: "Every recipe is carefully adapted so you can discover new flavors without borders.",
    aboutValue3Title: "Authentic recipes",
    aboutValue3Desc: "Real African dishes prepared with respect for tradition and the freshest ingredients.",
    footerTagline: "The taste of Africa, adapted for Russia. A union of two cultures on your table.",
    footerNav: "Navigation",
    footerAbout: "About us",
    footerContact: "Contact",
    footerAddress: "Moscow, Primernaya St., 12",
    footerHours: "Daily 10:00 AM — 11:00 PM",
    footerApp: "Our App",
    footerAppDesc: "Download our app for fast ordering and exclusive deals.",
    footerDownload: "Get it on",
    footerRights: "All rights reserved.",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCookies: "Cookies",
  },
} as const;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Record<string, string>;
}

const fallbackContext: LanguageContextType = {
  lang: "ru",
  setLang: () => undefined,
  t: translations.ru as Record<string, string>,
};

const LanguageContext = createContext<LanguageContextType>(fallbackContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ru");
  const t = translations[lang] as Record<string, string>;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
