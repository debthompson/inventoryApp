/**
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Lydia Pawlus, Debralee Thompson
 * File: manage-item.page.ts
 * Purpose: Update a single inventory item
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Category, InventoryItem, StockStatus } from '../../models/inventory-item';
import { AlertController } from '@ionic/angular';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonToggle,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-manage-item',
    standalone: true,
    templateUrl: './manage-item.page.html',
    styleUrls: ['./manage-item.page.scss'],
        imports: [
        CommonModule,
        FormsModule,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonSelect,
        IonSelectOption,
        IonToggle,
    ],
})

export class ManageItemPage implements OnInit {
    // Item being edited (bound to template via [(ngModel)])
    item: InventoryItem | null = null;

    // Store original name in case it’s changed in the form
    originalName: string | null = null;

    // Expose enums to the template if needed
    StockStatus = StockStatus;
    Category = Category;

    loading = true;
    loadError = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private inventoryService: InventoryService,
        private alertController: AlertController
    ) {}

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('item_name');
        console.log('Route param item_name =', param);

        if (!param) {
            this.loadError = 'No item_name supplied.';
            this.loading = false;
            return;
        }

        const itemName = decodeURIComponent(param);
        console.log('Decoded itemName =', itemName);

        this.inventoryService.getItemByName(itemName).subscribe({
            next: (result) => {
            console.log('getItemByName raw result:', result);

            // Handle both array or single-object responses just in case
            const item = Array.isArray(result) ? result[0] : result;
            if (!item) {
                this.loadError = 'Item not found.';
                this.loading = false;
                return;
            }

            // Clone to avoid mutating any shared references
            this.item = { ...item };
            this.originalName = item.item_name;
            this.loading = false;
            },
            error: (err) => {
                console.error('Error loading item:', err);
                this.loadError = 'Item not found.';
                this.loading = false;
            },
        });
    }

    // Saves the updated item details
    async saveUpdate(): Promise<void> {
        // Ensure there is an item loaded before attempting an update
        if (!this.item) {
            console.warn('saveUpdate called but item is null');
            return;
        }

        // Determine which item name to use when calling the API.
        // If the user changed the name in the form, originalName ensures the API
        // still updates the correct existing record.
        const nameToUse = this.originalName ?? this.item.item_name;

        if (!nameToUse) {
            console.error('No item name available to update');
            return;
        }

        this.inventoryService.updateItem(nameToUse, this.item).subscribe({
            next: async () => {
                console.log('Item updated successfully');

                const alert = await this.alertController.create({
                    header: 'Update successful',
                    message: 'The item has been updated.',
                    buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                        this.router.navigate(['/tabs/manage']);
                        },
                    },
                    ],
                });

                await alert.present();
            },
            error: (err) => {
                console.error('Update failed', err);
            },
        });
    }
}
