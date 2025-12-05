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
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonSearchbar, IonInput, IonList } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

function wordMatch(field: string, term: string): boolean {
  field = field.toLowerCase();
  term = term.toLowerCase();

  const words = field.split(/\s+/);

  // Short terms 
  if (term.length <= 2) {
    return words.some(word => word.startsWith(term));
  }

  // Terms 3+ letters: allow anywhere
  return (
    words.some(word => word.startsWith(term)) ||
    field.includes(term)
  );
}


// component

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
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
    IonSearchbar,
    IonInput,
    IonList
],
})

export class ManagePage implements OnInit {

  items: InventoryItem[] = [];

  // Search and select item

  selectedItem: InventoryItem | null = null;
   // Holds items after search filtering
  
   filteredItems: InventoryItem[] = [];

  // Text entered into the search bar
  searchTerm = '';

  searchName = '';

  // Current search mode (all, name, category, supplier)
  searchMode: string = 'all';
updateItem: any;

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
        this.applyFilter(); 
      },
      error: (err) => {
        console.error('Error loading items:', err);
      }
    });
  }
  
  selectItem(item: InventoryItem) {
  this.selectedItem = item;
  }
    onSearchTermChange(event: any) {
    this.searchTerm = (event.target.value || '').toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    throw new Error('Method not implemented.');
  }

  // Retrieve item based on searchName
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
        this.selectedItem = item;
      },
      error: (err) => {
        console.error('Error getting item:', err);
        this.selectedItem = null;
        this.showAlert('Not Found', 'No item found with that name.');
      }
    });
  }

  // Delete current item
  deleteItem() {
    if (!this.selectedItem) {
      return;
    }

    const name = this.selectedItem.item_name;

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
                  this.searchName = '';
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
