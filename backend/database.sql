CREATE TYPE job_type AS ENUM ('Full-time', 'Intern', 'Contract');
CREATE TYPE status AS ENUM ('Open', 'Interview', 'Offer', 'Closed', 'Pending');

CREATE TABLE users (
user_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(150) NOT NULL,
email VARCHAR(200) NOT NULL,
password VARCHAR(150) NOT NULL);


CREATE TABLE job (
  job_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL, 
  job_title VARCHAR(200) NOT NULL,
  job_details VARCHAR(600) NOT NULL,
  job_location VARCHAR(150) NOT NULL,
  salary money NOT NULL,
  job_type job_type NOT NULL,
  status status NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  user_uid UUID REFERENCES users (user_uid)
);

CREATE TABLE applicant (
  applicant_uid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  resume_link VARCHAR(200) NOT NULL,
  cover_letter VARCHAR(700),
  created_at TIMESTAMP DEFAULT current_timestamp,
  job_uid UUID REFERENCES job (job_uid)
);