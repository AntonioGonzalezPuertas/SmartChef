import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Ingridient } from '../models/ingridient.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngridientService implements OnInit {
  private ingridientsSubject = new BehaviorSubject<Ingridient[]>([]);
  public ingridients$ = this.ingridientsSubject.asObservable();

  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    if (environment.dev) {
      // In development mode, fetch recipes from dummy data
      console.log('Using mock data for ingridients');

      const data = await import(
        'src/app/services/dummyData/dummyIngridientsData.json'
      );
      // Convert date strings to Date objects
      const ingridients = data.default.map((ingridient: any) => ({
        ...ingridient,
        createdAt: new Date(ingridient.createdAt),
        updatedAt: new Date(ingridient.updatedAt),
      }));

      this.ingridientsSubject.next(ingridients as Ingridient[]);
    } else {
      await this.getIngridients();
    }
  }

  public async getIngridients(): Promise<any> {}
}
