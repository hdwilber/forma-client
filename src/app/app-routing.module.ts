import { NgModule }             from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from "@angular/forms";

// Components
import { AppComponent }  from './app.component';
import { UserLoginComponent }  from './user/login/user-login.component';
import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './project/list/project-list.component';
import { DocumentListComponent } from './document/list/document-list.component';
import { FormListComponent } from './form/list/form-list.component';

import { WidgetListComponent } from './widget/list/widget-list.component';

import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from "@angular/http";

const routes: Routes = [
    { path: '', redirectTo: '/projects', pathMatch: 'full' },
    { path: 'login', component: UserLoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/:projectId/documents', component: DocumentListComponent},
    { path: 'documents/:documentId/forms', component: FormListComponent},
    { path: 'forms/:formId/widgets', component: WidgetListComponent},
];


@NgModule({
    imports: [ 
    RouterModule.forRoot(routes, { useHash: true })  // .../#/crisis-center/
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
