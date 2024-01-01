import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-others-model',
  templateUrl: './others-model.component.html',
  styleUrls: ['./others-model.component.css']
})
export class OthersModelComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('othersModel') public othersModel!: ModalDirective;

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
    this.othersModel.show();
  }
  close(){
    this.othersModel.hide();
  }

}
