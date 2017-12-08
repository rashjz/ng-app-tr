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
require("rxjs/add/operator/map");
require("rxjs/Rx");
var core_2 = require("@angular/core");
var SectionsComponent = /** @class */ (function () {
    function SectionsComponent(http) {
        this.http = http;
        this.sectionsUrl = 'sections'; // URL to web api
        this.sectionsReplaceUrl = "/sections/replace";
        this.sectionChanged = new core_2.EventEmitter();
        this.readSections();
    }
    Object.defineProperty(SectionsComponent.prototype, "section", {
        set: function (section) {
            if (section && section.length > 0) {
                this.activeSection = section;
            }
        },
        enumerable: true,
        configurable: true
    });
    SectionsComponent.prototype.readSections = function () {
        var _this = this;
        this.getSections().subscribe(function (sections) {
            // if (this.activeSection == null && this.sections.length > 0) {
            //     this.showSection(this.sections[0]);
            // }
            _this.sections = sections;
        });
    };
    SectionsComponent.prototype.getSections = function () {
        return this.http.get(this.sectionsUrl)
            .map(function (response) { return response.json(); });
    };
    SectionsComponent.prototype.showSection = function (section) {
        this.activeSection = section.title;
        this.sectionChanged.emit(this.activeSection);
    };
    SectionsComponent.prototype.addSection = function (newSection) {
        var title = newSection.value;
        if (!title)
            return;
        // // check for duplicates
        // if (this.sections.map(s => s.title).find(t => t === title)) return;
        //
        // const section: Section = {title};
        // this.sections.unshift(section);
        // this.showSection(section);
        // write sections to server and clear add section input box
        this.writeSections().subscribe(function (res) { return newSection.value = ""; });
    };
    SectionsComponent.prototype.remove = function (id) {
        var _this = this;
        var params = new http_2.URLSearchParams();
        params.set('id', id);
        this.http.delete("/sections", { search: params })
            .toPromise()
            .then(function (response) {
            console.log("note with id " + id + " removed, response", response);
            _this.getSections();
        });
    };
    SectionsComponent.prototype.writeSections = function () {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], SectionsComponent.prototype, "sectionChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SectionsComponent.prototype, "section", null);
    SectionsComponent = __decorate([
        core_1.Component({
            selector: 'sections',
            templateUrl: "app/sections.component.html"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SectionsComponent);
    return SectionsComponent;
}());
exports.SectionsComponent = SectionsComponent;
var SectionFilterPipe = /** @class */ (function () {
    function SectionFilterPipe() {
    }
    SectionFilterPipe.prototype.transform = function (sections, v) {
        if (!sections)
            return [];
        return sections.filter(function (s) { return s.title.toLowerCase().startsWith(v.toLowerCase()); });
    };
    SectionFilterPipe = __decorate([
        core_1.Pipe({
            name: 'sectionFilter'
        })
    ], SectionFilterPipe);
    return SectionFilterPipe;
}());
exports.SectionFilterPipe = SectionFilterPipe;
//# sourceMappingURL=sections.component.js.map