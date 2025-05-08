import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backednd Developer",
      "Data Scientist",
      "Full Stack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-50K", "51K-1Lakh", "1-2Lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-xl">Filter Jobs </h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={handleValueChange} value={selectedValue}>
        {filterData.map((data, index1) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index2) => {
              const itemId = `id${index1}-${index2}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} key={itemId} />
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
