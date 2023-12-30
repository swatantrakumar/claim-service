import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-creditor-details',
  templateUrl: './creditor-details.component.html',
  styleUrls: ['./creditor-details.component.css']
})
export class CreditorDetailsComponent implements OnInit {
  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('creditorModel') creditorModel: any;

  CreditorDetails:any;
  myShortName = 'mc';

  constructor(
    private modelService:ModelService
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

  closeModal(){
    //this.creditorModel.nativeElement.className = 'modal hide';
    const model = this.creditorModel.nativeElement;
    this.modelService.hideModel(model);
    this.modelService.removeBackdrop();
  }

  addOrder(){

  }
  showModal(){
    //this.renderer.addClass(this.creditorModel.nativeElement,'modal fade top show');
    this.modelService.addBackDrop();
    const model = this.creditorModel.nativeElement;
    this.modelService.showModel(model);
    this.CreditorDetails=JSON.parse(JSON.stringify(this.claim_form.creditors));

  }
}
