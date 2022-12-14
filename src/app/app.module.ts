import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicListComponent } from './music-list/music-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MusicPlayerComponent, MusicListComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
