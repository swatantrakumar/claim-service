import {Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  renderer: Renderer2;

  private modals: any[] = [];

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }

  add(modal: any) {
      this.modals.push(modal);
  }

  remove(id: string) {
      this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string,object:object) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.showModal(object);
  }
  close(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }
  addBackDrop(){
    const resizer = this.renderer.createElement("div");
    this.renderer.addClass(resizer, "modal-backdrop");
    this.renderer.addClass(resizer, "fade");
    this.renderer.addClass(resizer, "show");
    let body = document.getElementsByTagName('body')[0];
    this.renderer.appendChild(body,resizer);
  }
  removeBackdrop(){
    let body = document.getElementsByTagName('body')[0];
    let backDropElement = document.getElementsByClassName('modal-backdrop')[0];
    this.renderer.removeChild(body,backDropElement);
  }
  showModel(creditorModel:any){
    this.renderer.setStyle(creditorModel,'transition','display .15s linear');
    this.renderer.setStyle(creditorModel,'display','block');
    this.renderer.addClass(creditorModel, "show");
  }
  hideModel(model:any){
    this.renderer.removeStyle(model,'display');
    this.renderer.removeClass(model, "show");
  }
}
