import { IoSearchSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import NavBar from "../components/NavBar";
import JobList from "../components/JobList";
import { lazy, Suspense } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { getJobs } from "../features/jobs/JobSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect, useState } from "react";
import JobDetailSkeleton from "../utils/JobDetailSkeleton";
import JobListSkeleton from "../utils/JobListSkeleton";
import { getJob } from "../features/jobs/JobSlice";
import SelectedJobDetails from "../components/SelectedJobDetails";
import { Job } from "../utils/DataTypes";
import SelectedJobDetailMobile from "../components/SelectedJobDetailMobile";
import JobListMobile from "../components/JobListMobile";

const LazyJobDetails = lazy(() => import("../components/JobDetails"));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(true);
  const { jobs, isCreated } = useAppSelector((state) => state.jobs);
  const [jobTitleSearchQuery, setJobTitleSearchQuery] = useState("");
  const [jobLocationSearchQuery, setJobLocationSearchQuery] = useState("");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showSelectedJob, setShowSelectedJob] = useState(false);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  } as AxiosRequestConfig);

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

  const getAllJobs = async () => {
    try {
      const { data } = await instance.get("/api/job");
      dispatch(getJobs(data.jobs));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSingleJob = (job: Job) => {
    dispatch(getJob(job));
    setIsSelected(false);
    setShowSelectedJob(true);
  };

  useEffect(() => {
    getAllJobs();
  }, [isCreated]);

  const filterJob = () => {
    let availableRole = [...jobs];

    if (jobTitleSearchQuery) {
      return availableRole.filter(
        (job) =>
          job.job_title.toLowerCase().includes(jobTitleSearchQuery) ||
          job.company_name.toLowerCase().includes(jobTitleSearchQuery)
      );
    }

    if (jobLocationSearchQuery) {
      return availableRole.filter((job) =>
        job.job_location.toLowerCase().includes(jobLocationSearchQuery)
      );
    }

    return availableRole;
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="m-auto overflow-hidden">
        {screenSize > 1000 ? (
          <section className="border-b-2 h-48">
            <div className="flex max-w-[700px] w-full m-auto justify-between items-center h-full">
              <div className="flex items-center border border-black rounded-lg h-12 max-w-[330px] w-full justify-center">
                <strong>What</strong>
                <input
                  type="text"
                  value={jobTitleSearchQuery}
                  placeholder="Job Title or Company"
                  className="bg-inherit mx-4 outline-0"
                  onChange={(e) => setJobTitleSearchQuery(e.target.value)}
                />
                <IoSearchSharp />
              </div>
              <div className="flex items-center border border-black rounded-lg h-12 max-w-[330px] w-full justify-center">
                <strong>Where</strong>
                <input
                  type="text"
                  value={jobLocationSearchQuery}
                  placeholder="City or State"
                  className="bg-inherit mx-4 outline-0"
                  onChange={(e) => setJobLocationSearchQuery(e.target.value)}
                />
                <MdLocationOn />
              </div>
            </div>
          </section>
        ) : (
          <section className="border-b-2 h-28 flex items-center justify-center">
            <div className="flex items-center border border-black rounded-lg h-12 max-w-[330px] w-full justify-center">
              <strong>What</strong>
              <input
                type="text"
                value={jobTitleSearchQuery}
                placeholder="Job Title or Company"
                className="bg-inherit mx-4 outline-0"
                onChange={(e) => setJobTitleSearchQuery(e.target.value)}
              />
              <IoSearchSharp />
            </div>
          </section>
        )}
        <div className="flex w-full items-center justify-center px-4">
          {screenSize >= 1000 ? (
            <section className="max-w-[1100px] w-full m-auto p-7 flex gap-4">
              <div className="max-w-[470px]">
                {isLoading && <JobListSkeleton />}
                {filterJob().map((job) => (
                  <JobList
                    key={job.job_uid}
                    job={job}
                    fetchSingleJob={fetchSingleJob}
                  />
                ))}
              </div>
              <div className="flex-1">
                {isSelected ? (
                  <Suspense fallback={<JobDetailSkeleton />}>
                    <LazyJobDetails />
                  </Suspense>
                ) : (
                  <SelectedJobDetails />
                )}
              </div>
            </section>
          ) : (
            <>
              {!showSelectedJob ? (
                <div className="max-w-[700px] w-full mt-4">
                  {isLoading && <JobListSkeleton />}
                  {filterJob().map((job) => (
                    <JobListMobile
                      key={job.job_uid}
                      job={job}
                      fetchSingleJob={fetchSingleJob}
                    />
                  ))}
                </div>
              ) : (
                <SelectedJobDetailMobile
                  setShowSelectedJob={setShowSelectedJob}
                />
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
