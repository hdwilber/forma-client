import { ViewChild, Component, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { DocumentService } from "../common/document.service"
import { ProjectService } from "../../project/common/project.service"
import { Document } from "../common/types";
import { Project } from "../../project/common/types";
import { DocumentCreateComponent  } from "../create/document-create.component";
import { DocumentUpdateComponent  } from "../update/document-update.component";
import { DialogDirective } from "../../common/dialog/dialog.directive";

import { Location } from '@angular/common';


@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html'
})


export class DocumentListComponent implements OnInit {
  documents: Document[];
  project: Project;
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
    
  constructor (private _location: Location, private pService: ProjectService, private route: ActivatedRoute, private router: Router, private dService :DocumentService) {
    this.documents = [];
  }

  ngOnInit():void  {
    this.route.params.forEach((params: Params) => {
      if (params['projectId'] !== undefined) {
        this.pService.get(params['projectId'])
        .then(p => {
          this.project = p;
        });
        this.dService.getAll(params['projectId'])
        .then(q => {
          this.documents = q;
        });
      }
    });
  }
  edit(p: Document): void {
    this.router.navigate(['/documents/'+ p.id+'/forms']);
  }



  create() {
    let dialogComponentRef = this.dialogAnchor.createDialog(DocumentCreateComponent);
    
    dialogComponentRef.instance.project = this.project;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.documents.push(res);
      }
      dialogComponentRef.destroy();
    });
  }
  updateInfo(p: Document) {
    let dialogComponentRef = this.dialogAnchor.createDialog(DocumentUpdateComponent);
    dialogComponentRef.instance.document = p;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.documents[this.documents.indexOf(p)] = res;
      }
      dialogComponentRef.destroy();
    });
  }

  delete(p: Document) {
    console.log("TDeleing");
    if (p) {
      this.dService.delete(p)
      .then(res => {
        console.log(res);
        if (res) {
          this.documents.splice(this.documents.indexOf(p),1);
        }
      });
    }
  }

  goToBack() {
    this._location.back();
  }
}


