import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SneakerService } from './services/sneaker.service';
import { Sneaker } from './models/sneaker.model';
import { SneakerDialogComponent } from './components/sneaker-dialog/sneaker-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    SneakerDialogComponent,
    ConfirmDialogComponent
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <h2>Admin Panel</h2>
        </div>
        <mat-nav-list>
          <mat-list-item>
            <mat-icon matListItemIcon></mat-icon>
            <span matListItemTitle>Dashboard</span>
          </mat-list-item>
          <mat-list-item class="active">
            <mat-icon matListItemIcon></mat-icon>
            <span matListItemTitle>Produtos</span>
          </mat-list-item>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Gerenciamento de Tênis</span>
        </mat-toolbar>

        <div class="container">
          <div class="search-container">
            <mat-form-field class="search-field">
              <mat-label>Buscar</mat-label>
              <input matInput [(ngModel)]="searchTerm" (input)="onSearch()">
              <button mat-icon-button matSuffix *ngIf="searchTerm" (click)="clearSearch()">
                <mat-icon>close</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="openDialog()">
              Adicionar Novo
            </button>
          </div>

          <mat-table [dataSource]="sneakers">
            <ng-container matColumnDef="id">
              <mat-header-cell *matHeaderCellDef>ID</mat-header-cell>
              <mat-cell *matCellDef="let sneaker">#{{sneaker.id}}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="customer">
              <mat-header-cell *matHeaderCellDef>Cliente</mat-header-cell>
              <mat-cell *matCellDef="let sneaker">{{sneaker.customer}}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="name">
              <mat-header-cell *matHeaderCellDef>Produto</mat-header-cell>
              <mat-cell *matCellDef="let sneaker">{{sneaker.name}}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="status">
              <mat-header-cell *matHeaderCellDef>Status</mat-header-cell>
              <mat-cell *matCellDef="let sneaker">
                <mat-chip [ngClass]="getStatusClass(sneaker.status)">
                  {{sneaker.status}}
                </mat-chip>
              </mat-cell>
            </ng-container>

            <ng-container matColumnDef="actions">
              <mat-header-cell *matHeaderCellDef>Ações</mat-header-cell>
              <mat-cell *matCellDef="let sneaker">
                <button mat-icon-button color="primary" (click)="openDialog(sneaker)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteSneaker(sneaker)">
                  <mat-icon>delete</mat-icon>
                </button>
              </mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
          </mat-table>

          <mat-paginator
            [length]="totalItems"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 25, 100]"
            (page)="onPageChange($event)">
          </mat-paginator>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }
    .sidenav-header {
      padding: 16px;
      background-color: #3f51b5;
      color: white;
    }
    .sidenav-header h2 {
      margin: 0;
      font-size: 20px;
    }
    .container {
      padding: 20px;
    }
    .search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .search-field {
      width: 50%;
    }
    .mat-column-actions {
      width: 100px;
    }
    .mat-column-id {
      width: 80px;
    }
    .status-completed {
      background-color: #4CAF50 !important;
      color: white !important;
    }
    .status-pending {
      background-color: #FFC107 !important;
      color: black !important;
    }
    .status-cancelled {
      background-color: #F44336 !important;
      color: white !important;
    }
    .active {
      background-color: rgba(63, 81, 181, 0.1);
    }
    mat-list-item {
      cursor: pointer;
    }
    mat-list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    .mat-mdc-list-item {
      display: flex !important;
      gap: 16px;
    }
  `]
})
export class AppComponent implements OnInit {
  sneakers: Sneaker[] = [];
  displayedColumns: string[] = ['id', 'customer', 'name', 'status', 'actions'];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private sneakerService: SneakerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadSneakers();
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  loadSneakers() {
    this.sneakerService.getSneakers(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (sneakers) => {
          this.sneakers = sneakers;
          this.totalItems = sneakers.length;
        },
        error: (error) => {
          this.showSnackBar('Erro ao carregar os dados', true);
          console.error('Erro ao carregar dados:', error);
        }
      });
  }

  openDialog(sneaker?: Sneaker) {
    const dialogRef = this.dialog.open(SneakerDialogComponent, {
      width: '400px',
      data: sneaker
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (sneaker) {
          this.updateSneaker(sneaker.id!, result);
        } else {
          this.createSneaker(result);
        }
      }
    });
  }

  createSneaker(sneaker: Sneaker) {
    this.sneakerService.createSneaker(sneaker).subscribe({
      next: () => {
        this.loadSneakers();
        this.showSnackBar('Tênis adicionado com sucesso');
      },
      error: (error) => {
        this.showSnackBar('Erro ao adicionar tênis', true);
        console.error('Erro ao criar tênis:', error);
      }
    });
  }

  updateSneaker(id: number, sneaker: Sneaker) {
    this.sneakerService.updateSneaker(id, sneaker).subscribe({
      next: () => {
        this.loadSneakers();
        this.showSnackBar('Tênis atualizado com sucesso');
      },
      error: (error) => {
        this.showSnackBar('Erro ao atualizar tênis', true);
        console.error('Erro ao atualizar tênis:', error);
      }
    });
  }

  deleteSneaker(sneaker: Sneaker) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Excluir Tênis',
        message: `Tem certeza que deseja excluir este item?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && sneaker.id) {
        this.sneakerService.deleteSneaker(sneaker.id).subscribe({
          next: () => {
            this.loadSneakers();
            this.showSnackBar('Tênis excluído com sucesso');
          },
          error: (error) => {
            this.showSnackBar('Erro ao excluir tênis', true);
            console.error('Erro ao excluir tênis:', error);
          }
        });
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadSneakers();
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearch();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadSneakers();
  }

  private showSnackBar(message: string, isError = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}