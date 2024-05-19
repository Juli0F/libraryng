import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Book, Reservation, ReservationRequestDto, Student } from 'src/models/models';
import { BookService } from 'src/service/book.service';
import { ReservationService } from 'src/service/reservation.service';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent implements OnInit, OnChanges {
  @Output() onCreated = new EventEmitter<boolean>();
  @Input() reservationToEdit!: any;
  editId!: number;
  students!: Student[];
  books !: Book[];
  student !: Student;

  statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Retornado', value: 'returned' },
    { label: 'Perdido', value: 'lost' }
  ];

  reservationForm : FormGroup;

  constructor(private reservationService: ReservationService,
    private studentService: StudentService,
    private bookService: BookService,
    private messageService: MessageService
  ) {
    this.reservationForm = new FormGroup({
      id: new FormControl('',Validators.required),
      reservationDate:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required),
      carnet:new FormControl('',Validators.required),
      bookCode:new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {
    this.reservationForm.reset({
      id: 0, 
      reservationDate: '',
      status: '',
      student: undefined
    });
    this.getStudentReservation();
    this.getAllBooks();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reservationToEdit'] && changes['reservationToEdit'].currentValue) {
      this.update();
    }
    
  }
  update(){
    if (this.reservationToEdit) {
      this.reservationForm.patchValue({
        id: this.reservationToEdit.id,
        reservationDate: this.reservationToEdit.reservationDate,//.toISOString().substring(0, 10), 
        returnDate: this.reservationToEdit.returnDate,//.toISOString().substring(0, 10),
        totalDue: this.reservationToEdit.totalDue
      });
      this.setCarnet();
      this.setBook();
      this.setStatus();
      this.editId = this.reservationToEdit.id;
      this.reservationForm.get('id')?.disable(); 
    } else {
      this.reservationForm.get('id')?.enable();
    }
  }

  onSubmit() {
    const formValue = this.reservationForm.getRawValue();
  
    
    const reservation: ReservationRequestDto = {
      id: formValue.id || 0, 
      reservationDate: new Date(formValue.reservationDate || new Date()),
      status: formValue.status.value || 'active', 
      carnet: formValue.carnet.carnet,
      bookCode: formValue.bookCode.code
    };
  
    if (this.reservationToEdit) {
      this.edit(reservation); 
    } else {
      this.create(reservation);
    }
  }
  create(reservation: Reservation) {
    this.reservationService.createReservation(reservation).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.reservationForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Prestamo guardado correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  
  edit(reservation: Reservation) {
    this.reservationService.updateReservation(this.editId, reservation).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.reservationForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Prestamo editado correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  getStudentReservation() {
    this.studentService.getAllStudents().subscribe({
      next: data => {
        this.students = data;
      },
      error: e => {
        this.messageService.add({severity:'error', summary:'Error', detail:e.error});
      }
    });
  }
  setCarnet(){
    const carnet = this.reservationToEdit?.carnet;
    const student = this.students.find(student => student.carnet === carnet);
    if (carnet && student ) {
      this.reservationForm.get('carnet')?.setValue(student);
    } else {
      this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'El carnet no existe o no es valido'});
    }
  }
  setBook(){
    const bookCode = this.reservationToEdit?.bookCode;
    const book = this.books.find(book => book.code == bookCode);
    if(bookCode && book){
      this.reservationForm.get('bookCode')?.setValue(book);
    }
  }
  setStatus(){
    const status = this.statusOptions.find(status => status.value == this.reservationToEdit.status);
    this.reservationForm.get('status')?.setValue(status);

  }
  getAllBooks(){
    this.bookService.getAllBooks().subscribe({
      next: data =>{
        this.books = data;

        this.books = this.books.map(book => ({
          ...book,
          displayLabel: `Codigo: ${book.code} - Titulo: ${book.title}`  
        }));
      },
      error:e => this.messageService.add({severity:'error', summary:'Error', detail:e.error})
    })
  }


}
