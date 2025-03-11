import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeDropdownService } from '../../../services/tree-dropdown.service';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '../../common/button/button.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { GeneralServicesService } from '../../../services/general-services.service';
import { DeleteLayoutComponent } from '../../common/dialog/delete-layout/delete-layout.component';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-page-selection',
  standalone: true,
  templateUrl: './page-selection.component.html',
  styleUrl: './page-selection.component.css',
  imports: [
    RouterModule,
    ButtonModule,
    RouterLink,
    TreeTableModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    ButtonComponent,
    NgxSpinnerModule,
    DeleteLayoutComponent,
  ],
})
export class PageSelectionComponent implements OnInit {
  filterMode = 'lenient';
  selectedNodes!: TreeNode[];
  files!: TreeNode[];
  isVisible: boolean = false;
  cols!: Column[];
  typeOfProject!: string;
  project_name = '';
  project_id = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tree_service: TreeDropdownService,
    private service: GeneralServicesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tree_service.getProjectsFromBackend().subscribe((data: any) => {
      this.files = data;
    });
    this.spinner.hide();
    this.cols = [{ field: 'name', header: 'Pages' }];
  }

  openClosePopup(project_type: string) {
    this.isVisible = !this.isVisible;
    this.typeOfProject = project_type;
    if(this.typeOfProject === "architecture"){
      this.service.createNewArchProjectID().subscribe((data: any) => {
        this.project_id = data.project_id;
      });
    }
  }

  naviagate(value: string) {
    this.router.navigate([`/${value}`]);
  }
  deleteProject(rowData: any) {
    if (rowData.project_type === 'architecture') {
      this.spinner.show();
      this.service
        .deleteArchProject(rowData.project_id)
        .subscribe((data: any) => {
          location.reload();
          this.spinner.hide();
        });
    }
  }
  chnageProjectName(event: any) {
    this.project_name = event.target.value;
  }
  popUpNavigate(url: string) {
    this.spinner.show();
    if (this.typeOfProject === 'architecture') {
      this.service
        .createArchProject(this.project_name)
        .subscribe((data: any) => {
          this.naviagate(`/architecture/${this.project_id}`);
          // location.reload();
          this.spinner.hide();
        });
    } else {
      this.service
        .createUrbanProject(this.project_name)
        .subscribe((data: any) => {
          this.naviagate('/urban/0');
          this.spinner.hide();
        });
    }
  }
}
