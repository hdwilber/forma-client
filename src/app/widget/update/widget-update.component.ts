import { EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { Document } from "../../document/common/types";
import { DocumentService } from "../../document/common/document.service";
import { FormService } from "../../form/common/form.service";
import { WidgetService } from "../common/widget.service";

import { Widget } from "../common/types";
import { Form } from "../../form/common/types";

@Component({
  selector: 'widget-update',
  templateUrl: './widget-update.component.html'
})

export class WidgetUpdateComponent implements OnInit {
  widget: Widget;
  form: Form;
  tmp:any;
  close = new EventEmitter();

  constructor (private router: Router, private wService:WidgetService ) {
  }

  ngOnInit():void  {
    var _this = this;
    var auxType = this.wService.types.input.find(function (e) { return e.code == _this.widget.type });
    var auxSubType = auxType.subTypes.find(function (e) { return e.code == _this.widget.subType });

    this.tmp = { 
      code: this.widget.code,
      label: this.widget.label,
      type: auxType,
      subType: auxSubType
    };
  }

  update() {
    this.wService.update({
      id: this.widget.id,
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

