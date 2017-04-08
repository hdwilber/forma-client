import {Type, Component, Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef} from '@angular/core';
import {ViewContainerRef} from '@angular/core';

@Directive({ 
  selector: '[dialog-anchor]'
})
export class DialogDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    createDialog(dialogComponent:Type<any>) : ComponentRef<any> {
        this.viewContainer.clear();

        let dialogComponentFactory = 
          this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        return dialogComponentRef;
    }
}
