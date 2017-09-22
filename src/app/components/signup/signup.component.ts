import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AdminServices } from '../../services/info.service';
import { ComponentService } from '../../services/component.service';
import { SignUp } from '../../interfaces/user';
import { BasicValidator } from "../shared/validators";

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  providers: [HeaderComponent]
})
export class SignupComponent implements OnInit {

  admins : any[];
  user = <any>{};
  signUp = new SignUp();
  signupform:FormGroup;
  existuser = false;
  loggedIn;

    constructor(
        private _formBuilder: FormBuilder,
        private _adminService: AdminServices,
        private _componentService: ComponentService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _headerComp : HeaderComponent
    ){
        this.signupform = _formBuilder.group({
            fullname: ['', Validators.required],
            username: ['', Validators.required],
            //email: ['', BasicValidator.emailValidation],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    ngOnInit() {
        let loggedInCheck = localStorage.getItem('username');
        if(loggedInCheck !== null) {
            this._router.navigate(['user/', loggedInCheck],  { queryParams: { loggedIn: 'true'}});
        }
        else { 
            this.show();
        } 
    }
    show() {
        this._adminService.getAdmins().subscribe(
        res =>  this.admins = res 
        );
    }
    signup() {
        this.loggedIn = false;
        if(!this.existuser) {
            var res = this._adminService.postUser(this.signUp);
            res.subscribe(
                x=>{
                   this.loggedIn = !this.loggedIn;

                    //handling local storage
                    let localStorageVal = localStorage.getItem('username');
                    localStorageVal !== null ? localStorage.removeItem('username') : '';
                    localStorage.setItem('username', this.signUp.username);

                    this._componentService.loggedUser({
                        username: this.signUp.username,
                        loggedIn: true
                    });
                    
                    window.location.href = '/';
                }
            )
        }
    }
    checkUserName(){
        this._adminService.getUser(this.signUp.username).subscribe(
            res =>  { this.user = res },
            err=> {},
            ()=>{
                if(this.user == null) {
                  this.existuser = false;
                }
                else {
                    this.existuser = true;
                }
            }
        );
    }
}