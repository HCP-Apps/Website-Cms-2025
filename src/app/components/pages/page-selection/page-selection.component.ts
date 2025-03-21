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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}
interface Layout {
  name: any;
  code: any;
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
    DropdownModule,
    FormsModule,
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
  layouts: Layout[] | undefined;
  selectedLayout!: Layout;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tree_service: TreeDropdownService,
    private service: GeneralServicesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.layouts = [
      { name: 'Layout Image', code: '4' },
      { name: 'Layout Video/mp4', code: '31' },
    ];
    this.tree_service.getProjectsFromBackend().subscribe((data: any) => {
      this.files = data;
    });
    this.spinner.hide();
    this.cols = [{ field: 'name', header: 'Pages' }];
  }

  openClosePopup(project_type: string) {
    this.isVisible = !this.isVisible;
    this.typeOfProject = project_type;
    if (this.typeOfProject === 'architecture') {
      this.service.createNewArchProjectID().subscribe((data: any) => {
        this.project_id = data.project_id;
      });
    } else if (this.typeOfProject === 'urbanism') {
      this.service.createNewUrbnProjectID().subscribe((data: any) => {
        this.project_id = data.project_id;
      });
    } else if (this.typeOfProject === 'legacy') {
      this.service.createNewEarlyProjectID().subscribe((data: any) => {
        this.project_id = data.project_id;
      });
    }
  }

  naviagate(value: string) {
    this.router.navigate([`/${value}`]);
  }

  deleteProject(rowData: any) {
    if (rowData.project_type === 'architecture') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this project?'
      );
      if (confirmed) {
        this.spinner.show();
        this.service
          .deleteArchProject(rowData.project_id)
          .subscribe((data: any) => {
            location.reload();
            this.spinner.hide();
          });
      }
    } else if (rowData.project_type === 'urbanism') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this project?'
      );
      if (confirmed) {
        this.spinner.show();
        this.service
          .deleteUrbnProject(rowData.project_id)
          .subscribe((data: any) => {
            location.reload();
            this.spinner.hide();
          });
      }
    }else if (rowData.project_type === 'legacy') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this project?'
      );
      if (confirmed) {
        this.spinner.show();
        this.service
          .deleteEarlyProject(rowData.project_id)
          .subscribe((data: any) => {
            location.reload();
            this.spinner.hide();
          });
      }
    }
  }

  chnageProjectName(event: any) {
    this.project_name = event.target.value.replace(/\s+/g, ' ').trim();
  }

  popUpNavigate(url: string) {
    if (!this.project_name || !this.selectedLayout?.code) {
      alert('Please fill in all the required fields!');
      this.spinner.hide();
      return;
    }
    this.spinner.show();
    if (this.typeOfProject === 'architecture') {
      this.service
        .createArchProject(
          this.project_name,
          this.selectedLayout.code,
          this.project_id
        )
        .subscribe((data: any) => {
          this.naviagate(`/architecture/${this.project_id}`);
          // location.reload();
          this.spinner.hide();
        });
    } else if (this.typeOfProject === 'architecture') {
      this.service
        .createUrbanProject(
          this.project_name,
          this.selectedLayout.code,
          this.project_id
        )
        .subscribe((data: any) => {
          this.naviagate(`/urbanism/${this.project_id}`);
          this.spinner.hide();
        });
    } else if (this.typeOfProject === 'legacy') {
      this.service
        .createEarlyProject(
          this.project_name,
          this.selectedLayout.code,
          this.project_id
        )
        .subscribe((data: any) => {
          this.naviagate(`/legacy/${this.project_id}`);
          this.spinner.hide();
        });
    }
  }
}
