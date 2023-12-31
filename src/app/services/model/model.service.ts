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
}
