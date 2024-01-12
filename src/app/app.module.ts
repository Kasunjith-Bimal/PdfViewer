import { DocumentService } from './../document.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { AngularDraggableModule } from 'angular2-draggable';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SampleDivComponent } from './sample-div/sample-div.component';
@NgModule({
  declarations: [
    AppComponent,
    SampleDivComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    AngularDraggableModule,
    Ng2ImgMaxModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
