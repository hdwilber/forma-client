import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { ProjectService } from "../common/project.service";
import { DialogComponent } from "../../common/dialog/dialog.component";

import { Project } from "../common/types";

@Component({
  selector: 'project-create',
  templateUrl: './project-update.component.html'
})

export class ProjectUpdateComponent implements OnInit {
  project: Project;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private pService:ProjectService) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
    //this.route.params.forEach((params: Params) => {
      //if (params['projectId'] !== undefined) {
        //this.pService.get(params['projectId'])
        //.then(q => {
          //this.project = q;
        //});
      //}
    //});
  }
  ngOnInit():void  {
    this.tmp.code = this.project.code;
    this.tmp.desc = this.project.description;
    this.tmp.title = this.project.title;
  }

  update() {
    var aux = Object();
    aux.id = this.project.id;
    if (this.tmp.code != "" || this.tmp.code != null) {
      aux.code = this.tmp.code;
    }
    if (this.tmp.title != "" || this.tmp.title != null) {
      aux.title= this.tmp.title;
    }
    if (this.tmp.desc!= "" || this.tmp.desc!= null) {
      aux.description = this.tmp.desc;
    }

    this.pService.update(
      aux
    )
    .then( p => {
      this.close.emit(p);
    });
  }

  cancel() {
    this.close.emit(null);
  }
}

