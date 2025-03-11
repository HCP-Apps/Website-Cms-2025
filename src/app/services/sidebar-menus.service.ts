import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISideBAr } from '../interfaces/ISideBar';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenusService {

  constructor(private http: HttpClient) { }

  getSideBarMenus () : Observable<ISideBAr> {
    return this.http.get<ISideBAr>('https://hcpinteractive.com/HCP_Website/Website/get_sidebar_menus.php')
  }

}
