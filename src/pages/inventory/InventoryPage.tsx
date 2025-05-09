
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, Search, FilterX, ChevronDown, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const InventoryPage = () => {
  const parts = [
    {
      id: 1,
      name: 'Bearing Assembly',
      sku: 'BRG-1001',
      category: 'Mechanical',
      inStock: 24,
      minStock: 10,
      location: 'Warehouse A, Shelf 3',
      lastRestock: '2024-04-15',
      price: '$42.99'
    },
    {
      id: 2,
      name: 'Hydraulic Pump',
      sku: 'HYD-2023',
      category: 'Hydraulics',
      inStock: 5,
      minStock: 8,
      location: 'Warehouse B, Shelf 2',
      lastRestock: '2024-03-22',
      price: '$289.50'
    },
    {
      id: 3,
      name: 'Control Circuit Board',
      sku: 'ELE-5532',
      category: 'Electronics',
      inStock: 12,
      minStock: 15,
      location: 'Secure Storage, Cabinet 4',
      lastRestock: '2024-04-02',
      price: '$175.75'
    },
    {
      id: 4,
      name: 'Drive Belt',
      sku: 'BLT-0872',
      category: 'Mechanical',
      inStock: 32,
      minStock: 20,
      location: 'Warehouse A, Shelf 7',
      lastRestock: '2024-04-10',
      price: '$22.50'
    },
    {
      id: 5,
      name: 'Air Filter',
      sku: 'FLT-3344',
      category: 'HVAC',
      inStock: 8,
      minStock: 25,
      location: 'Warehouse C, Shelf 1',
      lastRestock: '2024-03-05',
      price: '$18.99'
    }
  ];

  const getCategoryClass = (category) => {
    switch(category) {
      case 'Mechanical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Electronics': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Hydraulics': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'HVAC': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  const getStockLevel = (inStock, minStock) => {
    const percentage = (inStock / minStock) * 100;
    if (percentage <= 50) return { color: 'bg-red-500', status: 'Low' };
    if (percentage <= 75) return { color: 'bg-yellow-500', status: 'Medium' };
    return { color: 'bg-green-500', status: 'Good' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Parts Inventory</h1>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add Part
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parts</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 5 categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires reordering
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parts Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,879</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search parts..." className="pl-8" />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <FilterX className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Parts</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-8 border-b bg-muted/50 p-4 text-sm font-medium">
                  <div className="col-span-2">Part Name</div>
                  <div>SKU</div>
                  <div>Category</div>
                  <div>Stock Level</div>
                  <div>Location</div>
                  <div>Last Restock</div>
                  <div>Price</div>
                </div>
                <div className="divide-y">
                  {parts.map((part) => {
                    const stockLevel = getStockLevel(part.inStock, part.minStock);
                    return (
                      <div key={part.id} className="grid grid-cols-8 p-4 text-sm items-center hover:bg-muted/50 cursor-pointer">
                        <div className="col-span-2 font-medium">{part.name}</div>
                        <div>{part.sku}</div>
                        <div>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getCategoryClass(part.category)}`}>
                            {part.category}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(part.inStock / part.minStock) * 100}
                              className="h-2 w-16"
                              indicatorClassName={stockLevel.color}
                            />
                            <span className="text-xs">{part.inStock}/{part.minStock}</span>
                          </div>
                        </div>
                        <div>{part.location}</div>
                        <div>{part.lastRestock}</div>
                        <div>{part.price}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low-stock" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Low stock items will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <p>Parts by category will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryPage;
