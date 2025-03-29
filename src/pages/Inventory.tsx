
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { downloadSubscribersAsExcel } from "@/data/subscribers";
import { Product, products as initialProducts } from "@/data/products";
import { Plus, Download, Save, Trash2 } from "lucide-react";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "keychain",
    imageUrl: "",
    inventoryCount: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load products from localStorage if available
    const savedProducts = localStorage.getItem("inventory");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  const saveInventory = () => {
    localStorage.setItem("inventory", JSON.stringify(products));
    toast({
      title: "Inventory Saved",
      description: "Product inventory has been saved successfully.",
    });
  };

  const exportInventoryAsCSV = () => {
    // Create CSV content
    const header = "ID,Name,Description,Price,Category,Inventory Count,Image URL\n";
    const rows = products.map(product => 
      `${product.id},"${product.name}","${product.description}",${product.price},${product.category},${product.inventoryCount},"${product.imageUrl}"`
    ).join("\n");
    
    const csvContent = header + rows;
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" || name === "inventoryCount" ? Number(value) : value
    });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.category || !newProduct.imageUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newId = (products.length + 1).toString();
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: newProduct.price || 0,
      inventoryCount: newProduct.inventoryCount || 0
    } as Product;

    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem("inventory", JSON.stringify(updatedProducts));
    
    // Reset form
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      category: "keychain",
      imageUrl: "",
      inventoryCount: 0
    });

    toast({
      title: "Product Added",
      description: "New product has been added to inventory."
    });
  };

  const updateProductInventory = (id: string, newCount: number) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, inventoryCount: newCount } : product
    );
    setProducts(updatedProducts);
  };

  const removeProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    toast({
      title: "Product Removed",
      description: "Product has been removed from inventory."
    });
  };

  const downloadSubscribers = () => {
    downloadSubscribersAsExcel();
    toast({
      title: "Subscribers Downloaded",
      description: "Subscribers list has been downloaded as CSV."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-4">
          <Button onClick={saveInventory} className="flex items-center gap-2">
            <Save size={16} /> Save Changes
          </Button>
          <Button onClick={exportInventoryAsCSV} variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Export Inventory
          </Button>
          <Button onClick={downloadSubscribers} variant="outline" className="flex items-center gap-2">
            <Download size={16} /> Download Subscribers
          </Button>
        </div>
      </div>

      {/* Add New Product Form */}
      <div className="bg-beige-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <Input 
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full h-10 px-3 border border-beige-300 rounded-md focus:outline-none focus:ring-1 focus:ring-beige-400"
            >
              <option value="keychain">Keychains</option>
              <option value="pot">Pots & Holders</option>
              <option value="bouquet">Bouquets</option>
              <option value="flowers">Flowers</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <Input 
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price in rupees"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Inventory Count</label>
            <Input 
              type="number"
              name="inventoryCount"
              value={newProduct.inventoryCount}
              onChange={handleInputChange}
              placeholder="Number of items in stock"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input 
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
              placeholder="URL to product image"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input 
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Product description"
            />
          </div>
        </div>
        <Button onClick={addProduct} className="flex items-center gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProductInventory(product.id, Math.max(0, product.inventoryCount - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={product.inventoryCount}
                      onChange={(e) => updateProductInventory(product.id, Number(e.target.value))}
                      className="w-16 text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateProductInventory(product.id, product.inventoryCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
