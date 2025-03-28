
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
    price: 12.99,
    category: "keychain",
    imageUrl: "/placeholder.svg",
    inventoryCount: 15,
    featured: true
  },
  {
    id: "2",
    name: "Succulent Plant Pot",
    description: "Hand-crocheted plant pot, perfect for small succulents or air plants.",
    price: 24.99,
    category: "pot",
    imageUrl: "/placeholder.svg",
    inventoryCount: 8,
    featured: true
  },
  {
    id: "3",
    name: "Bouquet of Wildflowers",
    description: "A beautiful bouquet of crocheted wildflowers that will never wilt.",
    price: 39.99,
    category: "bouquet",
    imageUrl: "/placeholder.svg",
    inventoryCount: 5,
    featured: true
  },
  {
    id: "4",
    name: "Sunflower Wall Hanging",
    description: "A cheerful sunflower wall hanging to brighten up any room.",
    price: 29.99,
    category: "flowers",
    imageUrl: "/placeholder.svg",
    inventoryCount: 10,
    featured: true
  },
  {
    id: "5",
    name: "Animal Keychain Set",
    description: "Set of three adorable animal keychains - bunny, bear, and fox.",
    price: 21.99,
    category: "keychain",
    imageUrl: "/placeholder.svg",
    inventoryCount: 12,
    featured: true
  },
  {
    id: "6",
    name: "Hanging Plant Holder",
    description: "Macramé style crocheted hanging plant holder, perfect for small to medium pots.",
    price: 19.99,
    category: "pot",
    imageUrl: "/placeholder.svg",
    inventoryCount: 7
  },
  {
    id: "7",
    name: "Rose Bouquet",
    description: "A romantic bouquet of crocheted roses in soft pink and cream colors.",
    price: 49.99,
    category: "bouquet",
    imageUrl: "/placeholder.svg",
    inventoryCount: 4
  },
  {
    id: "8",
    name: "Daisy Chain Garland",
    description: "Cheerful daisy chain garland, perfect for decorating a child's room.",
    price: 34.99,
    category: "flowers",
    imageUrl: "/placeholder.svg",
    inventoryCount: 6
  },
  {
    id: "9",
    name: "Initial Letter Keychain",
    description: "Personalized initial letter keychain in your choice of colors.",
    price: 15.99,
    category: "keychain",
    imageUrl: "/placeholder.svg",
    inventoryCount: 20
  },
  {
    id: "10",
    name: "Decorative Bowl",
    description: "Large decorative crocheted bowl, perfect for holding fruit or as a centerpiece.",
    price: 32.99,
    category: "pot",
    imageUrl: "/placeholder.svg",
    inventoryCount: 5
  },
  {
    id: "11",
    name: "Tulip Arrangement",
    description: "Spring-inspired arrangement of crocheted tulips in various colors.",
    price: 44.99,
    category: "bouquet",
    imageUrl: "/placeholder.svg",
    inventoryCount: 3
  },
  {
    id: "12",
    name: "Lotus Flower Set",
    description: "Set of three lotus flowers in graduating sizes, beautiful as table decorations.",
    price: 27.99,
    category: "flowers",
    imageUrl: "/placeholder.svg",
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
