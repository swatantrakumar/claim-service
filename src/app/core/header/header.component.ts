import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  project_module:any='';
  constructor(
    private storageService:StorageService
  ) {
    this.project_module = this.storageService.getProjectModule();
  }

  ngOnInit() {
  }

}
