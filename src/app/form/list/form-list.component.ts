import { ViewChild, Component, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { FormService } from "../common/form.service"
import { ProjectService } from "../../project/common/project.service"
import { DocumentService } from "../../document/common/document.service"
import { Form } from "../common/types";
import { Document } from "../../document/common/types";
import { Project } from "../../project/common/types";
import { FormCreateComponent } from "../create/form-create.component";
import { FormUpdateComponent } from "../update/form-update.component";

import { DialogDirective } from "../../common/dialog/dialog.directive";

@Component({
  selector: 'form-list',
  templateUrl: './form-list.component.html'
})


export class FormListComponent implements OnInit {
  forms: Form[];
  document: Document;
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
    
  constructor (private _location: Location, private dService: DocumentService, private route: ActivatedRoute, private router: Router, private fService :FormService ) {
    this.forms = [];
  }

  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['documentId'] !== undefined) {
        this.dService.get(params['documentId'])
        .then(d => {
          this.document = d;
        });
        this.fService.getAll(params['documentId'])
        .then(q => {
          console.log(q);
          this.forms = q;
        });
      }
    });
  }
  edit(f: Form): void {
    this.router.navigate(['/forms/'+f.id + '/widgets']);
  }



  create() {
    let dialogComponentRef = this.dialogAnchor.createDialog(FormCreateComponent);
    
    dialogComponentRef.instance.document = this.document;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.forms.push(res);
      }
      dialogComponentRef.destroy();
    });
  }
  updateInfo(f: Form) {
    let dialogComponentRef = this.dialogAnchor.createDialog(FormUpdateComponent);
    dialogComponentRef.instance.form = f;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        console.log("RES");
        console.log(res);
        this.forms[this.forms.indexOf(f)]= res;
      }
      dialogComponentRef.destroy();
    });
  }

  delete(f: Form) {
    console.log("TDeleing");
    if (f) {
      this.fService.delete(f)
      .then(res => {
        console.log(res);
        if (res) {
          this.forms.splice(this.forms.indexOf(f),1);
        }
      });
    }
  }
  goToBack() {
    this._location.back();
  }
}

