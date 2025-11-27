/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/models/inventory-item.ts
 * Purpose: Defines the data structure for inventory items and related enums
 */


// List of possible item categories
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous',
}

// Possible stock status values
export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock',
}


// Main structure for an inventory item
// Fields match the backend database (snake_case)
export interface InventoryItem {
  item_id: number;                // unique ID (created automatically)
  item_name: string;              // name of the item
  category: Category;             // category using enum
  quantity: number;               // how many in stock
  price: number;                  // price of the item
  supplier_name: string;          // supplier company/artist/etc.
  stock_status: StockStatus;      // stock level status
  featured_item: number;          // 0 or 1 to show featured status
  special_note?: string | null;   // optional extra note
}

// Type for creating new inventory items
// item_id is excluded because backend assigns it
export type NewInventoryItem = Omit<InventoryItem, 'item_id'>;
