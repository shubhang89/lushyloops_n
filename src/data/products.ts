
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inventoryCount: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Small Flower Keychain",
    description: "A cute crocheted flower keychain, perfect as a small gift or accessory for your bag.",
    price: 899,
    category: "keychain",
    imageUrl: "/lovable-uploads/cd3b3e98-cb50-498f-8a0d-79bf31f9ff5a.png",
    inventoryCount: 15,
    featured: true
  },
  {
    id: "2",
    name: "Succulent Plant Pot",
    description: "Hand-crocheted plant pot, perfect for small succulents or air plants.",
    price: 1599,
    category: "pot",
    imageUrl: "/lovable-uploads/d86a826b-11fe-4581-9ad3-83c9598e9bad.png",
    inventoryCount: 8,
    featured: true
  },
  {
    id: "3",
    name: "Bouquet of Wildflowers",
    description: "A beautiful bouquet of crocheted wildflowers that will never wilt.",
    price: 2499,
    category: "bouquet",
    imageUrl: "/lovable-uploads/06a6c95d-02c6-42cc-8924-8b87a08fd0df.png",
    inventoryCount: 5,
    featured: true
  },
  {
    id: "4",
    name: "Sunflower Wall Hanging",
    description: "A cheerful sunflower wall hanging to brighten up any room.",
    price: 1899,
    category: "flowers",
    imageUrl: "/lovable-uploads/d443acff-2f67-41c4-af20-cd1d899f7da4.png",
    inventoryCount: 10,
    featured: true
  },
  {
    id: "5",
    name: "Animal Keychain Set",
    description: "Set of three adorable animal keychains - bunny, bear, and fox.",
    price: 1499,
    category: "keychain",
    imageUrl: "/lovable-uploads/96f938c7-4d04-4d74-8a15-cbc2a689cf8e.png",
    inventoryCount: 12,
    featured: true
  },
  {
    id: "6",
    name: "Hanging Plant Holder",
    description: "Macramé style crocheted hanging plant holder, perfect for small to medium pots.",
    price: 1299,
    category: "pot",
    imageUrl: "/lovable-uploads/02206745-4f42-451e-aca5-1f6a5ba300c7.png",
    inventoryCount: 7
  },
  {
    id: "7",
    name: "Rose Bouquet",
    description: "A romantic bouquet of crocheted roses in soft pink and cream colors.",
    price: 2999,
    category: "bouquet",
    imageUrl: "/lovable-uploads/089a3acc-7774-403a-81a0-2c0e43a15d4b.png",
    inventoryCount: 4
  },
  {
    id: "8",
    name: "Daisy Chain Garland",
    description: "Cheerful daisy chain garland, perfect for decorating a child's room.",
    price: 2199,
    category: "flowers",
    imageUrl: "/lovable-uploads/27565f35-1ec5-49c0-a8f0-b0c42d0f204f.png",
    inventoryCount: 6
  },
  {
    id: "9",
    name: "Initial Letter Keychain",
    description: "Personalized initial letter keychain in your choice of colors.",
    price: 999,
    category: "keychain",
    imageUrl: "/lovable-uploads/7ec236be-5215-4bbe-839a-0aa10049fcb2.png",
    inventoryCount: 20
  },
  {
    id: "10",
    name: "Decorative Bowl",
    description: "Large decorative crocheted bowl, perfect for holding fruit or as a centerpiece.",
    price: 1999,
    category: "pot",
    imageUrl: "/lovable-uploads/ac3dba37-9762-4566-bb3d-9d53e179ba96.png",
    inventoryCount: 5
  },
  {
    id: "11",
    name: "Tulip Arrangement",
    description: "Spring-inspired arrangement of crocheted tulips in various colors.",
    price: 2799,
    category: "bouquet",
    imageUrl: "/lovable-uploads/43204493-0c9b-457f-9064-fa8cc99cebc2.png",
    inventoryCount: 3
  },
  {
    id: "12",
    name: "Lotus Flower Set",
    description: "Set of three lotus flowers in graduating sizes, beautiful as table decorations.",
    price: 1799,
    category: "flowers",
    imageUrl: "/lovable-uploads/319ece52-85c2-4d07-9bf0-3038ecfbed00.png",
    inventoryCount: 8
  }
];

export const categories = [
  { id: "keychain", name: "Keychains" },
  { id: "pot", name: "Pots & Holders" },
  { id: "bouquet", name: "Bouquets" },
  { id: "flowers", name: "Flowers" },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}
