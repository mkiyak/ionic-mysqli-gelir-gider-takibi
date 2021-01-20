import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'crud/:id',
    loadChildren: () => import('./pages/crud/crud.module').then( m => m.CrudPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'category-edit/:id',
    loadChildren: () => import('./pages/category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
  },
  {
    path: 'gelir-gider-list/:islem',
    loadChildren: () => import('./pages/gelir-gider-list/gelir-gider-list.module').then( m => m.GelirGiderListPageModule)
  },
  {
    path: 'gelir-gider-edit/:islem/:id',
    loadChildren: () => import('./pages/gelir-gider-edit/gelir-gider-edit.module').then( m => m.GelirGiderEditPageModule)
  },
  {
    path: 'gelir-gider-icerik/:id',
    loadChildren: () => import('./pages/gelir-gider-icerik/gelir-gider-icerik.module').then( m => m.GelirGiderIcerikPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
