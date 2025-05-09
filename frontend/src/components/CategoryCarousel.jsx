import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "UI/UX Researcher",
  "Data Analyst",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cloud Engineer",
  "Cloud Architect",
  "DevOps Engineer",
  "Cybersecurity Consultant",
  "Product Manager",
  "Software Engineer",
  "Embedded Systems Engineer",
  "Android Developer",
  "Camera Algorithm Engineer",
  "AdTech Engineer",
  "Business Technology Analyst",
  "Site Reliability Engineer",
  "Blockchain Developer",
  "Security Engineer",
  "Solutions Architect",
  "Technical Program Manager",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20 ">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
