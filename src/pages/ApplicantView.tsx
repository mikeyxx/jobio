import ApplicationForm from "../components/ApplicationForm";
import { useEffect, useState } from "react";
import JobToApply from "../components/JobToApply";
import NavBar from "../components/NavBar";

const ApplicantView = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="m-auto overflow-hidden">
        {screenSize >= 1000 ? (
          <section className="max-w-[1500px] w-full m-auto p-7 flex gap-4">
            <div className="max-w-[560px]">
              <JobToApply />
            </div>
            <div className="flex-1">
              <ApplicationForm />
            </div>
          </section>
        ) : (
          <section className="max-w-[1500px] w-full m-auto p-7 flex flex-col gap-4">
            <div className="max-w-[560px]">
              <JobToApply />
            </div>
            <div className="flex-1">
              <ApplicationForm />
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ApplicantView;
