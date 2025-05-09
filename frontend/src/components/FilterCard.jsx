import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Input } from "./ui/input";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi - NCR", "Bengaluru", "Hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Scientist",
      "Full Stack Developer",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Internship", "Full-Time", "Part-Time", "Contract"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  // const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  // useEffect(() => {
  //   dispatch(setSearchedQuery(searchInput));
  // }, [searchInput]);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-xl">Filter Jobs </h1>
      <hr className="my-2 " />
      {/* <Input
        name="search"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      /> */}
      <RadioGroup onValueChange={handleValueChange} value={selectedValue}>
        {filterData.map((data, index1) => (
          <div key={index1} className="mt-4">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index2) => {
              const itemId = `id${index1}-${index2}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
