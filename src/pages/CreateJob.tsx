import { useState, FormEvent, useEffect } from "react";
import main from "../assets/main.svg";
import NavBar from "../components/NavBar";
import { createJob } from "../api/job";
import { useAppDispatch } from "../app/store";
import { hitReset, onSuccess } from "../features/jobs/JobSlice";
import CreateJobMobile from "./CreateJobMobile";

const CreateJob = () => {
  const [jobData, setJobData] = useState({
    company_name: "",
    job_title: "",
    job_details: "",
    job_location: "",
    salary: 0,
    job_type: "Full-time",
    status: "Open",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const charCount = 600;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "job_details") {
      if (charCount - value.length >= 0) {
        setJobData({
          ...jobData,
          [name]: value,
        });
      }
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createJob(jobData);
      dispatch(onSuccess());
      setSuccessMsg(data.msg);
      reset();
      setJobData({
        company_name: "",
        job_title: "",
        job_details: "",
        job_location: "",
        salary: 0,
        job_type: "Full-time",
        status: "Open",
      });
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.response.data.errors[0].msg);
    }

    hideAlert();
  };

  const hideAlert = () => {
    const timeout = setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 3000);

    return () => clearTimeout(timeout);
  };

  const reset = () => {
    const timeout = setTimeout(() => {
      dispatch(hitReset());
    }, 5000);

    return () => clearTimeout(timeout);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      {screenSize >= 1000 ? (
        <div className="flex mx-20 h-full items-center justify-center my-8">
          <section>
            <img src={main} alt="" className="w-[65%]" />
          </section>
          <section className="bg-white max-w-[50rem] w-full p-4 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-20">Create a new Job</h2>
            <p
              className={
                errorMsg !== ""
                  ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-16 createErrorMsg`
                  : ""
              }
            >
              {errorMsg}
            </p>
            <p
              className={
                successMsg !== ""
                  ? `bg-green-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-16 createErrorMsg`
                  : ""
              }
            >
              {successMsg}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 justify-center mt-8"
            >
              <div className="flex flex-col">
                <label htmlFor="company_name">Company Name</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={jobData.company_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="job_title">Job Title</label>
                <input
                  type="text"
                  id="job_title"
                  name="job_title"
                  value={jobData.job_title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="job_details">Job Details</label>
                <textarea
                  id="job_details"
                  name="job_details"
                  value={jobData.job_details}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="job_location">Job Location</label>
                <input
                  type="text"
                  id="job_location"
                  name="job_location"
                  value={jobData.job_location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                />
              </div>
              <fieldset className="flex flex-col">
                <legend className="mb-4">Job Type</legend>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="job_type"
                    id="full_time"
                    value="Full-time"
                    checked={jobData.job_type === "Full-time"}
                    onChange={handleChange}
                  />
                  <label htmlFor="full_time">Full-time</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="job_type"
                    id="intern"
                    value="Intern"
                    checked={jobData.job_type === "Intern"}
                    onChange={handleChange}
                  />
                  <label htmlFor="intern">Intern</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="job_type"
                    id="contract"
                    value="Contract"
                    checked={jobData.job_type === "Contract"}
                    onChange={handleChange}
                  />
                  <label htmlFor="contract">Contract</label>
                </div>
              </fieldset>
              <fieldset className="flex flex-col">
                <legend className="mb-4">Job Status</legend>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="open"
                    value="Open"
                    checked={jobData.status === "Open"}
                    onChange={handleChange}
                  />
                  <label htmlFor="open">Open</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="interview"
                    value="Interview"
                    checked={jobData.status === "Interview"}
                    onChange={handleChange}
                  />
                  <label htmlFor="interview">Interview</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="offer"
                    value="Offer"
                    checked={jobData.status === "Offer"}
                    onChange={handleChange}
                  />
                  <label htmlFor="offer">Offer</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="closed"
                    value="Closed"
                    checked={jobData.status === "Closed"}
                    onChange={handleChange}
                  />
                  <label htmlFor="closed">Closed</label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="pending"
                    value="Pending"
                    checked={jobData.status === "Pending"}
                    onChange={handleChange}
                  />
                  <label htmlFor="pending">Pending</label>
                </div>
              </fieldset>
              <div>
                <button className="bg-blue-500 p-2 rounded-lg text-lg text-white cursor-pointer w-full mb-4">
                  Create
                </button>
              </div>
            </form>
            <span className="absolute top-[26.7rem] right-[40px] text-blue-400 bg-blue-100 rounded-lg px-2">
              {charCount - jobData.job_details.length}
            </span>
          </section>
        </div>
      ) : (
        <CreateJobMobile />
      )}
    </div>
  );
};

export default CreateJob;
