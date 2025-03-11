export interface Homepage {
  home_id: number;
  layout_id: any;
  image_path_blob: string;
  description: string;
  title: string;
  alt_text: string;
  isImageChange: boolean;
  old_home_id?: number;
  url?:string
}

export interface HomepageData {
  data: Homepage[]
}
