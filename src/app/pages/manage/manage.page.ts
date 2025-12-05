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
import { AlertController } from '@ionic/angular';

import {
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
  IonInput
} from '@ionic/angular/standalone';

import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

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
    IonInput
  ]
})
export class ManagePage implements OnInit {

  items: InventoryItem[] = [];

  // Search and selected item
  searchName: string = '';
  selectedItem: InventoryItem | null = null;

  constructor(
    private inventoryService: InventoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadAllItems();
  }

  // Load all items from backend (optional for list / refresh)
  loadAllItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (err) => {
        console.error('Error loading items:', err);
      }
    });
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
        console.log('Item returned from API:', item);
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
                  this.loadAllItems();
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
