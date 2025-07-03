import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'sections',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../tabHome/tabHome.page').then((m) => m.tabHomePage),
        canActivate: [AuthGuard], // Protect the account route
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('../tabRecipes/tabRecipes.page').then((m) => m.tabRecipesPage),
        canActivate: [AuthGuard], // Protect the account route
      },
      {
        path: 'ingredient',
        loadComponent: () =>
          import('../tabIngredients/tabIngredients.page').then(
            (m) => m.tabIngredientsPage
          ),
        canActivate: [AuthGuard], // Protect the account route
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
