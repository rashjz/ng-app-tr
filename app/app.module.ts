import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { HttpModule }    from '@angular/http';
import { NotesComponent }   from './notes.component';
import {SectionsComponent} from "./sections.component";

@NgModule({
    imports:      [ BrowserModule,HttpModule, FormsModule ],
    declarations: [ AppComponent,NotesComponent,SectionsComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }