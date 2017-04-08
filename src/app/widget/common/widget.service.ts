import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";
import { User, Session } from "../../user/common/types";
import { Widget } from "./types";

import { RestService } from "../../common/rest.service";
import { EnodeService } from "../../common/enode.service";
import { UserService } from "../../user/common/user.service";

@Injectable()
export class WidgetService {
  types: any;

  constructor (private router: Router, private http:Http, private restService: RestService, private uService: UserService, private eService: EnodeService) {

    this.getTypes()
    .then(res => {
      this.types = res;
    });

  }

  checkUnauthorized(err) {
    if (err.status == 401) {
      this.uService.logout();
      this.router.navigate(['/login']);
    }
    return err;
  }

  
  getTypes(): Promise<any[]> {
    return this.http.get(this.restService.getServerPath() + '/Widgets/types', {headers: this.restService.createHeaders()})
      .toPromise()
      .then( res => {
        var aux = res.json();
        return aux as any[];
      })
      .catch(err => { 
        console.log ("Widget types failed");
        this.checkUnauthorized(err);
        console.log(err);
        if (err.status == 401) {
        }
        return Promise.resolve();
      });
  }

  get(id: number): Promise<Widget> {
    return this.http.get(this.restService.getServerPath() + '/Widgets/'+id,
                         {headers: this.restService.createHeaders()})
      .toPromise()
      .then( res => {
        var aux = res.json();
        return aux as Widget;
      })
      .catch(err => { 
        console.log ("Widget getById failed");
        this.checkUnauthorized(err);
        console.log(err);
        if (err.status == 401) {
        }
        return Promise.resolve();
      });
  }

  getFromForm(fid): Promise<Widget[]> {
    return this.http.get(this.restService.getServerPath() + '/Forms/'+fid + '/widgets',
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Widget[];
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
  getAll(pid): Promise<Widget[]> {
    return this.http.get(this.restService.getServerPath() + '/Widgets/'+pid + '/list',
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Widget[];
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

  create(d) : Promise<Widget> {
    return this.http.post(this.restService.getServerPath() + '/Widgets', JSON.stringify(d),
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Widget;
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

  update(p: any): Promise<Widget> {
    return this.http.patch(this.restService.getServerPath() + '/Widgets/'+p.id,
                           JSON.stringify(p),
                         {headers: this.restService.createHeaders()})
        .toPromise()
        .then( res => {
          var aux = res.json();
          return aux as Widget;
        })
        .catch(err => { 
          console.log ("Update Widget failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });

  }

  delete(f: Widget): Promise<boolean> {
    return this.http.delete(this.restService.getServerPath() + '/Widgets/'+f.id,
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
          console.log ("Delete Widget failed");
          this.checkUnauthorized(err);
          console.log(err);
          if (err.status == 401) {
          }
          return Promise.resolve();
        });
  }
}
