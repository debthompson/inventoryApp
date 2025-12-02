/**
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Lydia Pawlus
 * File: manage.page.ts
 * Purpose: Displays Inventory management page to update and delete existing item records.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf,} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem,
  IonButton,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonInput
} from '@ionic/angular/standalone';

import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem, Category, StockStatus,} from '../../models/inventory-item';

/* Components */

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
    IonCardSubtitle
  ]
})
export class ManagePage implements OnInit {
  
items: InventoryItem[] = [];
 
 
/* ----Search and Update items --------*/
  searchName: string = '';
  selectedItem: InventoryItem | null = null;     // item to be edited item
  editItem: any = null;          // make it editible

  constructor(
    private inventoryService: InventoryService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadAllItems();
  }

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

  getItem() {
    const name = this.searchName.trim();

    if (!name) {
      this.showAlert('Search Error', 'Please enter an item name.');
      return;
    }

    this.inventoryService.getItemByName(name).subscribe({
      next: (item) => {
        this.selectedItem = item; // direct binding
      },
      error: () => {
        this.selectedItem = null;
        this.showAlert('Not Found', 'No item found with that name.');
      }
    });
  }
  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}