import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homepage, HomepageData } from '../interfaces/homepage';
import { PostResponse } from '../interfaces/post-response';

@Injectable({
  providedIn: 'root',
})
export class GeneralServicesService {
  constructor(private http: HttpClient) {}
  // Api_Url = 'https://hcpinteractive.com/HCP_Website';
  // Api_Url =
  //   'https://versatilesolutions.co.in/hcp.co.in/HCP_CMS_demo/HCP_Website';
  // Api_Url = 'https://hcp.co.in/HCP_Website';
  Api_Url = 'https://cms.hcp.co.in/HCP_CMS/HCP_Website';

  // home page crud operations

  getHomePage(): Observable<HomepageData> {
    return this.http.get<HomepageData>(
      `${this.Api_Url}/CMS/homepage/get_homepage_details.php`
    );
  }

  postWeeklyDate(type: any, selectDate: any): Observable<HomepageData> {
    return this.http.post<HomepageData>(
      `${this.Api_Url}/CMS/page_Press/get_calendar_details.php`,
      { dateType: type, selectDate: selectDate }
    );
  }

  getWeeklyDate(): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_Press/get_calendar_details.php`
    );
  }

  postHomePageData(data: Homepage[]): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      `${this.Api_Url}/CMS/homepage/upload_homepage_details.php`,
      { data: data }
    );
  }

  // Architecture apis

  getArchitectureLandingPageData(): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_architecture_landing/get_ar_landingpage_details.php`
    );
  }

  getArchitectureprojectPageData(id?: string): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_ar_project/get_ar_projects_page.php?id=${id}`
    );
  }

  postARPojectPageData(data: any[]): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      `${this.Api_Url}/CMS/page_ar_project/update_ar_projects_page.php`,
      { data: data }
    );
  }

  createArchProject(name: string, layout_id: any, project_id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/DashBord/add_architecture_project.php?ar_project_name=${name}&layout_id=${layout_id}&project_id=${project_id}`
    );
  }

  createNewArchProjectID() {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ar_project/get_new_ar_project_id.php`
    );
  }

  deleteArchProject(id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ar_project/delete_ar_project.php?ar_project_id=${id}`
    );
  }

  deleteArchProjectLayout(apIid: any, aPid: any, alid: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ar_project/delete_ar_project_layout.php?ar_project_image_id=${apIid}&ar_project_id=${aPid}&layout_id=${alid}`
    );
  }

  deleteLayout(id: number): Observable<PostResponse> {
    return this.http.delete<PostResponse>(
      `${this.Api_Url}/CMS/homepage/delete_homepage_details.php?id=${id}`
    );
  }

  // Urbanism api

  getUrbanismprojectPageData(id?: string): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_ur_project/get_ur_project.php?id=${id}`
    );
  }

  createUrbanProject(name: string, layout_id: any, project_id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ur_project/add_urbanism_project.php?ur_project_name=${name}&layout_id=${layout_id}&project_id=${project_id}`
    );
  }

  createNewUrbnProjectID() {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ur_project/get_new_ur_project_id.php`
    );
  }

  deleteUrbnProject(id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ur_project/delete_ur_project.php?ur_project_id=${id}`
    );
  }

  postURPojectPageData(data: any[]): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      `${this.Api_Url}/CMS/page_ur_project/update_ur_projects_page.php`,
      { data: data }
    );
  }

  // early project apis

  getEarlyprojectPageData(id?: string): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_legacy_project/get_legacy_project.php?id=${id}`
    );
  }

  createEarlyProject(name: string, layout_id: any, project_id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_legacy_project/add_legact_project.php?lp_project_name=${name}&layout_id=${layout_id}&project_id=${project_id}`
    );
  }

  createNewEarlyProjectID() {
    return this.http.get(
      `${this.Api_Url}/CMS/page_legacy_project/get_new_lp_project_id.php`
    );
  }

  deleteEarlyProject(id: any) {
    return this.http.get(
      `${this.Api_Url}/CMS/page_legacy_project/delete_lp_project.php?lp_project_id=${id}`
    );
  }
  
  postERPojectPageData(data: any[]): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      `${this.Api_Url}/CMS/page_legacy_project/update_lp_projects_page.php`,
      { data: data }
    );
  }
  
  // press page crud operations

  getPress(): Observable<any> {
    return this.http.get<any>(
      `${this.Api_Url}/CMS/page_Press/get_news_page_details.php`
    );
  }

  areaProject() {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ar_project/get_area_type.php`
    );
  }
  TagsProject() {
    return this.http.get(
      `${this.Api_Url}/CMS/page_ar_project/get_ar_projects_tag.php`
    );
  }
}
