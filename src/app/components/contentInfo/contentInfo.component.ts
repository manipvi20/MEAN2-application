import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../services/info.service';

@Component({
  selector: 'content-info',
  templateUrl: 'contentInfo.component.html'
})
export class ContentInfoComponent implements OnInit {
    admins : any[];
    constructor(private _adminService: AdminServices){}

    show() {
        this._adminService.getAdmins().subscribe(
        res =>  this.admins = res 
        );
    }
  ngOnInit() {
    this.show();
  }
}
