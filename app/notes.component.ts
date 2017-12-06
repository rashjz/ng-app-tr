import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {URLSearchParams} from '@angular/http';

@Component({
    selector: 'notes',
    template: `
<div class="container">
<textarea [(ngModel)]="text" ></textarea>
<button (click)="add()" class="btn btn-success" >Add</button>
<br/>
Notes list: 
<ul>
    <li *ngFor="let note of notes">
        {{note.text}}  {{note.lastUpdated | date: 'HH:mm dd.MM.yyyy'}} <button class="btn btn-danger" (click)="remove(note._id)">remove</button>
    </li>
</ul>
</div>`
})

export class NotesComponent {
    private notesUrl = '/notes';  // URL to web api
    text: string;
    lastUpdated: number;
    notes: Note[] = [];

    constructor(private http: Http) {

        this.readNotes();

        // this.getNotes().then(notes => {
        //     this.notes = notes
        //     console.log(notes);
        // });
    }

    readNotes() {
        this.getNotes().then(notes => {
            this.notes = notes;
        });
    }

    addNote(note: Note) {
        this.http.post(this.notesUrl, note).toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            });

    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    add() {
        let note = {_id: this.text, text: this.text, lastUpdated: this.lastUpdated};
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
interface Note {
    _id: string;
    text: string;
    lastUpdated: number;
}
