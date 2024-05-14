import { Component, OnInit } from '@angular/core';
import { Loan, LoanRequest, LoanResponseDto } from 'src/models/models';
import { LoanService } from 'src/service/loan.service';
import { StudentService } from 'src/service/student.service';
import { MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent implements OnInit {

  loanList!: Loan[];
  totalRecords = 10;
  displayModal: boolean = false;
  editLoanItem: LoanResponseDto | null = null;

  constructor(private loanService: LoanService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans() {
    this.loanService.getAllLoans().subscribe(data => {
      this.loanList = data;
    });
  }

  softDelete(id: number) {
    this.loanService.softDeleteLoan(id).subscribe({
      next: () => {
        this.getAllLoans();
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    });
  }

  showDialog(loanToEdit?: LoanResponseDto) {
    this.editLoanItem = loanToEdit || null ;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  closeModalAndReloadList() {
    this.editLoanItem = null;
    this.closeModal();
    this.getAllLoans();
  }
}
