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
          import('../tabHome/tabHome.page').then((m) => m.tabHomePage),
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('../tabRecipes/tabRecipes.page').then((m) => m.tabRecipesPage),
      },
      {
        path: 'ingredient',
        loadComponent: () =>
          import('../tabIngredients/tabIngredients.page').then(
            (m) => m.tabIngredientsPage
          ),
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
