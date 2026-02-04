import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PageAndRoles } from 'src/app/modules/page-roles/interfaces/GetPagesAndRolesForUserResponse';
import { PageRole } from 'src/app/modules/page-roles/types/Page Roles';
import { SecureLSService } from 'src/app/services/secureLS/secure-ls.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss'],
  standalone: true,
  imports: [NgbModule, TranslateModule, CommonModule],
})
export class DeleteBtnComponent implements OnInit {
  private secureLsService: SecureLSService = inject(SecureLSService);
  private router: Router = inject(Router);

  @Input() isLabelShow: boolean = false;

  currentUrl: string;
  allowedPagesAndRoles: PageAndRoles[] = [];
  pageName: string = '';
  haveDeleteRoleOnPage: boolean = false;
  ngOnInit(): void {
    this.initValues();
  }

  initValues() {
    this.currentUrl = this.router.url;
    this.allowedPagesAndRoles =
      this.secureLsService.decryptData('pagesAndRoles') ?? [];
    this.pageName = this.currentUrl
      .split('/')
      .filter((str: string) => str && str.length && str != '/')[0];
    this.checkDeleteRole();
    // console.log(`this.currentUrl ==>> ${this.currentUrl}`);
    // console.log(
    //   `split currentUrl`,
    //   this.currentUrl
    //     .split('/')
    //     .filter((str: string) => str && str.length && str != '/')[0]
    // );
    // console.log(`this.pageName ==>> ${this.pageName}`);
  }

  checkDeleteRole() {
    if (
      Array.isArray(this.allowedPagesAndRoles) &&
      this.allowedPagesAndRoles.length
    ) {
      const modulePage: PageAndRoles = (this.allowedPagesAndRoles.find(
        (module) =>
          this.router.url.includes(
            `/${
              module.pagePath
                .split('/')
                .filter((str: string) => str && str.length && str != '/')[0]
            }`
          )
      ) ?? {}) as PageAndRoles;

      if (modulePage && modulePage.pageId) {
        const moduleRoles: {
          id: string;
          name: PageRole;
        }[] = modulePage['roles'];

        this.haveDeleteRoleOnPage = moduleRoles.some(
          (role) => role.name === 'Delete'
        );
      }
    } else {
      this.haveDeleteRoleOnPage = true;
    }
  }
}
