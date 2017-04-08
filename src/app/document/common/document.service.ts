import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session } from "../../user/common/types";
import { Document } from "./types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class DocumentService {
  
    constructor (private router: Router, private http:Http, private restService: RestService, private uService: UserService) {

    }

    checkUnauthorized(err) {
      if (err.status == 401) {
        this.uService.logout();
        this.router.navigate(['/login']);
      }
      return err;
    }

    get(id: number): Promise<Document> {
      return this.http.get(this.restService.getServerPath() + '/Documents/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Document;
          })
          .catch(err => { 
            console.log ("Document getById failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    getAll(pid): Promise<Document[]> {
      return this.http.get(this.restService.getServerPath() + '/Projects/'+pid+'/documents',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Document[];
          })
          .catch(err => { 
            console.log ("Document getAll failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    create(d: any) : Promise<Document> {
      return this.http.post(this.restService.getServerPath() + '/Documents', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Document;
          })
          .catch(err => { 
            console.log ("Create Document failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    update(p: any): Promise<Document> {
      return this.http.patch(this.restService.getServerPath() + '/Documents/'+p.id,
                             JSON.stringify(p),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Document;
          })
          .catch(err => { 
            console.log ("Update Document failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });

    }

    delete(d: Document): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/Documents/'+d.id,
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
            console.log ("Delete Document failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
