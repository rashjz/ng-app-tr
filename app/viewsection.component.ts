import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {ActivatedRoute} from "@angular/router";
import {NotesServerService} from "./services/NotesServerService";
import {Note} from "./notes.component";

@Component({
    selector: 'viewSection',
    templateUrl: `app/viewSection.component.html`
})

export class ViewSectionComponent implements OnInit {
    section: string;
    notes: Note[];

    constructor(private route: ActivatedRoute, private noteServer: NotesServerService) {
    }


    ngOnInit() {
        this.section = this.route.snapshot.params["name"];
        this.getNotes().subscribe(notes => this.notes = notes);
    }


    getNotes() {
        return this.noteServer.getNotes(this.section);
    }
}


