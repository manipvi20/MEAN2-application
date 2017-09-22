import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminServices {
    private _url = "/api/info";
    private _userUrl = '/api/userinfo'; 
    constructor(private _http: Http) {}

    getAdmins() {
        return this._http.get(this._url).map(res=>res.json());
    }

    getUser(username: string) {
        return this._http.get(this._userUrl + "/" + username)
        .map(res=>res.json());
    }
    postUser(user){
        console.log(user);
        return this._http.post(this._url, user)
        .map(res=>res.json());
    }
    /*logout() {
        localStorage.removeItem('username');
    }*/
}