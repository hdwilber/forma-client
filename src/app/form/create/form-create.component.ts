import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { Document } from "../../document/common/types";
import { DocumentService } from "../../document/common/document.service";
import { FormService } from "../common/form.service";
import { DialogComponent } from "../../common/dialog/dialog.component";

import { Form } from "../common/types";

@Component({
  selector: 'form-create',
  templateUrl: './form-create.component.html'
})

export class FormCreateComponent implements OnInit {
  document: Document;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private fService:FormService ) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.fService.create({
      documentId: this.document.id,
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

