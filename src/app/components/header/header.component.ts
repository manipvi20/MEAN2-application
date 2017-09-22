import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { Login } from '../../interfaces/user';
import { AdminServices } from '../../services/info.service';
import { ComponentService } from '../../services/component.service';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  userDetails = <any>{};
  username;
  form:FormGroup;
  user  = new Login();
  
  constructor(
    private _adminService: AdminServices,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _componentService: ComponentService,
    private _activatedRoute: ActivatedRoute
    ) {
      this.form = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.loggedIn = this.username == null ?  false :  true;
    if(this.username != null) {
      this.getUserDetails(this.username)
    }
  }
  getUserDetails(user) {
      this._adminService.getUser(user).subscribe(
        res => { 
          this.userDetails = res 
        },
        err => { console.log(err + "couldnot process")
        },
        () => { }
      )
  }
  login() {
    this._adminService.getUser(this.user.username).subscribe(
      res => { 
        this.userDetails = res 
      },
      err => { console.log(err + "couldnot process")
      },
     () => {
      let userDetails = this.userDetails;
      if(userDetails == null)
        return alert("username doesn't exit");

      if(userDetails.username == this.user.username && userDetails.password == this.user.password) {
        this.loggedIn = !this.loggedIn;

        //handling local storage
        let localStorageVal = localStorage.getItem('username');
        localStorageVal !== null ? localStorage.removeItem('username') : '';
        localStorage.setItem('username', userDetails.username);

        //navigating to user page
        this._router.navigate(['user/', userDetails.username]);

      }
      else {
        alert("username or password is invalid");
      }
    }
    );
  }
  logout() {
    this.user.username = '';
    this.user.password = '';
    this.loggedIn = !this.loggedIn;
    localStorage.removeItem('username');
    this._router.navigate(['']);
  }
  getAlldata() {
    this._adminService.getUser(this.username).subscribe(
      res => this.userDetails = res 
    );
  }
}