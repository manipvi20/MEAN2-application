import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminServices {
    private _url = "/api/info";
    constructor(private _http: Http) {}

    getAdmins() {
        return this._http.get(this._url).map(res=>res.json());
    }
}