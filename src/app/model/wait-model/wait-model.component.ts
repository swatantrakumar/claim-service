import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-wait-model',
  templateUrl: './wait-model.component.html',
  styleUrls: ['./wait-model.component.css']
})
export class WaitModelComponent implements OnInit {

  @Input() id: string ='';
  @ViewChild('waitModel') public waitModel!: ModalDirective;

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
  close(){
    this.waitModel.hide();
  }
  showModal(){
    this.waitModel.show();
  }

}
