import {Injectable, Inject} from "@angular/core";
import {Headers, Response, Http} from "@angular/http";
import { Router } from "@angular/router";

import { Subject } from "rxjs/Subject"
import { Observable } from "rxjs"

import "rxjs/add/operator/toPromise";
import { User, Session} from "./types";
import { RestService } from "../../common/rest.service";


@Injectable()
export class UserService {
    session: Session;
    http: Http;
    restService: RestService;
    user: User;
    
    loginSource = new Subject<Session>();
    logoutSource = new Subject<boolean>();

    constructor (private router:Router, ahttp:Http, restService: RestService) {
        this.http = ahttp;
        this.user = null;
        this.restService = restService;
        //if (this.session !== undefined && this.session != null){
            //this.restService.setSession(this.session);
        //}


        this.login("hd.wilber@gmail.com", "asdf")
        .then (s => {
          if (s) {
            this.restService.session = s;
          }
        });
    }

    login (email:string, password:string): Promise<Session> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('Authorization', 'Basic ' +window.btoa(email+ ':' + password));
      
      return this.http.post(this.restService.getServerPath()+'/People/login', JSON.stringify ({email: email, password: password}), {headers: headers})
          .toPromise()
          .then (response => {
              if(response.status == 200) {
                var aux = response.json();
                this.session = aux as Session;
                this.restService.setSession(this.session);
                this.loginSource.next(this.session);
              }
              return this.session as Session} )
          .catch (this.loginError)
    }

    clearMessage(){
      this.loginSource.next();
    }
    whenLogin(): Observable<any> {
      return this.loginSource.asObservable();
    }

    whenLogout(): Observable<boolean> {
      return this.logoutSource.asObservable();
    }

    private getUserError(error: any) : Promise<any> {
        console.log ("Get User ERROR");
        console.error('An error occurred', error); // for demo purposes only
        if (error.status == 403) {
          this.logout();
          this.router.navigate(['/login']);
        }
        return Promise.resolve();
    }

    logout(): any{
      console.log ("Logged out");
      this.router.navigate(['/']);
      this.user = null;
      this.session = null;
      this.logoutSource.next(true);
      return "";
    }

    getUser(): Promise<User> {
      if (this.user  == null) {
        if (this.session != null) {
          return this.http.get( this.restService.getServerPath() + '/users/' + this.session.userId, {headers: this.restService.createHeaders()})
              .toPromise()
              .then (response => {
                  return response.json().data as User 
              })
            .catch ( this.getUserError)
        }
      } else {
        return Promise.resolve(new User());
      }
    }

    register (u:User): Promise<User> {
      var myheaders = new Headers();
      myheaders.append('Content-Type', 'application/json');

        return this.http.post( this.restService.getServerPath() + "/register", JSON.stringify(u), {headers: myheaders})
          .toPromise()
          .then (response => response.json().data as User )
          .catch (this.loginError)
    }

    private loginError (error: any) : Promise<any> {
        console.log ("Login ERROR");
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
