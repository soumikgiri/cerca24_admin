import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { ConfigResolver } from './shared/resolver';

export const Approutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ]
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
      { path: 'users', loadChildren: './user/user.module#UserModule' },
      { path: 'products', loadChildren: './product/product.module#ProductModule' },
      { path: 'shops', loadChildren: './shop/shop.module#ShopModule' },
      { path: 'banners', loadChildren: './banner/banner.module#BannerModule' },
      { path: 'refunds', loadChildren: './refund/refund.module#RefundModule' },
      { path: 'posts', loadChildren: './posts/post.module#PostModule' },
      { path: 'complaints', loadChildren: './complaint/complaint.module#ComplaintModule' },
      { path: 'orders', loadChildren: './order/order.module#OrderModule' },
      { path: 'configs', loadChildren: './config/config.module#ConfigModule' },
      { path: 'i18n', loadChildren: './i18n/i18n.module#I18nModule' },
      { path: 'newsletter', loadChildren: './newsletter/newsletter.module#NewsletterModule' },
      { path: 'request-payout', loadChildren: './request-payout/request-payout.module#RequestPayoutModule' },
      { path: 'packages', loadChildren: './package/package.module#PackageModule' },
      { path: 'companies', loadChildren: './company/company.module#CompanyModule' },
      { path: 'drivers', loadChildren: './driver/driver.module#DriverModule' },
      { path: 'report', loadChildren: './report-sale/report.module#ReportModule' },
      { path: 'zones', loadChildren: './delivery-zone/zone.module#DeliveryZoneModule' }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
