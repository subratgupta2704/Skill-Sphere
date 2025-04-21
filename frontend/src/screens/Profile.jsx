import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobsTable from "@/components/AppliedJobsTable";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "NodeJS",
  "Express",
  "MongoDB",
];

const isResume = true;

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="Profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, dignissimos itaque consequuntur minus eveniet
                distinctio.
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            {" "}
            <Mail />
            <span>subratguppta2704@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            {" "}
            <Contact />
            <span>+91 1234567890</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length != 0 ? (
              skills.map((skill, index) => <Badge key={index}>{skill}</Badge>)
            ) : (
              <span>No Skills Added</span>
            )}
          </div>
        </div>
        <div className="grid w-full max--w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href="https://drive.google.com/file/d/1tJ3r8lX0w8KxQj5E4h4f4f4f4f4/view?usp=sharing"
              target="_blank"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              View Resume
            </a>
          ) : (
            <span>No Resume Added</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
    </div>
  );
};

export default Profile;
