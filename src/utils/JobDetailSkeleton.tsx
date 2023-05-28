import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const JobDetailSkeleton = () => {
  return (
    <div className="rounded-lg p-4">
      <div className="mb-4">
        <Skeleton count={3} style={{ marginBottom: "3px" }} />
      </div>
      <Skeleton style={{ marginBottom: "5px" }} />
      <Skeleton height={50} />
    </div>
  );
};

export default JobDetailSkeleton;
