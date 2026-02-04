export interface JobApplication{
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  portfolioUrl?: string;
  cvFilePath?: string;
  coverLetter?: string;
  appliedAt?: string | Date;
  jobId?: number;
}
