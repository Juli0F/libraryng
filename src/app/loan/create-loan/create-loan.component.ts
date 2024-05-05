import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Loan } from 'src/models/models';
import { LoanService } from 'src/service/loan.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {

  @Output() onCreated = new EventEmitter<boolean>();
  @Input() loanToEdit!: Loan | null;
  editId!: number;

  loanForm = new FormGroup({
    id: new FormControl(0), // Asumimos que el ID es numérico y lo inicializamos como 0
    loanDate: new FormControl('', Validators.required),
    returnDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    totalDue: new FormControl(0, [Validators.required, Validators.min(0)]) // Total due también es numérico
  });

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanForm.reset({
      id: 0, // Inicializamos como 0 para evitar problemas de tipo
      loanDate: '',
      returnDate: '',
      status: '',
      totalDue: 0
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loanToEdit) {
      this.loanForm.patchValue({
        id: this.loanToEdit.id,
        loanDate: this.loanToEdit.loanDate.toISOString().substring(0, 10), 
        returnDate: this.loanToEdit.returnDate.toISOString().substring(0, 10),
        status: this.loanToEdit.status,
        totalDue: this.loanToEdit.totalDue
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
      }
    });
  }
  
  edit(loan: Loan) {
    this.loanService.updateLoan(this.editId, loan).subscribe({
      next: (data) => {
        console.log(data);
        this.onCreated.emit(true);
        this.loanForm.reset();
      },
      error: (err) => {
        console.log("Error al editar el préstamo:", err);
      }
    });
  }
}
