import React from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const JobDescription = () => {
  const isApplied = true; // Replace with actual state or prop to check if the job is already applied
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              Part-Time
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              12 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            Frontend Developer
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">Delhi NCR</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
            veritatis. Harum at ducimus amet veniam?
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">3+ Years</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal text-gray-800">24 LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">13</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted on:
          <span className="pl-4 font-normal text-gray-800">15/04/2025</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
