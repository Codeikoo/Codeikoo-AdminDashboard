export interface JobModel {
  id: number;
  title?: string;
  description?: string;
  location?: string;
  employmentType?: EmploymentType;
  postedAt?: string; // or Date
  requirements?: string[];
}

export enum EmploymentType {
  FullTime = 0,
  PartTime = 1,
  Contract = 2,
  Internship = 3
}
