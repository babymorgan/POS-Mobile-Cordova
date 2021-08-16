import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sells/sells.module').then( m => m.SellsPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'sales-history',
    loadChildren: () => import('./sales-history/sales-history.module').then( m => m.SalesHistoryPageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  {
    path: 'printer-setting',
    loadChildren: () => import('./printer-setting/printer-setting.module').then( m => m.PrinterSettingPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
