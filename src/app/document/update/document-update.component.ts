import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { DocumentService } from "../common/document.service";
import { DialogComponent } from "../../common/dialog/dialog.component";

import { Document } from "../common/types";

@Component({
  selector: 'document-create',
  templateUrl: './document-update.component.html'
})

export class DocumentUpdateComponent implements OnInit {
  document: Document;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private pService:DocumentService) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
    //this.route.params.forEach((params: Params) => {
      //if (params['documentId'] !== undefined) {
        //this.pService.get(params['documentId'])
        //.then(q => {
          //this.document = q;
        //});
      //}
    //});
  }
  ngOnInit():void  {
    this.tmp.code = this.document.code;
    this.tmp.desc = this.document.description;
    this.tmp.title = this.document.title;
  }

  update() {
    var aux = Object();
    aux.id = this.document.id;
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

