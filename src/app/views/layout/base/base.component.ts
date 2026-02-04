import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { SHARED_IMPORTS } from 'src/app/shared/shared.imports';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  standalone: true,
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  imports: [...SHARED_IMPORTS, FooterComponent, NavbarComponent, SidebarComponent]
})
export class BaseComponent implements OnInit {

  isLoading: boolean;

  constructor(private router: Router) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });


  }

  ngOnInit(): void {
  }

}
