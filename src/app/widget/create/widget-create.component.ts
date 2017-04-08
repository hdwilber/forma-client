import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { Document } from "../../document/common/types";
import { DocumentService } from "../../document/common/document.service";
import { FormService } from "../../form/common/form.service";
import { WidgetService } from "../common/widget.service";

import { Form } from "../../form/common/types";
import { Widget } from "../common/types";

@Component({
  selector: 'widget-create',
  templateUrl: './widget-create.component.html'
})

export class WidgetCreateComponent implements OnInit {
  form: Form;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private wService:WidgetService ) {
    this.tmp = { 
      code: null,
      label: null,
      type: null,
      subType: null
    };
  }
  ngOnInit():void  {
  }

  create() {
    this.wService.create({
      formId: this.form.id,
      code: this.tmp.code,
      label: this.tmp.label,
      type: this.tmp.type.code,
      subType: this.tmp.subType.code
    })
    .then( p => {
      this.close.emit(p);
    });
  }

  cancel() {
    this.close.emit(null);
  }
}

