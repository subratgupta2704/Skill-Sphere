import Navbar from "@/components/Navbar";
import React from "react";
import ApplicantsTable from "./ApplicantsTable";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "@/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setAllApplicants } from "@/redux/applicationSlice";
import axios from "axios";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
