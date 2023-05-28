import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobListSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div className="rounded-lg p-4" key={index}>
            <div className="mb-4">
              <Skeleton count={4} style={{ marginBottom: "4px" }} />
            </div>
            <Skeleton height={50} />
          </div>
        ))}
    </>
  );
};

export default JobListSkeleton;
