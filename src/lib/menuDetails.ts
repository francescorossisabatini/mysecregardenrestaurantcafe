import type { DishDetails } from "@/data/allergensData";

const clean = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const includesAny = (value: string, terms: string[]) => terms.some((term) => value.includes(term));

export const inferDishDetails = (dishText?: string): DishDetails => {
  const value = clean(dishText ?? "");
  if (!value.trim()) return {};

  const allergens = new Set<number>();
  const ingredients = new Set<string>();
  const producers: DishDetails["ingredientProducers"] = {};

  const add = (items: string[]) => items.forEach((item) => ingredients.add(item));

  if (includesAny(value, ["lins", "dal"])) add(["Rote Linsen", "Gewürze"]);
  if (includesAny(value, ["kurkuma", "turmeric"])) add(["Kurkuma"]);
  if (includesAny(value, ["kokos", "coconut"])) add(["Kokosmilch"]);
  if (includesAny(value, ["reis", "rice", "basmati"])) add(["Basmatireis"]);
  if (includesAny(value, ["tomat", "tomato"])) add(["Tomaten"]);
  if (includesAny(value, ["zwiebel", "onion"])) add(["Zwiebeln"]);
  if (includesAny(value, ["gemuse", "vegetable", "kurbis", "pumpkin", "karotte", "carrot"])) add(["Saisonales Gemüse"]);
  if (includesAny(value, ["tofu", "soja", "soy"])) {
    allergens.add(6);
    add(["Tofu"]);
  }
  if (includesAny(value, ["kase", "käse", "cheese", "milch", "milk", "joghurt", "yogurt", "lassi", "butter", "panna", "cream", "mousse"])) {
    allergens.add(7);
    add(["Milchprodukt"]);
  }
  if (includesAny(value, ["ei", "egg"])) allergens.add(3);
  if (includesAny(value, ["weizen", "dinkel", "pasta", "nudel", "brot", "bread", "kuchen", "cake", "cheesecake", "torte", "schnitte", "brownie", "gluten"])) allergens.add(1);
  if (includesAny(value, ["erdnuss", "peanut"])) allergens.add(5);
  if (includesAny(value, ["mandel", "haseln", "waln", "cashew", "pistaz", "macadamia", "nuss", "nut", "brownie"])) allergens.add(8);
  if (includesAny(value, ["sellerie", "celery", "brühe", "broth"])) allergens.add(9);
  if (includesAny(value, ["senf", "mustard", "dressing"])) allergens.add(10);
  if (includesAny(value, ["sesam", "sesame", "tahini", "hummus"])) allergens.add(11);
  if (includesAny(value, ["wein", "wine", "trockenfrucht", "dried fruit", "sulfit"])) allergens.add(12);
  if (includesAny(value, ["lupin"])) allergens.add(13);

  if (includesAny(value, ["bio-tofu", "bio tofu"])) {
    producers.Tofu = { certification: "bio" };
  }

  const sensory: string[] = [];
  if (includesAny(value, ["wurz", "spiced", "spicy", "curry", "chili"])) sensory.push("würzig");
  if (includesAny(value, ["cremig", "creamy", "mousse", "lassi"])) sensory.push("cremig");
  if (includesAny(value, ["knuspr", "crispy"])) sensory.push("knusprig");
  if (includesAny(value, ["frisch", "fresh", "salat", "salad"])) sensory.push("frisch");
  if (includesAny(value, ["scharf", "hot", "chili"])) sensory.push("leicht scharf");
  if (includesAny(value, ["gemuse", "vegetable"])) sensory.push("saisonales Gemüse");

  return {
    descriptionShort: sensory.slice(0, 4).join(", "),
    ingredientsMain: [...ingredients].slice(0, 6),
    allergens: [...allergens].sort((a, b) => a - b),
    gfDisclaimer: includesAny(value, ["glutenfrei", "gluten-free", "gluten free"]),
    ingredientProducers: Object.keys(producers).length ? producers : undefined,
  };
};
