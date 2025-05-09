import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

// This component is used to display a job listing with details such as company name, job title, description, and other relevant information.
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const getDaysAgoText = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();

    const createdDate = new Date(
      createdAt.getFullYear(),
      createdAt.getMonth(),
      createdAt.getDate()
    );
    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const timeDiff = currentDateOnly - createdDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
      <div className="flex itens-center justify-between">
        <p className="text-sm text-gray-500">
          {getDaysAgoText(job?.createdAt)}
        </p>

        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-small text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-small text-gray-600">{job?.description}</p>
      </div>
      <div className="flex -tems-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} {job?.position === 1 ? "Position" : "Positions"}
        </Badge>

        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}{" "}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA{" "}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default JobCard;
