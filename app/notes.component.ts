import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'notes',
    template: `

<textarea [(ngModel)]="text" ></textarea>
<button (click)="add()">Add</button>
<br/>
Notes list: 
<ul>
    <li *ngFor="let note of notes; let i=index">
        {{note.text}} <button (click)="remove(i)">remove</button>
    </li>
</ul>`
})

export class NotesComponent {
    private notesUrl = 'http://localhost:8080/notes';  // URL to web api
    text: string

    constructor(private http: Http) {
        this.getNotes().then(notes => {
            this.notes = notes
            console.log(notes);
        });
    }


    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    add() {
        let note = {text: this.text}
        this.notes.push(note);
        this.text = "";
    }

    remove(idx) {
        this.notes.splice(idx, 1);
    }

    notes: Note[] = [
        {text: "Note one"},
        {text: "Note two"}
    ]

}
interface Note {
    text: string;
}