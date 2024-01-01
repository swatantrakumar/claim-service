import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-home-buyer',
  templateUrl: './home-buyer.component.html',
  styleUrls: ['./home-buyer.component.css']
})
export class HomeBuyerComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('buyerModel') public buyerModel!: ModalDirective;

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
    this.buyerModel.show();
  }
  close(){
    this.buyerModel.hide();
  }

}
