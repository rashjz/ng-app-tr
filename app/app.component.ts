import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    // template: `
    //     <h1>Hello Angular2 App</h1>
    //     <br>Your name: <input type="text" [(ngModel)]="name">
    //     <p></p>Hello, {{name}} from Angular! `
    template: `
    <h1>Notes Angular App</h1>
   <notes></notes>`

})

export class AppComponent {
    name="John";
}