import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { Project } from "../../project/common/types";
import { DocumentService } from "../common/document.service";
import { DialogComponent } from "../../common/dialog/dialog.component";

import { Document } from "../common/types";

@Component({
  selector: 'document-create',
  templateUrl: './document-create.component.html'
})

export class DocumentCreateComponent implements OnInit {
  project: Project;
  document: Document = new Document();
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private dService:DocumentService) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.dService.create({
      projectId: this.project.id,
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

