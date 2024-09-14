import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../models/periodic-element';
import { MatIcon } from '@angular/material/icon';
import { PeriodicElementsService } from '../../services/periodic-elements.service';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  service = inject(PeriodicElementsService);
  dataSource: PeriodicElement[] = [];

  ngOnInit(): void {
    this.service.allData.subscribe({
      next: (data) => (this.dataSource = data),
    });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
