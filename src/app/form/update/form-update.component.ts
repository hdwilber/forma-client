import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"

import { Document } from "../../document/common/types";
import { Form } from "../common/types";
import { DocumentService } from "../../document/common/document.service";
import { FormService } from "../common/form.service";

@Component({
  selector: 'form-update',
  templateUrl: './form-update.component.html'
})

export class FormUpdateComponent implements OnInit {
  form: Form;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private fService: FormService) {
    this.tmp = { 
      code: null,
      title: null,
      desc: null
    };
  }
  ngOnInit():void  {
    this.tmp.code = this.form.code;
    this.tmp.desc = this.form.description;
    this.tmp.title = this.form.title;
  }

  update() {
    var aux = Object();
    aux.id = this.form.id;
    if (this.tmp.code != "" || this.tmp.code != null) {
      aux.code = this.tmp.code;
    }
    if (this.tmp.title != "" || this.tmp.title != null) {
      aux.title= this.tmp.title;
    }

    this.fService.update(
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

