import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// Controller to apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Validate if job ID is provided
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add the application ID to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application Submitted Successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Controller to get all jobs the current user has applied to
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find all applications by the user and populate job and company details
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    // If no applications found
    if (!application) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applications Fetched Successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Controller to get all applicants for a specific job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job and populate the applications and applicant details
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants Fetched Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Controller to update the status of a specific application
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    // Validate if status is provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    // Find the application by ID
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
        success: false,
      });
    }

    // Update the application status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
