import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session } from "../../user/common/types";
import { Form } from "./types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class FormService {

  constructor (private router: Router, private http:Http, private restService: RestService, private uService: UserService) {

  }

  checkUnauthorized(err) {
    if (err.status == 401) {
      this.uService.logout();
      this.router.navigate(['/login']);
    }
    return err;
  }


  get(id: string): Promise<Form> {
    return this.http.get(this.restService.getServerPath() + '/Forms/'+id,
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Form;
        })
        .catch(err => { 
          console.log ("Form getById failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
  }
  getAll(did: string): Promise<Form[]> {
    return this.http.get(this.restService.getServerPath() + '/Documents/'+did+'/forms',
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Form[];
        })
        .catch(err => { 
          console.log ("Form getAll failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
  }

  create(d: any) : Promise<Form> {
    return this.http.post(this.restService.getServerPath() + '/Forms', JSON.stringify(d),
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Form;
        })
        .catch(err => { 
          console.log ("Create Form failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
  }

  update(p: Form): Promise<Form> {
    return this.http.patch(this.restService.getServerPath() + '/Forms/'+p.id,
                           JSON.stringify(p),
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Form;
        })
        .catch(err => { 
          console.log ("Update Form failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });

  }

  delete(f: Form): Promise<boolean> {
    return this.http.delete(this.restService.getServerPath() + '/Forms/'+f.id,
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
            console.log(res);
            if (res.status == 200) {
              return true as boolean;
            } else {
              return false as boolean;
            }
        })
        .catch(err => { 
          console.log ("Delete Form failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
  }
}
