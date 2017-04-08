import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session } from "../../user/common/types";
import { Project } from "./types";

import { RestService } from "../../common/rest.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class ProjectService {
  
    constructor (private router: Router, private http:Http, private restService: RestService, private uService: UserService) {

    }

    checkUnauthorized(err) {
      if (err.status == 401) {
        this.uService.logout();
        this.router.navigate(['/login']);
      }
      return err;
    }

    get(id: number): Promise<Project> {
      return this.http.get(this.restService.getServerPath() + '/Projects/'+id,
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Project;
          })
          .catch(err => { 
            console.log ("Project getById failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
    getAll(): Promise<Project[]> {
      return this.http.get(this.restService.getServerPath() + '/Projects',
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Project[];
          })
          .catch(err => { 
            console.log ("Project getAll failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    create(d: any) : Promise<Project> {
      return this.http.post(this.restService.getServerPath() + '/Projects', JSON.stringify(d),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Project;
          })
          .catch(err => { 
            console.log ("Create Project failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }

    update(p: any): Promise<Project> {
      return this.http.patch(this.restService.getServerPath() + '/Projects/'+p.id,
                             JSON.stringify(p),
                           {headers: this.restService.createHeaders()})
          .toPromise()
          .then( res => {
            var aux = res.json();
            return aux as Project;
          })
          .catch(err => { 
            console.log ("Update Project failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });

    }

    delete(d: Project): Promise<boolean> {
      return this.http.delete(this.restService.getServerPath() + '/Projects/'+d.id,
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
            console.log ("Delete Project failed");
            this.checkUnauthorized(err);
            console.log(err);
            if (err.status == 401) {
            }
            return Promise.resolve();
          });
    }
}
