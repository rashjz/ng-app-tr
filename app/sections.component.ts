import {Component, Output} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {EventEmitter} from "@angular/core";

@Component({
    selector: 'sections',
    template: `app/sections.component.html`
})

export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    sections: Section[];
    activeSection: string;

    @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();


    constructor(private http: Http) {
        this.readSections();
    }

    readSections() {
        this.getSections().subscribe(sections => {

            if (this.activeSection == null && this.sections.length > 0) {
                this.showSection(this.sections[0]);
            }

            this.sections = sections;
        });
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
            .map(response => response.json() as Section[]);
    }

    showSection(section: Section) {
        this.activeSection = section.title;
        this.sectionChanged.emit(this.activeSection);
    }
}
interface Section {
    _id: string;
    title: string;
}