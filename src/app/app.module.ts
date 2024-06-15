import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule si vas a utilizar servicios HTTP

@NgModule({
  declarations: [
    AppComponent,
    // otros componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Importa HttpClientModule si es necesario
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
