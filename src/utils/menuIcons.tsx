import { Leaf, Wheat, Milk, Fish, Egg, Flame, Drumstick, Feather, Sparkles, Salad } from "lucide-react";

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
  const icons: DietaryIcon[] = [];
  
  // Vegan
  if (text.includes('vegan') || text.includes('vegano')) {
    icons.push({
      icon: <Leaf className="w-4 h-4 text-green-600" />,
      label: 'Vegan'
    });
  }
  
  // Vegetarian (solo se non è già vegan)
  if ((text.includes('vegetarian') || text.includes('vegetariano') || text.includes('vegetarisch')) && 
      !text.includes('vegan') && !text.includes('vegano')) {
    icons.push({
      icon: <Leaf className="w-4 h-4 text-green-500" />,
      label: 'Vegetarian'
    });
  }
  
  // Pescatarian
  if (text.includes('pescatarian') || text.includes('pescatarisch') || text.includes('pescetarian')) {
    icons.push({
      icon: <Fish className="w-4 h-4 text-blue-500" />,
      label: 'Pescatarian'
    });
  }
  
  // Gluten-free
  if (text.includes('gluten-free') || text.includes('gluten free') || 
      text.includes('senza glutine') || text.includes('glutenfrei')) {
    icons.push({
      icon: <Wheat className="w-4 h-4 text-amber-600 line-through" />,
      label: 'Gluten-free'
    });
  }
  
  // Lactose-free
  if (text.includes('lactose-free') || text.includes('lactose free') || 
      text.includes('senza lattosio') || text.includes('laktosefrei')) {
    icons.push({
      icon: <Milk className="w-4 h-4 text-blue-600 line-through" />,
      label: 'Lactose-free'
    });
  }
  
  // Low carb
  if (text.includes('low carb') || text.includes('low-carb') || text.includes('lowcarb')) {
    icons.push({
      icon: <Salad className="w-4 h-4 text-green-600" />,
      label: 'Low Carb'
    });
  }
  
  // High protein
  if (text.includes('high protein') || text.includes('high-protein') || 
      text.includes('proteinreich') || text.includes('protein')) {
    icons.push({
      icon: <Drumstick className="w-4 h-4 text-red-600" />,
      label: 'High Protein'
    });
  }
  
  // Spicy
  if (text.includes('spicy') || text.includes('scharf') || text.includes('piccante')) {
    icons.push({
      icon: <Flame className="w-4 h-4 text-orange-600" />,
      label: 'Spicy'
    });
  }
  
  // Light
  if (text.includes('light') || text.includes('leicht') || text.includes('leggero')) {
    icons.push({
      icon: <Feather className="w-4 h-4 text-sky-500" />,
      label: 'Light'
    });
  }
  
  // Contains garlic
  if (text.includes('garlic') || text.includes('knoblauch') || text.includes('aglio')) {
    icons.push({
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      label: 'Contains Garlic'
    });
  }
  
  // Contains onion
  if (text.includes('onion') || text.includes('zwiebel') || text.includes('cipolla')) {
    icons.push({
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      label: 'Contains Onion'
    });
  }
  
  // Contains peanuts
  if (text.includes('peanut') || text.includes('erdnuss') || text.includes('erdnüss') || 
      text.includes('arachid')) {
    icons.push({
      icon: <Egg className="w-4 h-4 text-amber-700" />,
      label: 'Contains Peanuts'
    });
  }
  
  // Contains eggs (più specifico, dopo peanuts)
  if ((text.includes('egg') || text.includes('uova') || text.includes(' ei ')) && 
      !text.includes('peanut') && !text.includes('erdnuss')) {
    icons.push({
      icon: <Egg className="w-4 h-4 text-yellow-600" />,
      label: 'Contains Eggs'
    });
  }
  
  return icons;
}
