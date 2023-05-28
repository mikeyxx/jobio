import { useState, FormEvent } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [applicantDetails, setApplicantDetails] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_letter: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const charCount = 700;
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setApplicantDetails({
      ...applicantDetails,
      [name]: value,
    });
  };

  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  } as AxiosRequestConfig);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await instance.post(`/api/apply/${id}`, applicantDetails);
      navigate("/submitted");
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.response.data.errors[0].msg);
    }

    hideAlert();
  };

  const hideAlert = () => {
    const timeout = setTimeout(() => {
      setErrorMsg("");
    }, 3000);

    return () => clearTimeout(timeout);
  };

  return (
    <div>
      <section className="bg-white w-full p-4 shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-20">
          Enter your details below to apply for this role
        </h2>
        <p
          className={
            errorMsg !== ""
              ? `bg-red-300 font-semibold rounded h-10 p-2 flex items-center justify-center absolute max-w-[50rem] top-16 createErrorMsg`
              : ""
          }
        >
          {errorMsg}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center mt-8"
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={applicantDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={applicantDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="resume_link">Resume link</label>
            <input
              type="text"
              id="resume_link"
              name="resume_link"
              required
              placeholder="Paste a link to your CV here"
              value={applicantDetails.resume_link}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cover_letter">Cover letter</label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              required
              value={applicantDetails.cover_letter}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="bg-blue-500 p-2 rounded-lg text-lg text-white cursor-pointer w-full mb-4">
              Apply
            </button>
          </div>
        </form>
        <span className="absolute top-[32rem] right-[40px] text-blue-400 bg-blue-100 rounded-lg px-2">
          {charCount - applicantDetails.cover_letter.length}
        </span>
      </section>
    </div>
  );
};

export default ApplicationForm;
