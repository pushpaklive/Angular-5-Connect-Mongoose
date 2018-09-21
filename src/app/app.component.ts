import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

import { CommonService } from './common.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  repData;
  id;
  name;
  address;
  valButton = "Save";

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getUsers().subscribe(data => this.repData = data);
  }

  onSave(user) {
    user.mode = this.valButton;

    this.commonService.saveUser(user).subscribe(data => {
      alert("data.data**** : " + data);
      this.ngOnInit();
    }, err => {
      console.log("Error in calling this.commonService.saveUser() : err : ", err)
    });
  }

  edit(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valButton = "Update";
    //this.commonService.
  }

  delete(id) {
    this.commonService.deleteUser(id).subscribe(data => {
      alert(data.data);
      this.ngOnInit();
    }, err => console.log("error in deleting", err));
  }

}
