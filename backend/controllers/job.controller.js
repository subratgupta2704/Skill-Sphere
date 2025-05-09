import { Job } from "../models/job.model.js";

// POST /job - Admin posts a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !experience ||
      !position
    ) {
      return res.status(400).json({
        message: "Please fill all the fields.",
        success: false,
      });
    }

    // Create job in database
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Convert comma-separated string to array
      location,
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job Created Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET /jobs?keyword= - Get all jobs, optionally filtered by keyword (for students)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // Search for jobs where title or description matches keyword (case-insensitive)
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // Fetch and populate company info, sorted by most recent
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No Jobs Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs Fetched Successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET /job/:id - Get a specific job by ID (for students)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find job and populate its applications
    const job = await Job.findById(jobId)
      .populate({
        path: "applications", // Populating applications
      })
      .populate({
        path: "company", // Populating company
      });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job Fetched Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// GET /admin/jobs - Get all jobs posted by the logged-in admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    // Fetch jobs created by the admin and populate company info
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No Jobs Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs Fetched Successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
