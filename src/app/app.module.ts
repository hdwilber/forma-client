import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";

import { UserService } from "./user/common/user.service";
import { RestService } from "./common/rest.service";

import { AppComponent } from './app.component';
import { UserLoginComponent }  from './user/login/user-login.component';
import { UserRegisterComponent }  from './user/register/user-register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { EnodeService } from './common/enode.service';

import { ProjectService } from './project/common/project.service';
import { ProjectCreateComponent } from './project/create/project-create.component';
import { ProjectListComponent } from './project/list/project-list.component';
import { ProjectUpdateComponent } from './project/update/project-update.component';

import { DocumentService } from './document/common/document.service';
import { DocumentCreateComponent } from './document/create/document-create.component';
import { DocumentListComponent } from './document/list/document-list.component';
import { DocumentUpdateComponent } from './document/update/document-update.component';

import { FormService } from './form/common/form.service';
import { FormCreateComponent } from './form/create/form-create.component';
import { FormListComponent } from './form/list/form-list.component';
import { FormUpdateComponent } from './form/update/form-update.component';

import { WidgetService } from './widget/common/widget.service';
import { WidgetCreateComponent } from './widget/create/widget-create.component';
import { WidgetListComponent } from './widget/list/widget-list.component';
import { WidgetUpdateComponent } from './widget/update/widget-update.component';

import { DialogDirective } from './common/dialog/dialog.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HeaderComponent,
    HomeComponent,

    ProjectCreateComponent,
    ProjectListComponent,
    ProjectUpdateComponent, 

    DocumentCreateComponent,
    DocumentListComponent,
    DocumentUpdateComponent, 

    FormCreateComponent,
    FormListComponent,
    FormUpdateComponent, 
    
    WidgetCreateComponent,
    WidgetListComponent,
    WidgetUpdateComponent, 

    DialogDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    RestService,
    UserService,
    ProjectService,
    DocumentService,
    EnodeService,
    FormService,
    WidgetService
  ],
  entryComponents: [
    ProjectCreateComponent, 
    ProjectUpdateComponent, 

    DocumentCreateComponent, 
    DocumentUpdateComponent,

    FormCreateComponent, 
    FormUpdateComponent,
    
    WidgetCreateComponent, 
    WidgetUpdateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
