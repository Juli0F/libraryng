import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/models/models';
import { ReservationService } from 'src/service/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
  reservationList!: Reservation[];
  displayModal: boolean = false;
  editReservationItem: Reservation | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(data => {
      this.reservationList = data;
    });
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(() => this.loadReservations());
  }

  showDialog(reservation?: Reservation) {
    this.editReservationItem = reservation || null;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
    this.loadReservations();
  }

  closeModalAndReloadList() {
    this.displayModal = false;
    this.loadReservations();
  }
}
