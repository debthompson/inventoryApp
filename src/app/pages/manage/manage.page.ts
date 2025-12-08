/**
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Lydia Pawlus
 * File: manage.page.ts
 * Purpose: Displays Inventory management page to update and delete existing item records.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonList, IonSelectOption } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { Category, InventoryItem, StockStatus } from '../../models/inventory-item';



// component

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonInput,
    IonList,
    IonSelectOption
],
})

export class ManagePage implements OnInit {
  searchName: string = '';
  items: InventoryItem[] = []; 
  selectedItem: InventoryItem | null = null;
  filteredItems: InventoryItem[] = [];
   
  originalName: string | null = null;
  item_name: string = '';
  category: Category = Category.Miscellaneous;
  quantity: number = 0;
  price: number = 0;
  supplier_name: string = '';
  stock_status: StockStatus = StockStatus.InStock;
  featured_item: number = 0;
  special_note?: string | null = null;

  constructor(
    private inventoryService: InventoryService,
    private alertCtrl: AlertController,
  ) {}

ngOnInit() {
    this.loadItems();
  }

// Load all items from backend 
loadItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.items = items;

      },
      error: (err) => {
        console.error('Error loading items:', err);
      }
    });
  }

  
selectItem(item: InventoryItem) {
    this.originalName = item.item_name;    // keep original DB key
    this.selectedItem = {...item};
  }
  


// Retrieve item based on name
getItem() {
    const name = this.searchName.trim();
    console.log('Searching for item name;', name);

    if (!name) {
      this.showAlert('Search Error', 'Please enter an item name.');
      return;
    }

      this.inventoryService.getItemByName(name).subscribe({
      next: (item) => {
        console.log('API returned item:', item);
        this.originalName = item.item_name;
        this.selectedItem = {...item };
      },
      error: (err) => {
        console.error('Error getting item:', err);
        this.selectedItem = null;
        this.showAlert('Not Found', 'No item found with that name.');
      }
    });
  }

  // Update item
updateItem(): void {
  if (!this.selectedItem || !this.originalName) {
    return;
  }

  //remove item_id from the body
  const { item_id, ...payLoad } = this.selectedItem as InventoryItem;

  this.inventoryService
    .updateItem(this.originalName, payLoad as any)   // use originalName for URL
    .subscribe({
      next: (updated) => {
       //update local view
        this.showAlert('Updated', `"${this.originalName}" has been updated.`);
        this.loadItems();
      },
      error: (err) => {
        console.error('Error updating item:', err);
        this.showAlert('Error', 'Item could not be updated.');
      }
    });
}



  
  // Delete current item
  deleteItem() {
  if (!this.selectedItem || !this.originalName) {
    return;
  }

    const name = this.originalName;

    this.alertCtrl
      .create({
        header: 'Confirm Delete',
        message: `Are you sure you want to delete "${name}"?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this.inventoryService.deleteItem(name).subscribe({
                next: () => {
                  this.showAlert(
                    'Deleted',
                    `"${name}" has been removed from the inventory.`
                  );
                  this.selectedItem = null;
                  this.originalName = null;
                  this['searchName'] = '';
                  this.loadItems();
                },
                error: (err) => {
                  console.error('Error deleting item:', err);
                  this.showAlert('Error', 'Item could not be deleted.');
                }
              });
            }
          }
        ]
      })
      .then(alert => alert.present());
  }

  // Alert helper
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
