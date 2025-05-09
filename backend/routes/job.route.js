import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllJobs, postJob, getJobById, getAdminJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get( getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router; 