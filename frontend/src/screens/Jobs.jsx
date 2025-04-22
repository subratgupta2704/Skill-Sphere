import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/Navbar";
import React from "react";
import Job from "@/components/Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {!allJobs ? (
            <span>Loading jobs...</span>
          ) : allJobs.length <= 0 ? (
            <span>Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <Job key={job?._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
