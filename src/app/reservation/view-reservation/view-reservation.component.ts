import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Reservation, ReservationRequestDto } from 'src/models/models';
import { ReservationService } from 'src/service/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
  reservationList!: Reservation[];
  totalRecords = 10;
  displayModal: boolean = false;
  editReservationItem: ReservationRequestDto | null = null;

  constructor(private reservationService: ReservationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservationList = data;
    });
  }

  softDelete(id: number) {
    this.reservationService.softDeleteReservation(id).subscribe({
      next: () => {
        this.getAllReservations();
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }

  showDialog(reservationToEdit?: ReservationRequestDto) {
    this.editReservationItem = reservationToEdit || null ;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  closeModalAndReloadList() {
    this.editReservationItem = null;
    this.closeModal();
    this.getAllReservations();
  }
}
