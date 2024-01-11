import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-preview-model',
  templateUrl: './preview-model.component.html',
  styleUrls: ['./preview-model.component.css']
})
export class PreviewModelComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';

  @ViewChild('previewModel') public previewModel!: ModalDirective;

  constructor(
    private modelService:ModelService,
  ) { }

  ngOnInit() {
    let modal = this;
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }
  showModal(){
    this.previewModel.show();
  }
  close(){
    this.previewModel.show();
  }

}
