/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/services/inventory.service.ts
 * Purpose: Handles all API requests for retrieving, adding, updating, and deleting inventory items
 */

// Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InventoryItem, NewInventoryItem } from '../models/inventory-item';


@Injectable({
  // Makes the service available to the whole app
  providedIn: 'root',

})

export class InventoryService {

  // Base URL for the backend API (loaded from environment file)
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Get the full list of items from the backend
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/`);
  }

  // Get a single item by its name
  getItemByName(name: string): Observable<InventoryItem> {
    const encodedName = encodeURIComponent(name);
    return this.http.get<InventoryItem>(`${this.baseUrl}/${encodedName}`);
  }

  // Add a new item to the inventory
  addItem(item: NewInventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.baseUrl}/`, item);
  }

  // Update an existing item (searched by name)
  updateItem(name: string, item: InventoryItem): Observable<InventoryItem> {
    const encodedName = encodeURIComponent(name);
    return this.http.put<InventoryItem>(`${this.baseUrl}/${encodedName}`, item);
  }

  // Delete an item by name
  deleteItem(name: string): Observable<{ message: string }> {
    const encodedName = encodeURIComponent(name);
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/${encodedName}`
    );
  }
  
}
