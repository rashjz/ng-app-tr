"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var http_2 = require("@angular/http");
var NotesComponent = /** @class */ (function () {
    function NotesComponent(http) {
        this.http = http;
        this.notesUrl = '/notes'; // URL to web api
        this.notes = [];
        this.readNotes();
        // this.getNotes().then(notes => {
        //     this.notes = notes
        //     console.log(notes);
        // });
    }
    NotesComponent.prototype.readNotes = function () {
        var _this = this;
        this.getNotes().then(function (notes) {
            _this.notes = notes;
        });
    };
    NotesComponent.prototype.addNote = function (note) {
        var _this = this;
        this.http.post(this.notesUrl, note).toPromise()
            .then(function (response) {
            console.log("note sent, response", response);
            _this.readNotes();
        });
    };
    NotesComponent.prototype.getNotes = function () {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    NotesComponent.prototype.add = function () {
        var note = { _id: this.text, text: this.text, lastUpdated: this.lastUpdated };
        // this.notes.push(note);
        // this.text = "";
        note.lastUpdated = (new Date()).getTime();
        this.addNote(note);
    };
    NotesComponent.prototype.remove = function (id) {
        var _this = this;
        var params = new http_2.URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(function (response) {
            console.log("note with id " + id + " removed, response", response);
            _this.readNotes();
        });
    };
    NotesComponent = __decorate([
        core_1.Component({
            selector: 'notes',
            template: "\n<div class=\"container\">\n<textarea [(ngModel)]=\"text\" ></textarea>\n<button (click)=\"add()\" class=\"btn btn-success\" >Add</button>\n<br/>\nNotes list: \n<ul>\n    <li *ngFor=\"let note of notes\">\n        {{note.text}}  {{note.lastUpdated | date: 'HH:mm dd.MM.yyyy'}} <button class=\"btn btn-danger\" (click)=\"remove(note._id)\">remove</button>\n    </li>\n</ul>\n</div>"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], NotesComponent);
    return NotesComponent;
}());
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map