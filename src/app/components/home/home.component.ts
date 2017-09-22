import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [HeaderComponent]
})
export class HomeComponent implements OnInit {
    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _headerComp : HeaderComponent) {}
    ngOnInit() {
      this._headerComp.ngOnInit();
      let loggedInCheck = localStorage.getItem('username');
      let activateParam = this._activatedRoute.snapshot.params["username"];
      activateParam != loggedInCheck ? this._router.navigate(['not-found']) : '';
    }
}
