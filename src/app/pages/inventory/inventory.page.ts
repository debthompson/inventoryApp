/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/pages/inventory/inventory.page.ts
 * Purpose: Displays the list of inventory items and allows searching and help widget
 */

// Imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';
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
	IonSegment,
	IonSegmentButton,
} from '@ionic/angular/standalone';


// Helper Function: Search Term Match
// Matches only if:
// - the term matches the start of a word, or
// - for longer terms (3+ letters), appears anywhere in the field
function wordMatch(field: string, term: string): boolean {
	field = field.toLowerCase();
	term = term.toLowerCase();

	const words = field.split(/\s+/);

	// Short terms (1–2 letters): ONLY match start of word
	if (term.length <= 2) {
		return words.some(word => word.startsWith(term));
	}

	// Terms 3+ letters: allow anywhere
	return (
		words.some(word => word.startsWith(term)) ||
		field.includes(term)
	);
}

// Component Definition
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
		IonSegment,
		IonSegmentButton,
		CommonModule,
		FormsModule,
	],
})

// Page Logic
export class InventoryPage implements OnInit {
	// Holds full list of items from the API
	items: InventoryItem[] = [];

	// Holds items after search filtering
	filteredItems: InventoryItem[] = [];

	// Text entered into the search bar
	searchTerm = '';

	// Current search mode (all, name, category, supplier)
	searchMode: string = 'all';

	constructor(
		private inventoryService: InventoryService,
		private alertCtrl: AlertController
	) {}

	// NOT NEEDED: Runs when the tab becomes active (initial load + when returning to it)
	ngOnInit() {}

	// Refresh items every time the Inventory tab becomes active
	ionViewWillEnter() {
		this.loadItems();
	}

	// Load all items from the API and update the filtered list
	loadItems() {
		this.inventoryService.getAllItems().subscribe({
			next: (items) => {
				this.items = items;
				this.applyFilter(); // keep existing search/filter applied
			},
			error: (err) => {
				console.error('Error loading items:', err);
			}
		});
	}

	// Triggered when search input changes
	onSearchTermChange(event: any) {
		this.searchTerm = (event.target.value || '').toLowerCase();
		this.applyFilter();
	}

	// Filters items based on search input and search mode
	applyFilter() {
		const term = this.searchTerm.toLowerCase().trim();

		if (!term) {
			this.filteredItems = this.items;
			return;
		}

		this.filteredItems = this.items.filter((item) => {
		const name = item.item_name?.toLowerCase() || '';
		const cat = (item.category as string)?.toLowerCase?.() || '';
		const supplier = item.supplier_name?.toLowerCase() || '';

		switch (this.searchMode) {
			case 'name':
			return wordMatch(name, term);

			case 'category':
			return wordMatch(cat, term);

			case 'supplier':
			return wordMatch(supplier, term);

			default: // all
		
			return (
				wordMatch(name, term) ||
				wordMatch(cat, term) ||
				wordMatch(supplier, term)
			);
		}
	});
}

	// Help Widget
	async openHelp() {
		const alert = await this.alertCtrl.create({
			header: 'Inventory Help',
			message:
			'This page shows all items from the Art Gallery inventory. Use the search bar to filter by name, category, or supplier. Use the Add and Manage tabs below to create and update items.',
			buttons: ['OK'],
		});

		await alert.present();
	}
}
