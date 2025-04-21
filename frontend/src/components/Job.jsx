import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobId = "12345"; // Replace with the actual job ID you want to navigate to

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
      <div className="flex itens-center justify-between">
        <p className="text-sm text-gray-500">2 Days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-small text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-small text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          tenetur nostrum! Necessitatibus commodi repudiandae autem, consectetur
          cumque possimus cupiditate. Molestias.
        </p>
      </div>
      <div className="flex -tems-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 Positions{" "}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          Part-Time{" "}
        </Badge>

        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          24 LPA{" "}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
