import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Loan, LoanRequest, Student } from 'src/models/models';
import { LoanService } from 'src/service/loan.service';
import { StudentService } from 'src/service/student.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {

  @Output() onCreated = new EventEmitter<boolean>();
  @Input() loanToEdit!: LoanRequest | null;
  editId!: number;
  students!: Student[];
  student !: Student;

  loanForm = new FormGroup({
    id: new FormControl(0), 
    student: new FormControl(Student, Validators.required),
    loanDate: new FormControl('', Validators.required),
    returnDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    totalDue: new FormControl(0, [Validators.required, Validators.min(0)]) 
  });

  constructor(private loanService: LoanService,
    private studentService: StudentService,
    private messageService: MessageService
  ) {}

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loanToEdit) {
      this.loanForm.patchValue({
        id: this.loanToEdit.id,
        loanDate: this.loanToEdit.loanDate.toISOString().substring(0, 10), 
        returnDate: this.loanToEdit.returnDate.toISOString().substring(0, 10),
        status: this.loanToEdit.status,
        totalDue: this.loanToEdit.totalDue,
        student: undefined
      });
      this.editId = this.loanToEdit.id;
      this.loanForm.get('id')?.disable(); 
    } else {
      this.loanForm.get('id')?.enable();
    }
  }

  onSubmit() {
    const formValue = this.loanForm.getRawValue();
  
    
    const loan: Loan = {
      id: formValue.id || 0, 
      loanDate: new Date(formValue.loanDate || new Date()),
      returnDate: new Date(formValue.returnDate || new Date()),
      status: formValue.status || 'pending', 
      totalDue: formValue.totalDue || 0
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
        console.log(data);
        this.onCreated.emit(true);
        this.loanForm.reset();
      },
      error: (err) => {
        console.log("Error al crear el préstamo:", err);
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  
  edit(loan: Loan) {
    this.loanService.updateLoan(this.editId, loan).subscribe({
      next: (data) => {
        console.log(data);
        this.onCreated.emit(true);
        this.loanForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Prestamo editado correctamente"});
      },
      error: (err) => {
        console.log("Error al editar el préstamo:", err);
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }
  getStudentLoan() {
    this.studentService.getAllStudents().subscribe({
      next: data => {
        this.students = data;
        console.log("all student",data)
        if (this.loanToEdit && this.loanToEdit.student) {
      // this.loanForm.get('student').setValue(this.loanToEdit.student);
        }
      },
      error: e => {
        this.messageService.add({severity:'error', summary:'Error', detail:e.error});
      }
    });
  }

  
  
}
