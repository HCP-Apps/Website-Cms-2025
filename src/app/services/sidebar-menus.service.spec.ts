import { TestBed } from '@angular/core/testing';

import { SidebarMenusService } from './sidebar-menus.service';

describe('SidebarMenusService', () => {
  let service: SidebarMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
