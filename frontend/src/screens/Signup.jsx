import React from "react";
import Navbar from "../components/shared/Navbar";
import { Label } from "../components/ui/Label";
import { Input } from "../components/ui/Input";
import { RadioGroup } from "../components/ui/radio-group";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-4xl mb-5 text-center">
            ! Register here !
          </h1>
          <div className="my-2">
            <Label className="mb-2 block">Full Name</Label>
            <Input type="text" placeholder="Enter your full name" />
          </div>
          <div className="my-2">
            <Label className="mb-2 block">Email ID</Label>
            <Input type="email" placeholder="Enter your email address" />
          </div>
          <div className="my-2">
            <Label className="mb-2 block">Contact</Label>
            <Input type="tel" placeholder="Enter your mobile no." />
          </div>
          <div className="my-2">
            <Label className="mb-2 block">Password</Label>
            <Input type="password" placeholder="Create a strong password." />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
          <div className="text-center">
            <span className="text-small">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
