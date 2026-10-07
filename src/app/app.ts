import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase } from '@ng-bootstrap/ng-bootstrap/nav';
import { PageClickService } from './page-click-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  pageService = inject(PageClickService);

  protected readonly title = signal('pokemon-project');
}
