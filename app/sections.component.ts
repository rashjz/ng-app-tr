import {Component, Input, Output, Pipe, PipeTransform} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {EventEmitter} from "@angular/core";

@Component({
    selector: 'sections',
    templateUrl: `app/sections.component.html`
})

export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    sectionsReplaceUrl = "/sections/replace";
    sections: Section[];
    activeSection: string;

    @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set section(section:string) {
        if (section && section.length>0) {
            this.activeSection = section;
        }
    }


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

    addSection(newSection: HTMLInputElement) {
        let title = newSection.value;
        if (!title) return;

        // // check for duplicates
        // if (this.sections.map(s => s.title).find(t => t === title)) return;
        //
        // const section: Section = {title};
        // this.sections.unshift(section);
        // this.showSection(section);

        // write sections to server and clear add section input box
        this.writeSections().subscribe(res => newSection.value = "");
    }

    remove(id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete("/sections", {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.getSections();
            });
    }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections);
    }

}
interface Section {
    _id?: string;
    title: string;
}

@Pipe({
    name: 'sectionFilter'
})
export class SectionFilterPipe implements PipeTransform {
    transform(sections: Section[], v: string): Section[] {
        if (!sections) return [];
        return sections.filter(
            s => s.title.toLowerCase().startsWith(v.toLowerCase()));
    }
}

