import { Star, Flame, UtensilsCrossed, Sandwich, GlassWater, Cake, Package } from "lucide-react";
import type { CategoryKey } from "@/data/menuData";

import heroPopular from "@/assets/heroes/hero-popular.jpg";
import heroGrillades from "@/assets/heroes/hero-grillades.jpg";
import heroTraditional from "@/assets/heroes/hero-traditional.jpg";
import heroStreetfood from "@/assets/heroes/hero-streetfood.jpg";
import heroDrinks from "@/assets/heroes/hero-drinks.jpg";
import heroDesserts from "@/assets/heroes/hero-desserts.jpg";
import heroCombo from "@/assets/heroes/hero-combo.jpg";

import populairesImg from "@/assets/populaires.png";
import grilladesImg from "@/assets/grillades.png";
import traditionnelsImg from "@/assets/plats_traditionnels.png";
import streetfoodImg from "@/assets/streetfood.png";
import boissonsImg from "@/assets/boissons.png";
import dessertsImg from "@/assets/desserts.png";
import comboImg from "@/assets/combo.png";

export interface CategoryConfig {
  key: CategoryKey;
  labelKey: string;
  descKey: string;
  heroImage: string;
  thumbnail: string;
  icon: React.ReactNode;
  gradient: string;
}

export const categoriesConfig: CategoryConfig[] = [
  {
    key: "popular",
    labelKey: "popular",
    descKey: "popularDesc",
    heroImage: heroPopular,
    thumbnail: populairesImg,
    icon: <Star className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-primary/80 to-primary/20",
  },
  {
    key: "grillades",
    labelKey: "grillades",
    descKey: "grilladesDesc",
    heroImage: heroGrillades,
    thumbnail: grilladesImg,
    icon: <Flame className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-destructive/80 to-destructive/20",
  },
  {
    key: "traditionalDishes",
    labelKey: "traditionalDishes",
    descKey: "traditionalDesc",
    heroImage: heroTraditional,
    thumbnail: traditionnelsImg,
    icon: <UtensilsCrossed className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-primary/80 to-accent/20",
  },
  {
    key: "streetFood",
    labelKey: "streetFood",
    descKey: "streetFoodDesc",
    heroImage: heroStreetfood,
    thumbnail: streetfoodImg,
    icon: <Sandwich className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-accent/80 to-accent/20",
  },
  {
    key: "drinks",
    labelKey: "drinks",
    descKey: "drinksDesc",
    heroImage: heroDrinks,
    thumbnail: boissonsImg,
    icon: <GlassWater className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-accent/80 to-primary/20",
  },
  {
    key: "desserts",
    labelKey: "desserts",
    descKey: "dessertsDesc",
    heroImage: heroDesserts,
    thumbnail: dessertsImg,
    icon: <Cake className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-primary/60 to-primary/10",
  },
  {
    key: "combo",
    labelKey: "combo",
    descKey: "comboDesc",
    heroImage: heroCombo,
    thumbnail: comboImg,
    icon: <Package className="w-5 h-5" strokeWidth={1.5} />,
    gradient: "from-primary/80 to-destructive/20",
  },
];
