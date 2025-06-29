import { Component, inject } from '@angular/core';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
} from '@ionic/angular/standalone';

import { IngridientService } from '../services/ingridients.service';
import { Ingridient } from '../models/ingridient.model';
import { IngridientComponent } from '../components/ingridient/ingridient.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/utils/search/search.component';

@Component({
  selector: 'app-tabIngridients',
  templateUrl: 'tabIngridients.page.html',
  styleUrls: ['tabIngridients.page.scss'],
  imports: [
    CommonModule,
    SearchComponent,
    IonList,
    IonItem,
    IonLabel,
    IngridientComponent,
    IonContent,
  ],
})
export class tabIngridientsPage {
  private ingridientsService = inject(IngridientService);
  public selectedCategories: string[] = [];
  public filteredIngridients: Ingridient[] = [];
  public loadingData: boolean = false;
  public noResults: boolean = false;

  public ingridients: Ingridient[] = [];

  constructor() {}

  async ngOnInit() {
    // Subscribe to recipes updates
    this.ingridientsService.ingridients$.subscribe(
      (updatedIngridients: Ingridient[]) => {
        this.ingridients = updatedIngridients;
      }
    );
  }

  onFilteredIngridients(filtered: any[]) {
    this.filteredIngridients = filtered;
    if (this.filteredIngridients.length === 0 && !this.loadingData) {
      this.noResults = true;
    } else {
      this.noResults = false;
    }
  }

  public getIngridientsByCategory(): {
    category: string;
    ingridients: Ingridient[];
  }[] {
    const grouped: { [key: string]: Ingridient[] } = {};
    for (const ing of this.filteredIngridients) {
      for (const cat of ing.categories) {
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(ing);
      }
    }
    return Object.entries(grouped).map(([category, ingridients]) => ({
      category,
      ingridients,
    }));
  }
}
