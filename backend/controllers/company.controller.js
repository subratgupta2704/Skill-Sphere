import { Company } from "../models/company.model.js";
import getDataUri from "../utils.js/datauri.js";
import cloudinary from "../utils.js/cloudinary.js";

// Controller to register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Validate input
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if company already exists
    let company = await Company.findOne({
      name: { $regex: `^${companyName}$`, $options: "i" },
    });
    if (company) {
      return res.status(400).json({
        message: "Company Already Exists.",
        success: false,
      });
    }

    // Create new company
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company Registered Successfully.",
      company,
      success: true,
    });
  } catch (error) {
    if (error.response?.data?.message === "Company Already Exists.") {
      return res.status(400).json({
        message: "Company Already Exists.",
        success: false,
      });
    } else {
      console.error("Error while creating new company", error);
      res.status(500).json({
        message: "Internal Server Error.",
        success: false,
      });
    }
  }
};

// Controller to get companies registered by the logged-in user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    // Fetch all companies associated with the user
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "No Company Found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

// Controller to get a specific company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find company by ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company Not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

// Controller to update company details, including logo upload to Cloudinary
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let logo = null;

    // Check if a file was uploaded
    if (req.file) {
      const fileUri = getDataUri(req.file);

      // Upload company logo to Cloudinary
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "Skill-Sphere/CompanyLogo",
      });

      logo = cloudResponse.secure_url;
    }

    // Prepare data to update
    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (logo) {
      updateData.logo = logo;
    }

    // Find and update company by ID
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company Not Found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Info Updated Successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
