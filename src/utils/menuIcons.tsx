import { Leaf, Wheat, Milk, Egg, Flame, Feather, Sparkles, Salad, CircleAlert, Nut } from "lucide-react";

export interface DietaryIcon {
  icon: JSX.Element;
  label: string;
}

/**
 * Analizza il testo delle note e restituisce le icone appropriate
 */
export function getDietaryIcons(notes?: { de: string; en: string }): DietaryIcon[] {
  if (!notes || (!notes.de && !notes.en)) return [];
  
  const text = `${notes.de} ${notes.en}`.toLowerCase();
  const iconMap = new Map<string, DietaryIcon>();
  
  // Vegan
  if (text.includes('vegan') || text.includes('vegano')) {
    iconMap.set('vegan', {
      icon: <Leaf className="w-4 h-4 text-green-600" />,
      label: 'Vegan'
    });
  }
  
  // Vegetarian (solo se non è già vegan)
  if ((text.includes('vegetarian') || text.includes('vegetariano') || text.includes('vegetarisch')) && 
      !text.includes('vegan') && !text.includes('vegano')) {
    iconMap.set('vegetarian', {
      icon: <Leaf className="w-4 h-4 text-green-500" />,
      label: 'Vegetarian'
    });
  }
  
  // Gluten-free
  if (text.includes('gluten-free') || text.includes('gluten free') || 
      text.includes('senza glutine') || text.includes('glutenfrei')) {
    iconMap.set('gluten-free', {
      icon: <Wheat className="w-4 h-4 text-amber-600 line-through" />,
      label: 'Gluten-free'
    });
  }
  
  // Lactose-free
  if (text.includes('lactose-free') || text.includes('lactose free') || 
      text.includes('senza lattosio') || text.includes('laktosefrei')) {
    iconMap.set('lactose-free', {
      icon: <Milk className="w-4 h-4 text-blue-600 line-through" />,
      label: 'Lactose-free'
    });
  }
  
  // Low carb
  if (text.includes('low carb') || text.includes('low-carb') || text.includes('lowcarb')) {
    iconMap.set('low-carb', {
      icon: <Salad className="w-4 h-4 text-green-600" />,
      label: 'Low Carb'
    });
  }
  
  // Spicy
  if (text.includes('spicy') || text.includes('scharf') || text.includes('piccante')) {
    iconMap.set('spicy', {
      icon: <Flame className="w-4 h-4 text-orange-600" />,
      label: 'Spicy'
    });
  }
  
  // Light
  if (text.includes('light') || text.includes('leicht') || text.includes('leggero')) {
    iconMap.set('light', {
      icon: <Feather className="w-4 h-4 text-sky-500" />,
      label: 'Light'
    });
  }
  
  // Contains garlic
  if (text.includes('garlic') || text.includes('knoblauch') || text.includes('aglio')) {
    iconMap.set('garlic', {
      icon: <CircleAlert className="w-4 h-4 text-purple-600" />,
      label: 'Contains Garlic'
    });
  }
  
  // Contains onion
  if (text.includes('onion') || text.includes('zwiebel') || text.includes('cipolla')) {
    iconMap.set('onion', {
      icon: <CircleAlert className="w-4 h-4 text-amber-600" />,
      label: 'Contains Onion'
    });
  }
  
  // Contains peanuts
  if (text.includes('peanut') || text.includes('erdnuss') || text.includes('erdnüss') || 
      text.includes('arachid')) {
    iconMap.set('peanuts', {
      icon: <Nut className="w-4 h-4 text-orange-700" />,
      label: 'Contains Peanuts'
    });
  }
  
  // Contains eggs (più specifico, dopo peanuts)
  if ((text.includes('egg') || text.includes('uova') || text.includes(' ei ')) && 
      !text.includes('peanut') && !text.includes('erdnuss')) {
    iconMap.set('eggs', {
      icon: <Egg className="w-4 h-4 text-yellow-600" />,
      label: 'Contains Eggs'
    });
  }
  
  return Array.from(iconMap.values());
}
