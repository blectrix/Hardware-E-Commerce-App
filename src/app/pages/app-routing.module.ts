import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./auth-screens/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'auth-screen',
    loadChildren: () => import('./auth-screens/auth-screen/auth-screen.module').then( m => m.AuthScreenPageModule),
    canLoad: [IntroGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/tabs/cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/tabs/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./pages/cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
    path: 'promotions/:id',
    loadChildren: () => import('./pages/tabs/promotions/promotions.module').then( m => m.PromotionsPageModule)
  },
  {
    path: 'fogort-password',
    loadChildren: () => import('./pages/fogort-password/fogort-password.module').then( m => m.FogortPasswordPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'pay-completed',
    loadChildren: () => import('./pages/pay-completed/pay-completed.module').then( m => m.PayCompletedPageModule)
  },
  {
    path: 'orders-modal',
    loadChildren: () => import('./pages/orders-modal/orders-modal.module').then( m => m.OrdersModalPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth-screens/auth-screen/sign-in/sign-in.component').then( m => m.SignInComponent)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
