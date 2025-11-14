import { Leaf, Wheat, Milk, Fish, Egg } from "lucide-react";

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
  if ((text.includes('vegetarian') || text.includes('vegetariano')) && 
      !text.includes('vegan') && !text.includes('vegano')) {
    icons.push({
      icon: <Leaf className="w-4 h-4 text-green-500" />,
      label: 'Vegetarian'
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
  
  // Contains fish
  if (text.includes('fish') || text.includes('pesce') || text.includes('fisch')) {
    icons.push({
      icon: <Fish className="w-4 h-4 text-blue-500" />,
      label: 'Fish'
    });
  }
  
  // Contains eggs
  if (text.includes('egg') || text.includes('uova') || text.includes('ei')) {
    icons.push({
      icon: <Egg className="w-4 h-4 text-yellow-600" />,
      label: 'Eggs'
    });
  }
  
  return icons;
}
