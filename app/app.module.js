"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var notes_component_1 = require("./notes.component");
var pagenotfound_component_1 = require("./pagenotfound.component");
var noteseditor_component_1 = require("./noteseditor.component");
var sections_component_1 = require("./sections.component");
var viewsection_component_1 = require("./viewsection.component");
var NotesServerService_1 = require("./services/NotesServerService");
var userForm_component_1 = require("./userForm.component");
var loginForm_component_1 = require("./loginForm.component");
var LoginService_1 = require("./services/LoginService");
var appRoutes = [
    { path: '', component: noteseditor_component_1.NotesEditorComponent },
    { path: 'viewSection/:name', component: viewsection_component_1.ViewSectionComponent },
    { path: ':name', component: noteseditor_component_1.NotesEditorComponent },
    { path: 'register', component: userForm_component_1.UserFormComponent },
    { path: 'login', component: loginForm_component_1.LoginFormComponent },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [app_component_1.AppComponent, notes_component_1.NotesComponent, sections_component_1.SectionsComponent, viewsection_component_1.ViewSectionComponent, pagenotfound_component_1.PageNotFoundComponent, noteseditor_component_1.NotesEditorComponent, userForm_component_1.UserFormComponent, loginForm_component_1.LoginFormComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [NotesServerService_1.NotesServerService, LoginService_1.LoginService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map