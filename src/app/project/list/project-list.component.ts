import { ViewChild, Component, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { Session, User } from "../../user/common/types"
import { ProjectService } from "../common/project.service"
import { Project } from "../common/types";
import { ProjectCreateComponent  } from "../create/project-create.component";
import { ProjectUpdateComponent  } from "../update/project-update.component";
import { DialogDirective } from "../../common/dialog/dialog.directive";
import { DialogComponent } from "../../common/dialog/dialog.component";

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html'
})


export class ProjectListComponent extends DialogComponent implements OnInit {
  projects : Project[];
  @ViewChild(DialogDirective) dialogAnchor: DialogDirective;
    
  constructor (private router: Router, private pService :ProjectService) {
    super();
    this.projects = [];
  }

  ngOnInit():void  {
    this.pService.getAll() 
    .then(ps => {
      this.projects = ps;
    });
  }
  edit(p: Project): void {
    this.router.navigate(['/projects/'+p.id+'/documents']);
  }



  create() {
    let dialogComponentRef = this.dialogAnchor.createDialog(ProjectCreateComponent);
    
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.projects.push(res);
      }
      dialogComponentRef.destroy();
    });
  }
  updateInfo(p: Project) {
    let dialogComponentRef = this.dialogAnchor.createDialog(ProjectUpdateComponent);
    dialogComponentRef.instance.project = p;
    dialogComponentRef.instance.close.subscribe(res => {
      if (res) {
        this.projects[this.projects.indexOf(p)] = res;
      }
      dialogComponentRef.destroy();
    });
  }

  delete(p: Project) {
    console.log("TDeleing");
    if (p) {
      this.pService.delete(p)
      .then(res => {
        console.log(res);
        if (res) {
          this.projects.splice(this.projects.indexOf(p),1);
        }
      });
    }
  }
}

