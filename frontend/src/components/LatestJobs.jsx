import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  if (!allJobs) {
    return (
      <div className="max-w-7xl mx-auto my-20 text-center">
        <p className="text-lg font-semibold">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length !== 0 ? (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        ) : (
          <div className="col-span-3 text-center">
            <p className="text-lg font-semibold">No Jobs Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
