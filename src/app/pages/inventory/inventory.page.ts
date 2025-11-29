/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/pages/inventory/inventory.page.ts
 * Purpose: Loads all inventory items, applies search filtering, and displays item data
 */

// Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonChip,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert,
} from '@ionic/angular/standalone';

import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  // Component tag used in HTML
  selector: 'app-inventory',

  // HTML and styling for this page
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],

  // Standalone component (no Angular module needed)
  standalone: true,

  // Ionic + Angular modules used in this page
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonChip,
    IonSearchbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonAlert,
    CommonModule,
    FormsModule,
  ],
})

export class InventoryPage implements OnInit {

  // Holds full list of items from the API
  items: InventoryItem[] = [];

  // Holds items after search filtering
  filteredItems: InventoryItem[] = [];

  // Text entered into the search bar
  searchTerm = '';

  // Controls visibility of the Help pop-up
  showHelp = false;

  constructor(private inventoryService: InventoryService) {}

  // Runs once when the page loads
  ngOnInit() {

    // Call the API to get all inventory items
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        console.log('API response:', data);
        
        // Save items and apply search filtering
        this.items = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('API ERROR:', err);
      },
    });
  }

  // Triggered when search input changes
  onSearchTermChange(ev: any) {
    this.searchTerm = ev.detail?.value || '';
    this.applyFilter();
  }

  // Filters items based on search input
  private applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();

    // If search bar is empty, show all items
    if (!term) {
      this.filteredItems = this.items;
      return;
    }

    // Filter items by name, category, or supplier
    this.filteredItems = this.items.filter((item) => {
      const name = item.item_name?.toLowerCase() || '';
      const cat = (item.category as string)?.toLowerCase?.() || '';
      const supplier = item.supplier_name?.toLowerCase() || '';

      return (
        name.includes(term) ||
        cat.includes(term) ||
        supplier.includes(term)
      );
    });
  }

  // Show help pop-up
  openHelp() {
    this.showHelp = true;
  }

  // Close help pop-up
  closeHelp() {
    this.showHelp = false;
  }

  // For debugging/testing
  onTestClick() {
    console.log('Test button clicked');
  }
}
