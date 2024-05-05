import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/models/models';
import { LoanService } from 'src/service/loan.service';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent implements OnInit {

  loanList!: Loan[];
  totalRecords = 10;
  displayModal: boolean = false;
  editLoanItem: Loan | null = null;

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

  showDialog(loanToEdit?: Loan) {
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
