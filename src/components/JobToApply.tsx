import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { apply } from "../features/jobs/JobSlice";

const JobToApply = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { jobToApply } = useAppSelector((state) => state.jobs);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  } as AxiosRequestConfig);

  const fetchJob = async () => {
    try {
      const { data } = await instance.get(`/api/job/${id}`);

      dispatch(apply(data.job));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  function jobTypeBackground(value: string) {
    if (value === "Full-time") {
      return "bg-1";
    } else if (value === "Contract") {
      return "bg-0";
    } else {
      return "bg-2";
    }
  }

  function jobTypeText(value: string) {
    if (value === "Full-time") {
      return "text-1";
    } else if (value === "Contract") {
      return "text-0";
    } else {
      return "text-2";
    }
  }

  return (
    <div>
      <section>
        {jobToApply &&
          jobToApply.map((job) => (
            <article
              key={job.job_uid}
              className="border border-black rounded-lg p-4"
            >
              <h3 className="font-bold">{job.job_title || <Skeleton />}</h3>
              <p>{job.company_name || <Skeleton />}</p>
              <p>{job.salary || <Skeleton />}</p>
              <p>{job.job_location || <Skeleton />}</p>
              <article className="mt-4">
                <h3 className="font-bold mb-2">Job Details</h3>
                <div
                  className={`${jobTypeBackground(
                    job.job_type
                  )} inline-block rounded-lg px-2 py-1`}
                >
                  <p className={`font-bold ${jobTypeText(job.job_type)}`}>
                    {job.job_type || <Skeleton />}
                  </p>
                </div>
                <p>{job.job_details || <Skeleton />}</p>
              </article>
            </article>
          ))}
      </section>
    </div>
  );
};

export default JobToApply;
