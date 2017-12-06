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
require("rxjs/add/operator/map");
require("rxjs/Rx");
var core_2 = require("@angular/core");
var SectionsComponent = /** @class */ (function () {
    function SectionsComponent(http) {
        this.http = http;
        this.sectionsUrl = 'sections'; // URL to web api
        this.sectionChanged = new core_2.EventEmitter();
        this.readSections();
    }
    SectionsComponent.prototype.readSections = function () {
        var _this = this;
        this.getSections().subscribe(function (sections) {
            if (_this.activeSection == null && _this.sections.length > 0) {
                _this.showSection(_this.sections[0]);
            }
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], SectionsComponent.prototype, "sectionChanged", void 0);
    SectionsComponent = __decorate([
        core_1.Component({
            selector: 'sections',
            template: "app/sections.component.html"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SectionsComponent);
    return SectionsComponent;
}());
exports.SectionsComponent = SectionsComponent;
//# sourceMappingURL=sections.component.js.map