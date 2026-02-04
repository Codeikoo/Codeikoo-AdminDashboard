export interface GlobalDataTableRequest {
  // draw?: number;
  // start?: number;
  // length?: number;
  // sortColumnName?: string;
  // sortColumnDirection?: 'asc' | 'desc'; // make it optional
  // searchValue?: string;
  // searchableCloumns?: string[];
  // searchableCloumnsValues?: {},
  CourseName?:string
}


export interface GenricApiResponse<T = any> {
  isSuccess: boolean;
  message: string;
  object: T;
}

export interface GenricDataTableResponse<T = any> {
 
  // draw: number;

  data: T[];
 
  // recordsTotal: number;


  // recordsFiltered: number;
}

export interface SelectItem {
  id: any;
  text: string;
}
