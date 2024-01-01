import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-operational-creditor',
  templateUrl: './operational-creditor.component.html',
  styleUrls: ['./operational-creditor.component.css']
})
export class OperationalCreditorComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('operationModel') public operationModel!: ModalDirective;

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
    this.operationModel.show();
  }
  close(){
    this.operationModel.hide();
  }

}
