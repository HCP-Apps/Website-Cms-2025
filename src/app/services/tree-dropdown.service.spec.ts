import { TestBed } from '@angular/core/testing';

import { TreeDropdownService } from './tree-dropdown.service';

describe('TreeDropdownService', () => {
  let service: TreeDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
