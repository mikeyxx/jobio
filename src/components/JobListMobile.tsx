import { Job } from "../utils/DataTypes";
import { useAppSelector, useAppDispatch } from "../app/store";
import { hitReset, onSuccess, onUpdate } from "../features/jobs/JobSlice";
import { Link } from "react-router-dom";
import { deleteJob } from "../api/job";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";

interface Props {
  job: Job;
  fetchSingleJob: (job: Job) => void;
}

const JobListMobile = ({ job, fetchSingleJob }: Props) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.id);
  const dateCreated = new Date(job.created_at);
  const numOfDays = differenceInDays(new Date(), dateCreated);

  function jobTypeBackground() {
    if (job.job_type === "Full-time") {
      return "bg-1";
    } else if (job.job_type === "Contract") {
      return "bg-0";
    } else {
      return "bg-2";
    }
  }
  function jobTypeText() {
    if (job.job_type === "Full-time") {
      return "text-1";
    } else if (job.job_type === "Contract") {
      return "text-0";
    } else {
      return "text-2";
    }
  }

  const onDelete = async (id: string) => {
    try {
      const { data } = await deleteJob(id);
      setSuccessMsg(data.msg);
      dispatch(onSuccess());
      reset();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.message
          ? "Job has one or more applicant"
          : error.response.data.errors[0].msg
      );
    }
  };

  useEffect(() => {
    hideAlert();
  }, [successMsg, errorMsg]);

  const hideAlert = () => {
    const timeout = setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 7000);

    return () => clearTimeout(timeout);
  };

  const reset = () => {
    const timeout = setTimeout(() => {
      dispatch(hitReset());
    }, 5000);

    return () => clearTimeout(timeout);
  };

  return (
    <section>
      <article className="rounded-lg p-4 mb-4 cursor-pointer outline outline-1">
        <h3
          onClick={() => fetchSingleJob(job)}
          className="font-bold hover:underline"
        >
          {job.job_title}
        </h3>
        <p>{job.company_name}</p>

        <p>{job.job_location}</p>

        <div
          className={`${jobTypeBackground()} inline-block rounded-lg px-2 py-1`}
        >
          <p className={`font-bold ${jobTypeText()}`}>{job.job_type}</p>
        </div>

        <ul className="mt-4 px-3">
          <li className="list-disc">{job.job_details}</li>
        </ul>

        <small className="inline-block mt-4 text-gray-500">
          {numOfDays === 0
            ? "Posted less than a day ago"
            : numOfDays === 1
            ? `Posted ${numOfDays} day ago`
            : numOfDays > 1 && `Posted ${numOfDays} days ago`}
        </small>

        {userId === job.user_uid && (
          <div className="mt-4">
            <Link to={`/edit/${job.job_uid}`}>
              <button
                className="mr-4 bg-blue-100 text-blue-500 rounded-lg px-3 shadow-md"
                onClick={() => dispatch(onUpdate(job))}
              >
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(job.job_uid)}
              className="mr-4 bg-0 text-0 rounded-lg px-3 shadow-md"
            >
              Delete
            </button>
          </div>
        )}
      </article>
      <p
        className={
          errorMsg !== ""
            ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-[8px] right-[23rem] createErrorMsg`
            : ""
        }
      >
        {errorMsg}
      </p>
      <p
        className={
          successMsg !== ""
            ? `bg-green-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-[8px] right-[23rem] createErrorMsg`
            : ""
        }
      >
        {successMsg}
      </p>
    </section>
  );
};

export default JobListMobile;
