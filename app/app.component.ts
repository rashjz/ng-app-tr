import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    // template: `
    //     <h1>Hello Angular2 App</h1>
    //     <br>Your name: <input type="text" [(ngModel)]="name">
    //     <p></p>Hello, {{name}} from Angular! `
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    section: string;

    setSection(section:string) {
        this.section = section;
    }
}