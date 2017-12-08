import {Component} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Component({
    selector: 'register',
    styles: [`
        input.ng-touched.ng-invalid {
            background-color: #ffe8f1;
        }
    `],
    templateUrl: 'app/userForm.component.html'
})

export class UserFormComponent {
    user: User;
    constructor (){
        this.user = new User();
    }
}

export class User {
    name: string;
    password: string;
    password2: string;
    subscribe: boolean;
    email: string;
    dateOfBirth: string;
}

