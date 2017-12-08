import {Component, Input, OnChanges} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {notEqual} from "assert";
import {NotesServerService} from "./services/NotesServerService";


@Component({
    selector: 'notes',
    templateUrl: 'app/notes.component.html'
})

export class NotesComponent implements OnChanges {
    private notesUrl = '/notes';  // URL to web api
    text: string;
    lastUpdated: number;
    notes: Note[] = [];
    @Input() section: string;


    constructor(private http:Http, private notesServer: NotesServerService) {}

    ngOnChanges() {
        this.readNotes();
    }

    readNotes() {
        // this.getNotes().subscribe(notes => { //updated then to subscribe
        //     this.notes = notes;
        // });

    }

    addNote(note: Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            });

    }



    add() {
        let note = { text: this.text, lastUpdated: this.lastUpdated, section: this.section};
        // this.notes.push(note);
        // this.text = "";
        note.lastUpdated = (new Date()).getTime();
        this.addNote(note);
    }


    remove(id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }


}



export  interface Note {
    _id?: string;
    text: string;
    lastUpdated: number;
    section: string;
}
