import { ViewChild, Component, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { WidgetService } from "../common/widget.service"
import { ProjectService } from "../../project/common/project.service"
import { DocumentService } from "../../document/common/document.service"
import { FormService } from "../../form/common/form.service"
import { Widget } from "../common/types";
import { Document } from "../../document/common/types";
import { Project } from "../../project/common/types";
import { Form } from "../../form/common/types";
import { WidgetCreateComponent } from "../create/widget-create.component";
import { WidgetUpdateComponent } from "../update/widget-update.component";

import { DialogDirective } from "../../common/dialog/dialog.directive";

@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html'
})


export class WidgetListComponent implements OnInit {
  widgets: Widget[];
  form: Form;
  document: Document;
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
    
  constructor (private route: ActivatedRoute, private router: Router, private fService :FormService, private wService: WidgetService  ) {
    this.widgets = [];
  }

  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['formId'] !== undefined) {
        this.fService.get(params['formId'])
        .then(f => {
          this.form = f;
        });
        this.wService.getFromForm(params['formId'])
        .then(q => {
          this.widgets = q;
        });
      }
    });
  }
  edit(p: Document): void {
  }

  create() {
    let dialogComponentRef = this.dialogAnchor.createDialog(WidgetCreateComponent);
    dialogComponentRef.instance.form = this.form;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.widgets.push(res);
      }
      dialogComponentRef.destroy();
    });
  }

  updateInfo(w: Widget) {
    let dialogComponentRef = this.dialogAnchor.createDialog(WidgetUpdateComponent);
    dialogComponentRef.instance.widget = w;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        console.log("RES");
        console.log(res);
        this.widgets[this.widgets.indexOf(w)] = res;
      }
      dialogComponentRef.destroy();
    });
  }

  delete(w: Widget ) {
    if (w) {
      this.wService.delete(w)
      .then(res => {
        console.log(res);
        if (res) {
          this.widgets.splice(this.widgets.indexOf(w),1);
        }
      });
    }
  }
}

