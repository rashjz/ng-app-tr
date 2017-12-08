import { NgModule }      from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { HttpModule }    from '@angular/http';
import {NotesComponent}   from './notes.component';
import {PageNotFoundComponent}   from './pagenotfound.component';
import {NotesEditorComponent} from "./noteseditor.component";
import {SectionsComponent} from "./sections.component";
import {ViewSectionComponent} from "./viewsection.component";
import {NotesServerService} from "./services/NotesServerService";
import {UserFormComponent} from "./userForm.component";
import {LoginFormComponent} from "./loginForm.component";
import {LoginService} from "./services/LoginService";

const appRoutes: Routes = [
    { path: '', component: NotesEditorComponent },
    { path: 'viewSection/:name', component: ViewSectionComponent }, //before ** route
    { path: ':name', component: NotesEditorComponent },
    { path: 'register', component: UserFormComponent },
    { path: 'login', component: LoginFormComponent },
    // { path: '**', component: PageNotFoundComponent },

];


@NgModule({
    imports:      [ BrowserModule,HttpModule, FormsModule ,RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent,NotesComponent,SectionsComponent,ViewSectionComponent,PageNotFoundComponent ,NotesEditorComponent ,UserFormComponent ,LoginFormComponent],
    bootstrap:    [ AppComponent ],
    providers:    [ NotesServerService ,LoginService]
})
export class AppModule {


}



