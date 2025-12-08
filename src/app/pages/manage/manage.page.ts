/**
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Lydia Pawlus
 * File: manage.page.ts
 * Purpose: Displays Inventory management page to update and delete existing item records
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonButtons, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonList, IonSelectOption } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { Category, InventoryItem, StockStatus } from '../../models/inventory-item';
import { Router } from '@angular/router';


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
    IonButtons,
    IonIcon,    
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
  ],
})

export class ManagePage implements OnInit {
  items: InventoryItem[] = []; 

  constructor(
    private inventoryService: InventoryService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  ionViewWillEnter() {
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

  goToUpdate(item: InventoryItem) {
    console.log('Update clicked for:', item.item_name);
    console.log('Current URL is:', this.router.url);
    this.router.navigate(['/tabs/manage', item.item_name]);
  }

  async confirmDelete(item: InventoryItem) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${item.item_name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => this.deleteItem(item),
        },
      ],
    });

    await alert.present();
  }

  deleteItem(item: InventoryItem) {
    this.inventoryService.deleteItem(item.item_name).subscribe({
      next: () => {
        this.loadItems();
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      },
    });
  }

  // Help Widget
  async openHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Inventory Help',
      message:
        'This page shows all items from the Art Gallery inventory with Update and Delete buttons for management of these items.',
      buttons: ['OK'],
    });

    await alert.present();
  }  
}
