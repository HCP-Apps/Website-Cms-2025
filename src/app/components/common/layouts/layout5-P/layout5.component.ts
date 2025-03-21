import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { GeneralServicesService } from '../../../../services/general-services.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-layout5',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    ButtonComponent
  ],
  templateUrl: './layout5.component.html',
  styleUrl: './layout5.component.css',
})
export class Layout5Component implements OnInit {
  @Input({ required: true }) isEdit: any;
  @Input({ required: true }) data!: any;
  @Input() route_name!: string;
  @Output() titleChange = new EventEmitter();
  @Output() descriptionChange = new EventEmitter();
  @Output() yearChange = new EventEmitter();
  @Output() clientChange = new EventEmitter();
  @Output() areaChange = new EventEmitter();
  @Output() builtupAreaChange = new EventEmitter();
  @Output() tagsChange = new EventEmitter<string[]>();
  areaOptions!: any;
  proejctTags!: any[];

  constructor(
    private router: Router,
    private service: GeneralServicesService
  ) {}

  // handleTagClick(item: string) {
  //   this.router.navigate([`/${this.route_name}`], {queryParams: { route_type: item }});
  // }

  ngOnInit(): void {
    this.service.areaProject().subscribe((data: any) => {
      this.areaOptions = data.data;
    });

    this.service.TagsProject().subscribe((data: any) => {
      this.proejctTags = data.data;
      this.data.tags = this.data.tags.map((tagName: string) => {
        const matchingTag = this.proejctTags.find(
          (tag) =>
            tag.name.trim().toLowerCase() === tagName.trim().toLowerCase()
        );
        return matchingTag || '';
      });
    });
  }

  CustomTitleText(event: any) {
    this.titleChange.emit(event.target.value);
  }
  
  CustomDescriptionText(event: any) {
    this.descriptionChange.emit(event.target.value);
  }

  CustomYearText(event: any) {
    this.yearChange.emit(event.target.value);
  }

  CustomClientText(event: any) {
    this.clientChange.emit(event.target.value);
  }

  CustomAreaText(event: any) {
    this.areaChange.emit(event.value.name);
  }

  CustomBuiltupAreaText(event: any) {
    this.builtupAreaChange.emit(event.target.value);
  }

  onTagsChange(event: any) {
    this.tagsChange.emit(this.data.tags);
  }

  AddParaGap() {
    if (this.data.project_description) {
      const hasTwoBreaksAtEnd = /(<br\s*\/?>){2}$/i.test(this.data.project_description);
  
      if (!hasTwoBreaksAtEnd) {
        this.data.project_description += '<br /><br />';
      }
    } else {
      this.data.project_description = '<br /><br />';
    }
    this.descriptionChange.emit(this.data.project_description);
  }
  
}
