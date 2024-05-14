import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Book, Loan, LoanRequest, LoanResponseDto, Student } from 'src/models/models';
import { BookService } from 'src/service/book.service';
import { LoanService } from 'src/service/loan.service';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit, OnChanges {

  @Output() onCreated = new EventEmitter<boolean>();
  @Input() loanToEdit!: any;
  editId!: number;
  students!: Student[];
  books !: Book[];
  student !: Student;

  statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Retornado', value: 'returned' },
    { label: 'Perdido', value: 'lost' }
  ];

  loanForm : FormGroup;

  constructor(private loanService: LoanService,
    private studentService: StudentService,
    private bookService: BookService,
    private messageService: MessageService
  ) {
    this.loanForm = new FormGroup({
      id: new FormControl('',Validators.required),
      loanDate:new FormControl('',Validators.required),
      returnDate:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required),
      totalDue:new FormControl('',Validators.required),
      carnet:new FormControl('',Validators.required),
      bookCode:new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {
    this.loanForm.reset({
      id: 0, 
      loanDate: '',
      returnDate: '',
      status: '',
      totalDue: 0,
      student: undefined
    });
    this.getStudentLoan();
    this.getAllBooks();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loanToEdit'] && changes['loanToEdit'].currentValue) {
      this.update();
    }
    
  }
  update(){
    if (this.loanToEdit) {
      this.loanForm.patchValue({
        id: this.loanToEdit.id,
        loanDate: this.loanToEdit.loanDate,//.toISOString().substring(0, 10), 
        returnDate: this.loanToEdit.returnDate,//.toISOString().substring(0, 10),
        totalDue: this.loanToEdit.totalDue
      });
      this.setCarnet();
      this.setBook();
      this.setStatus();
      this.editId = this.loanToEdit.id;
      this.loanForm.get('id')?.disable(); 
    } else {
      this.loanForm.get('id')?.enable();
    }
  }

  onSubmit() {
    const formValue = this.loanForm.getRawValue();
  
    
    const loan: LoanRequest = {
      id: formValue.id || 0, 
      loanDate: new Date(formValue.loanDate || new Date()),
      returnDate: new Date(formValue.returnDate || new Date()),
      status: formValue.status.value || 'active', 
      totalDue: formValue.totalDue || 0,
      carnet: formValue.carnet.carnet,
      bookCode: formValue.bookCode.code
    };
  
    if (this.loanToEdit) {
      this.edit(loan); 
    } else {
      this.create(loan);
    }
  }
  create(loan: Loan) {
    this.loanService.createLoan(loan).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.loanForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Prestamo guardado correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  
  edit(loan: Loan) {
    this.loanService.updateLoan(this.editId, loan).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.loanForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Prestamo editado correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  getStudentLoan() {
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
    const carnet = this.loanToEdit?.carnet;
    const student = this.students.find(student => student.carnet === carnet);
    if (carnet && student ) {
      this.loanForm.get('carnet')?.setValue(student);
    } else {
      this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'El carnet no existe o no es valido'});
    }
  }
  setBook(){
    const bookCode = this.loanToEdit?.bookCode;
    const book = this.books.find(book => book.code == bookCode);
    if(bookCode && book){
      this.loanForm.get('bookCode')?.setValue(book);
    }
  }
  setStatus(){
    const status = this.statusOptions.find(status => status.value == this.loanToEdit.status);
    this.loanForm.get('status')?.setValue(status);

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
