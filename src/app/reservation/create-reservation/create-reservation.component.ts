import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Reservation } from 'src/models/models';
import { ReservationService } from 'src/service/reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent implements OnInit {
  @Output() onCreated = new EventEmitter<boolean>();
  @Input() reservationToEdit: Reservation | null = null;

  reservationForm = new FormGroup({
    id: new FormControl(0), // Inicializado como 0 para consistencia
    reservationDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(private reservationService: ReservationService,
    private messageService : MessageService
  ) {}

  ngOnInit(): void {
    if (this.reservationToEdit) {
      this.reservationForm.patchValue({
        id: this.reservationToEdit.id,
        reservationDate: this.reservationToEdit.reservationDate
          .toISOString()
          .substring(0, 10),
        status: this.reservationToEdit.status,
      });
    } else {
      this.reservationForm.reset({
        id: 0,
        reservationDate: '',
        status: '',
      });
    }
  }

  onSubmit() {
    const formValue = this.reservationForm.getRawValue(); 

    let updatedReservation = new Reservation();

    (updatedReservation.id = formValue.id ?? 0),
    (updatedReservation.reservationDate = new Date()),
    (updatedReservation.status = formValue.status ?? 'active');

    if(updatedReservation.id == 0){
      this.create(updatedReservation)
      return;
    }
    this.edit(updatedReservation);
  }
  create(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe({
      next: () => {
        this.onCreated.emit(true);
        this.messageService.add({severity:'success',summary:'success',detail:"Reservacion guardada correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      },
    });
  }
  edit(reservation: Reservation) {
    this.reservationService
      .updateReservation(reservation.id, reservation)
      .subscribe({
        next: () => {
          this.onCreated.emit(true);
          this.reservationForm.reset();
        },
        error: (err) => {
          console.error('Failed to update reservation', err);
        },
      });
  }
}
