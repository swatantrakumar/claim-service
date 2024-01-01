import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-home-buyer-review',
  templateUrl: './home-buyer-review.component.html',
  styleUrls: ['./home-buyer-review.component.css']
})
export class HomeBuyerReviewComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('buyerReviewModel') public buyerReviewModel!: ModalDirective;

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
    this.buyerReviewModel.show();
  }
  close(){
    this.buyerReviewModel.hide();
  }

}
