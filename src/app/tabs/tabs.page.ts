/* 
 * PROG 2005 - Programming Mobile Systems
 * Assessment 3
 * Group: Debralee Thompson
 * File: src/app/tabs/tabs.page.ts
 * Purpose: Defines the tab layout component and loads Ionic tabs, icons, and routing support
 */

// Imports
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

@Component({
	// The component selector used in HTML
	selector: 'app-tabs',

	// The HTML template for the tabs layout
	templateUrl: 'tabs.page.html',

	// Styling for this component
	styleUrls: ['tabs.page.scss'],

	// Mark this as a standalone component (no module required)
	standalone: true,

	// Ionic components and RouterLink available to this component
	imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})

export class TabsPage {
	// Needed so child components can access Angular services
	public environmentInjector = inject(EnvironmentInjector);

	constructor() {
		// Makes all Ionicons available for use in the templates
		addIcons(allIcons);
	}
}
