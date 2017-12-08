import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoginService {
    private loginUrl = 'login';  // URL to web api
    private logoutUrl = 'logout';  // URL to web api
    loggedIn: boolean = false;

    constructor(private http: Http) {
    }
    userLogin(user: LoginUser) {
        this.loggedIn = true;
    }

    userLogout() {
        this.loggedIn = false;
    }

    login(user: LoginUser): Observable<boolean> {
        return this.http.post(this.loginUrl, user)
            .map(response => response.json() as boolean)
            .do(res => {
                if (res) this.userLogin(user)
            });
    }

    logout() {
        return this.http.get(this.logoutUrl)
            .do(res => this.userLogout());
    }

}

export class LoginUser {
    userName: string;
    password: string;
}
