import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'sections',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../tabHome/tabHome.page').then((m) => m.homePage),
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('../tabRecipes/tabRecipes.page').then((m) => m.Tab2Page),
      },
      {
        path: 'stock',
        loadComponent: () =>
          import('../tabStock/tabStock.page').then((m) => m.tabStockPage),
      },
      {
        path: '',
        redirectTo: '/sections/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/sections/home',
    pathMatch: 'full',
  },
];
