import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element';
import { MatIcon } from '@angular/material/icon';
import { PeriodicElementsService } from '../../services/periodic-elements.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    MatTableModule,
    MatIcon,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ModalDialogComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  private debounceTimer: any;
  element = signal<PeriodicElement>({
    name: '',
    symbol: '',
    position: 0,
    weight: 0,
  });

  service = inject(PeriodicElementsService);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.service.allData.subscribe({
      next: (data) => (this.dataSource.data = data),
    });
  }

  applyFilter(event: Event) {
    clearTimeout(this.debounceTimer);
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;

    this.debounceTimer = setTimeout(() => {
      this.dataSource.filter = filterValue;
    }, 2000);
  }

  editRow(element: PeriodicElement) {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(
          (el) => el.position === element.position
        );
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
        this.element.set(result);
      }
    });
  }
}
