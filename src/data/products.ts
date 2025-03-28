
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
    imageUrl: "/lovable-uploads/26d56a24-6d8e-4e6f-b4ce-13aeebb2d0b9.png",
    inventoryCount: 15,
    featured: true
  },
  {
    id: "2",
    name: "Succulent Plant Pot",
    description: "Hand-crocheted plant pot, perfect for small succulents or air plants.",
    price: 1599,
    category: "pot",
    imageUrl: "/lovable-uploads/69327515-570a-4348-98e0-fa3c08266db2.png",
    inventoryCount: 8,
    featured: true
  },
  {
    id: "3",
    name: "Bouquet of Wildflowers",
    description: "A beautiful bouquet of crocheted wildflowers that will never wilt.",
    price: 2499,
    category: "bouquet",
    imageUrl: "/lovable-uploads/c19eacb2-1007-47a3-acc4-394ae7e24705.png",
    inventoryCount: 5,
    featured: true
  },
  {
    id: "4",
    name: "Sunflower Wall Hanging",
    description: "A cheerful sunflower wall hanging to brighten up any room.",
    price: 1899,
    category: "flowers",
    imageUrl: "/lovable-uploads/532920b0-0dc2-4ab4-a0be-58a44d8421d4.png",
    inventoryCount: 10,
    featured: true
  },
  {
    id: "5",
    name: "Animal Keychain Set",
    description: "Set of three adorable animal keychains - bunny, bear, and fox.",
    price: 1499,
    category: "keychain",
    imageUrl: "/lovable-uploads/29f72034-5856-445c-b845-904f3bb01d94.png",
    inventoryCount: 12,
    featured: true
  },
  {
    id: "6",
    name: "Hanging Plant Holder",
    description: "Macramé style crocheted hanging plant holder, perfect for small to medium pots.",
    price: 1299,
    category: "pot",
    imageUrl: "/lovable-uploads/e21882d2-7c8a-4131-8cb2-a37b5076ae4e.png",
    inventoryCount: 7
  },
  {
    id: "7",
    name: "Rose Bouquet",
    description: "A romantic bouquet of crocheted roses in soft pink and cream colors.",
    price: 2999,
    category: "bouquet",
    imageUrl: "/lovable-uploads/c19eacb2-1007-47a3-acc4-394ae7e24705.png",
    inventoryCount: 4
  },
  {
    id: "8",
    name: "Daisy Chain Garland",
    description: "Cheerful daisy chain garland, perfect for decorating a child's room.",
    price: 2199,
    category: "flowers",
    imageUrl: "/lovable-uploads/532920b0-0dc2-4ab4-a0be-58a44d8421d4.png",
    inventoryCount: 6
  },
  {
    id: "9",
    name: "Initial Letter Keychain",
    description: "Personalized initial letter keychain in your choice of colors.",
    price: 999,
    category: "keychain",
    imageUrl: "/lovable-uploads/1899aebd-bf21-4eb6-81f5-2f5e58af5138.png",
    inventoryCount: 20
  },
  {
    id: "10",
    name: "Decorative Bowl",
    description: "Large decorative crocheted bowl, perfect for holding fruit or as a centerpiece.",
    price: 1999,
    category: "pot",
    imageUrl: "/lovable-uploads/ca40dff6-9e29-40c0-b398-30d9529e435d.png",
    inventoryCount: 5
  },
  {
    id: "11",
    name: "Tulip Arrangement",
    description: "Spring-inspired arrangement of crocheted tulips in various colors.",
    price: 2799,
    category: "bouquet",
    imageUrl: "/lovable-uploads/c19eacb2-1007-47a3-acc4-394ae7e24705.png",
    inventoryCount: 3
  },
  {
    id: "12",
    name: "Lotus Flower Set",
    description: "Set of three lotus flowers in graduating sizes, beautiful as table decorations.",
    price: 1799,
    category: "flowers",
    imageUrl: "/lovable-uploads/532920b0-0dc2-4ab4-a0be-58a44d8421d4.png",
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
