import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, map, of } from 'rxjs';

export interface ITreeSelect {
  key: string;
  label: string;
  data: string;
  icon: string;
  children?: ITreeSelect[];
}

export interface ITreeBackend {
  arch: [{ project_id: number; ar_project_name: string }];
  urban: [{ project_id: number; ur_project_name: string }];
  early: [{ project_id: number; ur_project_name: string }];
}

export interface ITreeBackendData {
  data: ITreeBackend;
}

@Injectable({
  providedIn: 'root',
})
export class TreeDropdownService {
  data: ITreeSelect[] = [];

  constructor(private http: HttpClient) {}

  // getFileSystemNodesData(): Observable<TreeNode<any>[]> {
  //   return of([
  //     {
  //       data: {
  //         name: 'Weekly news',
  //         size: '200mb',
  //         type: 'EDIT',
  //       },
  //     },
  //     {
  //       data: {
  //         name: 'Home Page',
  //         size: '200mb',
  //         type: 'EDIT',
  //       },
  //     },
  //     {
  //       data: {
  //         name: 'Architechture Project Page',
  //         size: '20mb',
  //         type: 'Add',
  //       },
  //       children: [
  //         {
  //           data: {
  //             name: 'Architecture Landing Page',
  //             size: '',
  //             type: 'EDIT',
  //           },
  //         },
  //         {
  //           data: {
  //             name: 'Project Pages',
  //             size: '',
  //             type: 'ADD',
  //           },
  //           children: [
  //             {
  //               data: {
  //                 name: 'IIM Ahmedabad,Campus Extension',
  //                 size: '10mb',
  //                 type: 'EDIT',
  //                 project_id: 1,
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'ANU',
  //                 size: '10mb',
  //                 type: 'EDIT',
  //                 project_id: 2,
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'Jaipur International Airport',
  //                 size: '10mb',
  //                 type: 'EDIT',
  //                 project_id: 3,
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'Safal Profitaire',
  //                 size: '10mb',
  //                 type: 'EDIT',
  //                 project_id: 4,
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'New building for the Parliament of India',
  //                 size: '10mb',
  //                 type: 'EDIT',
  //                 project_id: 5,
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       data: {
  //         name: 'Urbanism Project Page',
  //         size: '20mb',
  //         type: 'Add',
  //       },
  //       children: [
  //         {
  //           data: {
  //             name: 'Urbanism Landing Page',
  //             size: '',
  //             type: 'EDIT',
  //           },
  //         },
  //         {
  //           data: {
  //             name: 'Project Pages',
  //             size: '',
  //             type: 'ADD',
  //           },
  //           children: [
  //             {
  //               data: {
  //                 name: 'Central Vista Masterplan',
  //                 type: 'EDIT',
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'Kankaria Lakefront Development',
  //                 type: 'EDIT',
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'Lalita Ghat Conservation',
  //                 type: 'EDIT',
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'AUDA Pedestrian Bridge',
  //                 type: 'EDIT',
  //               },
  //             },
  //             {
  //               data: {
  //                 name: 'Kartavya Path',
  //                 type: 'EDIT',
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ]);
  // }

  getProjectsFromBackend(): Observable<any> {
    let tree_data: any = [
      {
        data: {
          name: 'Weekly news',
          size: '200mb',
          type: 'EDIT',
          url: '/press',
        },
      },
      {
        data: {
          name: 'Home Page',
          size: '200mb',
          type: 'EDIT',
          url: '/homepage',
        },
      },
      {
        data: {
          name: 'Architechture Project Page',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'Architecture Landing Page',
              size: '',
              type: 'EDIT',
              url: '/architecture',
            },
          },
          {
            data: {
              name: 'Project Pages',
              size: '',
              type: 'ADD',
              project: 'architecture',
            },
            children: [],
          },
        ],
      },
      {
        data: {
          name: 'Urbanism Project Page',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'Urbanism Landing Page',
              size: '',
              type: 'EDIT',
              url: '/urbanism',
            },
          },
          {
            data: {
              name: 'Project Pages',
              size: '',
              type: 'ADD',
              project: 'urbanism',
            },
            children: [],
          },
        ],
      },
      {
        data: {
          name: 'Research & Publications Page',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'Research & Publications Landing Page',
              size: '',
              type: 'EDIT',
              url: '/research-publication',
            },
          },
          {
            data: {
              name: 'Books',
              size: '',
              type: 'EDIT',
              url: '/books',
            },
          },
          {
            data: {
              name: 'Brochures',
              size: '',
              type: 'EDIT',
              project: '/brochures',
            },
          },
          {
            data: {
              name: 'Papers',
              size: '',
              type: 'EDIT',
              project: '/papers',
            },
          },
        ],
      },
      {
        data: {
          name: 'Early Project Page',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'Early Landing Page',
              size: '',
              type: 'EDIT',
              url: '/legacy',
            },
          },
          {
            data: {
              name: 'Project Pages',
              size: '',
              type: 'ADD',
              project: 'legacy',
            },
            children: [],
          },
        ],
      },
      {
        data: {
          name: 'Studios & Studio Support Page',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'Architecture Studio',
              size: '',
              type: 'EDIT',
              url: '/architecture-studio',
            },
          },
          {
            data: {
              name: 'Urbanism Studio',
              size: '',
              type: 'EDIT',
              project: '/urbanism-studio',
            },
          },
          {
            data: {
              name: 'Archives and Library',
              size: '',
              type: 'EDIT',
              project: '/archives',
            },
          },
          {
            data: {
              name: 'Communications',
              size: '',
              type: 'EDIT',
              project: '/communications-2',
            },
          },
          {
            data: {
              name: 'Conservation',
              size: '',
              type: 'EDIT',
              project: '/conservation',
            },
          },
          {
            data: {
              name: 'Digital Modelling & Software',
              size: '',
              type: 'EDIT',
              project: '/software-support',
            },
          },
          {
            data: {
              name: 'Landscape',
              size: '',
              type: 'EDIT',
              project: '/landscape',
            },
          },
          {
            data: {
              name: 'Model Making',
              size: '',
              type: 'EDIT',
              project: '/model-making',
            },
          },
          {
            data: {
              name: 'Photography',
              size: '',
              type: 'EDIT',
              project: '/photography',
            },
          },
          {
            data: {
              name: 'Project Management',
              size: '',
              type: 'EDIT',
              project: '/project-management',
            },
          },
          {
            data: {
              name: 'Site Representatives',
              size: '',
              type: 'EDIT',
              project: '/architecture-representatives',
            },
          },
          {
            data: {
              name: 'Visualization',
              size: '',
              type: 'EDIT',
              project: '/visualization',
            },
          },
        ],
      },
      {
        data: {
          name: 'Practice',
          size: '20mb',
          type: 'Add',
        },
        children: [
          {
            data: {
              name: 'About Us',
              size: '',
              type: 'EDIT',
              url: '/about',
            },
          },
          {
            data: {
              name: 'People',
              size: '',
              type: 'EDIT',
              project: '/peoples',
            },
          },
          {
            data: {
              name: 'Awards',
              size: '',
              type: 'EDIT',
              project: '/awards',
            },
          },
          {
            data: {
              name: 'Outreach',
              size: '',
              type: 'Add',
            },
            children: [
              {
                data: {
                  name: 'Exhibitions',
                  size: '',
                  type: 'EDIT',
                  url: '/exhibitions',
                },
              },
              {
                data: {
                  name: 'Features',
                  size: '',
                  type: 'EDIT',
                  url: '/features',
                }
              },
              {
                data: {
                  name: 'HCP in the Press',
                  size: '',
                  type: 'EDIT',
                  url: '/news',
                },
              },
              {
                data: {
                  name: 'Talks & Seminars',
                  size: '',
                  type: 'EDIT',
                  url: '/outreach',
                },
              },
            ],
          },
          {
            data: {
              name: 'Careers',
              size: '',
              type: 'Add',
            },
            children: [
              {
                data: {
                  name: 'Student Internships',
                  size: '',
                  type: 'EDIT',
                  url: '/student-internships',
                },
              },
              {
                data: {
                  name: 'Work Opportunities',
                  size: '',
                  type: 'EDIT',
                  url: '/careers',
                }
              }
            ],
          },
          {
            data: {
              name: 'Contact Us',
              size: '',
              type: 'EDIT',
              url: '/contact',
            },
          },
        ],
      },
    ];

    return this.http
      .get<ITreeBackendData>(
        // 'https://hcpinteractive.com/HCP_Website/Common/get_dashboard_dropdown.php'
        'https://versatilesolutions.co.in/hcp.co.in/HCP_CMS_demo/HCP_Website/Common/get_dashboard_dropdown.php'
      )
      .pipe(
        // cannot return in subscribe method so used pipe
        map((data: ITreeBackendData) => {
          data.data.arch.forEach((arch: any) => {
            tree_data[2].children[1].children.push({
              data: {
                name: arch.ar_project_name,
                type: 'EDIT',
                project_id: arch.project_id,
                size: '',
                project_type: "architecture",
                url: `/architecture/${arch.project_id}`,
              },
            });
          });
          data.data.urban.forEach((urban: any) => {
            tree_data[3].children[1].children.push({
              data: {
                name: urban.ur_project_name,
                type: 'EDIT',
                project_id: urban.project_id,
                size: '',
                url: `/urban/${urban.project_id}`,
              },
            });
          });
          data.data.early.forEach((early: any) => {
            tree_data[5].children[1].children.push({
              data: {
                name: early.early_project_name,
                type: 'EDIT',
                project_id: early.project_id,
                size: '',
                url: `/urban/${early.project_id}`,
              },
            });
          });
          return tree_data;
        })
      );
  }
}
