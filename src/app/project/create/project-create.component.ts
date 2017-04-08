import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { ProjectService } from "../common/project.service";
import { DialogComponent } from "../../common/dialog/dialog.component";

import { Project } from "../common/types";

@Component({
  selector: 'project-create',
  templateUrl: './project-create.component.html'
})

export class ProjectCreateComponent implements OnInit {
  project: Project = new Project();
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private pService:ProjectService) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.pService.create({
      code: this.tmp.code,
      title: this.tmp.title,
      description: this.tmp.desc
    })
    .then( p => {
      this.close.emit(p);
    });
  }

  cancel() {
    this.close.emit(null);
  }
}

