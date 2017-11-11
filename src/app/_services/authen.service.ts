import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { SystemConstants } from '../_config/system.containts';
import { LoggedInUser } from '../_models/loggedin.user';

@Injectable()
export class AuthenService {
    constructor(private _http: Http) { }
    login(username: string, password: string) {

        const body = 'userName =' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password) +
            '&grant_type = password';

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const options = new RequestOptions({ headers: headers });

        return this._http.post(SystemConstants.BASE_API + '/token', body, options).map((response: Response) => {
            const user: LoggedInUser = response.json();
            if (user && user.access_token) {
                localStorage.removeItem(SystemConstants.CURRENT_USER);
                localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
            }
        });
    }
    logout() {
        localStorage.removeItem(SystemConstants.CURRENT_USER);
    }
    isUserAuthenticated(): boolean {
        const user = localStorage.getItem(SystemConstants.CURRENT_USER);
        if (user != null) {
            return true;
        }
        // tslint:disable-next-line:one-line
        else {
            return false;
        }
    }

    getLoggedInUser(): LoggedInUser {
        let user: LoggedInUser;
        if (this.isUserAuthenticated()) {
            const userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
            user = new LoggedInUser(userData.userName, userData.access_token, user.email);
        }
        return user;
    }
}
