import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SignupComponent } from '../signup/signup.component';

import { PostReply, NewPost } from '../../interfaces/user';
import { AdminServices } from '../../services/info.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [HeaderComponent]
})
export class HomeComponent implements OnInit {
  posts: any [];
  postReply = new PostReply();
  newPost = new NewPost();
  loggedInCheck;
  postnewcomment:FormGroup;
  newReply: FormGroup;
  userDetails: any;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _adminService: AdminServices,
        private _headerComp : HeaderComponent,
        private elRef:ElementRef) {

        this.postnewcomment = _formBuilder.group({
            post: ['',  Validators.minLength]
        });

        this.newReply = _formBuilder.group({
          comment: ['',  Validators.minLength]
        });

        }
    ngOnInit() {
      this._headerComp.ngOnInit();
      this.loggedInCheck = localStorage.getItem('username');
      let activateParam = this._activatedRoute.snapshot.params["username"];
      activateParam != this.loggedInCheck ? this._router.navigate(['not-found']) : '';
      this.loadPosts();
    }
    loadPosts() {
      
      this._adminService.getAllPosts().subscribe(
        res =>  {
          this.posts = res.reverse();
         }
      );
    }
    commentForPost(post, e){
      this.postReply = <any>{
        username: this.loggedInCheck,
        reply: this.newReply.value.comment
      }
      this.postReply.username = this.loggedInCheck;
      post.replies.unshift(this.postReply);
      this._adminService.addNewReply(post._id, this.postReply).subscribe(
        res => { this.postReply = new PostReply() },
        err=>{},
        ()=>{
          this.newReply.reset()
        }
      )
    }

    postNewComment() {
      this.newPost.username = this.loggedInCheck;
      this.newPost.replies = [];
      var dummyPosts = { 
        posts: this.newPost,
        profile_img: this._headerComp.userDetails.profile_img
       };
     // this.posts.unshift(dummyPosts);
     if(this.newPost.post != undefined) {
      this._adminService.postNewComment(this.newPost).subscribe(
        res=>{this.newPost = new NewPost() 
          //this.loadPosts()
        },
        err=> { 
          if(err)
            return;
        
      },
        ()=> {
          this.posts.unshift(dummyPosts);}
      );
     }
    }


    toggle(e, i) {
      var userActivityEle = this.elRef.nativeElement.querySelector('.user_activites-'+i);
      if(userActivityEle.classList.contains('hidden')){
        userActivityEle.classList.remove('hidden');
      }
      else {
        userActivityEle.classList.add('hidden');
      }
    }

}
