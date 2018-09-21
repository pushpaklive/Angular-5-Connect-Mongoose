import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  saveUser(user){
    return this.http.post("http://localhost:8080/api/SaveUser/", user)
                    .map((res : Response) => res.json());
  }

  getUsers(){
    return this.http.get("http://localhost:8080/api/Users/")
                    .map((res : Response) => res.json());
  }

  deleteUser(id){
    return this.http.post("http://localhost:8080/api/deleteUser/", {'id': id})
                    .map((res : Response) => res.json());
  }

}
