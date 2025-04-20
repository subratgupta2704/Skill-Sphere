import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/Navbar";
import React from "react";
import Job from "@/components/Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            {" "}
            <FilterCard />
          </div>
          {jobArray.length <= 0 ? (
            <span>Jobs Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((job) => (
                  <Job key={job} />
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
