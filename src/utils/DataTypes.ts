export interface Job {
  job_uid: string;
  company_name: string;
  job_title: string;
  job_details: string;
  job_location: string;
  salary: number;
  job_type: string;
  status: string;
  user_uid: string;
  created_at: number | Date;
}

export interface User {
  user_uid: string;
  name: string;
  email: string;
  password: string;
}
