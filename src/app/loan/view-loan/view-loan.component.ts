import { Component, OnInit } from '@angular/core';
import { Loan, LoanRequest } from 'src/models/models';
import { LoanService } from 'src/service/loan.service';
import { StudentService } from 'src/service/student.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent implements OnInit {

  loanList!: Loan[];
  totalRecords = 10;
  displayModal: boolean = false;
  editLoanItem: LoanRequest | null = null;

  constructor(private loanService: LoanService) { }

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
        console.log(err);
      }
    });
  }

  showDialog(loanToEdit?: LoanRequest) {
    this.editLoanItem = loanToEdit || null;
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
