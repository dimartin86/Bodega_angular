import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ProductosComponent } from './productos/productos.component';
import { AuthComponent } from './auth/auth.component';
import { FilterPipe } from './filter.pipe';

  const appRoutes: Routes = [
      {path: 'productos', component: ProductosComponent},
      {path: 'auth', component: AuthComponent},
      {path: 'inicio', component: AppComponent}
  ]


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    AuthComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FilterPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
