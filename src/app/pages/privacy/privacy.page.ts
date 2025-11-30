import { Component, OnInit} from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, 
         IonHeader, 
         IonTitle, 
         IonToolbar, 
         IonCardContent, 
         IonCardHeader, 
         IonCardSubtitle, 
         IonCardTitle, 
         IonLabel, 
         IonItem,
        } from '@ionic/angular/standalone';
        
  @Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonItem,
  ],
})

export class PrivacyPage implements OnInit {
   constructor () {}
  
   ngOnInit() {

}
}
