import {LoginService, LoginUser} from "./services/LoginService";
import {Router} from "@angular/router";
import {Component} from "@angular/core";

@Component({
    selector: 'login-form',
    templateUrl: 'app/loginForm.component.html'
})
export class LoginFormComponent {
    userForm: LoginUser = new LoginUser();
    failedLogin: boolean;

    constructor(private loginService: LoginService, private router: Router) {}

    get loggedIn() {
        return this.loginService.loggedIn;
    }

    login() {
        this.loginService.login(this.userForm)
            .subscribe(res=>res?this.onSuccessLogin():this.onFailLogin());
    }

    logout() {
        this.loginService.logout().subscribe(res=>this.onLogout());
    }


    onSuccessLogin() {
        this.router.navigateByUrl("/");
    }

    onFailLogin() {
        this.failedLogin = true;
    }

    onLogout() {
        this.router.navigateByUrl("/");
    }
}

