import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'payment',
        children: [
          {
            path: '',
            loadChildren: () => import('../payment/payment.module').then(m => m.PaymentPageModule)
          }

        ]
      }, {
        path: 'payment-edit/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../payment/payment.module').then(m => m.PaymentPageModule)
          }

        ]
      }, {
        path: 'sales',
        children: [
          {
            path: '',
            loadChildren: () => import('../sells/sells.module').then(m => m.SellsPageModule)
          }

        ]
      }, {
        path: 'sales-edit/:id',
        children: [
          {
            path: '',
            loadChildren: () => import('../sells/sells.module').then(m => m.SellsPageModule)
          }

        ]
      }, {
        path: 'feeds',
        children: [
          {
            path: '',
            loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      }, {
        path: 'sales-history',
        children: [
          {
            path: '',
            loadChildren: () => import('../sales-history/sales-history.module').then(m => m.SalesHistoryPageModule)
          }
        ]
      }, {
        path: 'payment-history',
        children: [
          {
            path: '',
            loadChildren: () => import('../payment-history/payment-history.module').then(m => m.PaymentHistoryPageModule)
          }
        ]
      },
      {
        path: 'printer-setting',
        children: [
          {
            path: '',
            loadChildren: () => import('../printer-setting/printer-setting.module').then(m => m.PrinterSettingPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/feeds',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
