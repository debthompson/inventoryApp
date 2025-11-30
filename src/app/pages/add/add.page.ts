import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonInput,
  IonNote,
  IonToggle,
  IonLabel
} from '@ionic/angular/standalone';

import { InventoryService } from '../../services/inventory.service';

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
  item_id: number;
  item_name: string;              // name of the item
  category: Category;             // category using enum
  quantity: number;               // how many in stock
  price: number;                  // price of the item
  supplier_name: string;          // supplier company/artist/etc.
  stock_status: StockStatus;      // stock level status
  featured_item: number;          // 0 or 1 to show featured status
  special_note?: string | null;   // optional extra note
}

export type NewInventoryItem = Omit<InventoryItem, 'item_id'>;
	
@Component({

  selector: 'app-add',
  standalone: true,
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList,
    IonItem,
    IonButtons,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonNote,
    IonInput,
    IonToggle,
    IonLabel
  ],
})

export class AddPage implements OnInit {
	
	//exposes enum
	Category = Category;
  StockStatus = StockStatus;
  
  // NOT NEEDED
  // showHelp = false;
   
	item_name: string = '';
  category: Category = Category.Miscellaneous;
  quantity: number = 0;
  price: number = 0;
  supplier_name: string = '';
  stock_status: StockStatus = StockStatus.InStock;
  featured_item: number = 0;
  special_note?: string | null = null;

	// NOT NEEDED: help widget
	// helpButton = [{
	//   text: 'OK',	
	//   handler: ()=>{
	// 	  this.closeHelp()		
	// 	  return true;	 
	//   }
	// }];
  
  constructor(
    private inventoryService: InventoryService,
    private alertCtrl:AlertController
  ) {}
	   
	ngOnInit() {}
  
  //displays help message when help widget is selected
	async openHelp() {
    const alert = await this.alertCtrl.create({
      header: "Help",
      message: "This page allows you to add items to the Art Gallery inventory. Below you can use the Inventory tab to show all items or the Manage tab to update items.",
      buttons: ["OK"]
    });

    await alert.present();
  }

  // NOT NEEDED: Close help pop-up
  // closeHelp() {
  //   this.showHelp = false;
  // }
  
  // Add a new item to the inventory, all fields match backend database
  addItem() {
    const newItem: NewInventoryItem = {	
      item_name: this.item_name,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplier_name: this.supplier_name,
      stock_status: this.stock_status,
      featured_item: this.featured_item,
      special_note: this.special_note
    };
	
    this.inventoryService.addItem(newItem).subscribe({
      next: async (saved) => {
        console.log('Item saved:', saved);
    
        // simple success alert
        const alert = await this.alertCtrl.create({
          header: 'Success',
          // message: `Item "${saved.item_name}" added.`, // this was saying 'undefined' was added in the success alert.
          message: `Item "${this.item_name}" added.`,
          buttons: ['OK'],
        });
        await alert.present();
      
        // clears fields/data
        this.item_name = '';
        this.category = Category.Miscellaneous;
        this.quantity = 0;
        this.price = 0;
        this.supplier_name = '';
        this.stock_status = StockStatus.InStock;
        this.featured_item = 0;
        this.special_note = null;
      },

      // displays error message
      error: async (err) => {
        console.error('Error saving item:', err);
        
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Failed to save item. Check the server / API URL.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });

	}

}
