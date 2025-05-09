import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setSingleJob } from "../redux/jobSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../constants/constants";

const JobDescription = () => {
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id; // Get the job ID from the URL parameters
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between mb-5">
        <Button
          className="flex items-center gap-2 text-gray-600 font-semibold"
          variant="outline"
          onClick={() => navigate("/jobs")}
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <Button
          onClick={isApplied ? null : applyJobHandler}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}{" "}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-4 border-b-2 border-b-gray-300">
        <h1 className=" font-medium py-4">Job Description</h1>
        <h1 className="font-medium">
          Posted on:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.experienceLevel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-2 font-normal text-gray-800">
            {singleJob?.applications.length}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
