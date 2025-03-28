
// Simple in-memory database for subscribers
// In a real application, this would connect to a backend database

export interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

// In-memory store
let subscribers: Subscriber[] = [];

// Get all subscribers
export const getAllSubscribers = (): Subscriber[] => {
  return [...subscribers];
};

// Add a new subscriber
export const addSubscriber = (email: string): Subscriber => {
  // Check for duplicates
  const existingSubscriber = subscribers.find(sub => sub.email === email);
  if (existingSubscriber) {
    throw new Error("This email is already subscribed to our newsletter.");
  }
  
  const newSubscriber: Subscriber = {
    id: Date.now().toString(),
    email,
    createdAt: new Date()
  };
  
  subscribers.push(newSubscriber);
  
  // In a real app, we would save to a database here
  console.log("New subscriber added:", newSubscriber);
  
  return newSubscriber;
};

// Export as CSV (for admin purposes)
export const exportSubscribersAsCSV = (): string => {
  // Create CSV header
  const header = "ID,Email,Date Subscribed\n";
  
  // Create rows
  const rows = subscribers.map(sub => 
    `${sub.id},${sub.email},${sub.createdAt.toISOString()}`
  ).join("\n");
  
  return header + rows;
};

// For demonstration purposes - initialize with sample data
if (process.env.NODE_ENV === 'development') {
  addSubscriber('sample1@example.com');
  addSubscriber('sample2@example.com');
}
