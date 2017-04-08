import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session } from "../user/common/types";
import { Enode } from "./types";
import { RestService } from "./rest.service";
import { UserService } from "../user/common/user.service";

@Injectable()
export class EnodeService {
  
    constructor (private router: Router, private http:Http, private restService: RestService, private uService: UserService) {

    }

    checkUnauthorized(err) {
      if (err.status == 401) {
        this.uService.logout();
        this.router.navigate(['/login']);
      }

      return err;
    }

    get(id: string): Promise<Enode> {
      return this.http.get(this.restService.getServerPath() + '/Enodes/'+id,
                           {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Enode;
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
    getAll(id: string): Promise<Enode[]> {
      return this.http.get(this.restService.getServerPath() + '/Enodes/'+id+'/list',
                           {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Enode[];
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

    create(d: any) : Promise<Enode> {
      return this.http.post(this.restService.getServerPath() + '/Enodes', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Enode;
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

    update(p: any): Promise<Enode> {
      return this.http.patch(this.restService.getServerPath() + '/Enodes/'+p.id,
                             JSON.stringify(p),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Enode;
          })
          .catch(err => { 
            console.log ("Update Enode failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });

    }

    delete(e: Enode): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/Enodes/'+e.id,
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
            console.log ("Delete Enode failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
