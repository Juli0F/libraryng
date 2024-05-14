import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Career } from 'src/models/models';
import { CareerService } from 'src/service/career.service';

@Component({
  selector: 'app-view-career',
  templateUrl: './view-career.component.html',
  styleUrls: ['./view-career.component.css']
})
export class ViewCareerComponent implements OnInit {

  careerList !: Career[]
  totalRecords = 10
  displayModal: boolean = false;
  editCareerItem: Career | null = null;
  constructor(private careerService : CareerService,
    private messageService : MessageService
  ) { }
  ngOnInit(): void {
    this.getAllCareer();
  }
  getAllCareer() {
    this.careerService.getAllCareer().subscribe(data => {
      this.careerList = data;
    });
  }
  softDelete(code: string){
    this.careerService.softDeleteCareer(code).subscribe({
      next: () => {
        this.getAllCareer();
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    })
  }
  showDialog(careerToEdit?: Career) {
    this.editCareerItem = careerToEdit || null;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
  closeModalAndReloadList() {
    this.editCareerItem = null; 
    this.closeModal();
    this.getAllCareer();
  }
}
