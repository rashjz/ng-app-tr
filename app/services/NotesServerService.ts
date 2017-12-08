import {Injectable, Input} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Note} from "../notes.component";

@Injectable()
export class NotesServerService {
    private notesUrl = '/notes';  // URL to web api
    @Input() section: string;

    constructor(private http: Http) {
    }

    getNotes(section): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', section);
        return this.http.get(this.notesUrl, {search: params})
            // .subscribe(
            //     function (response) {
            //         // response.json() as Note[];
            //         console.log("Success Response" + response);
            //     },
            //     function (error) {
            //         console.log("Error happened" + error)
            //     },
            //     function () {
            //         console.log("the subscription is completed")
            //     }
            // );
        .map(response => response.json() as Note[]);
    }
}
