"use server"
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import ModelModel from "@/models/model";
import { CreateModelParams, GetModelParams } from "@/types/model";
import '@/models/brand'; 


export const getAllModels = async ({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetModelParams) => {
  try {
    await dbConnectMarketPlace();

    // Build query object
    const query: any = {};

    // Add search functionality (search in name or description)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search
      ];
    }

    // Determine sorting order
    const sortOptions: Record<string, any> = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Fetch models with filters, search, and pagination
    const models = await ModelModel.find(query)
      .sort(sortOptions) // Sort by specified field
      .skip(skip) // Skip documents for pagination
      .limit(limit) // Limit number of documents
      .populate("brand", "name"); // Populate associated brand name

    // Total count for pagination
    const total = await ModelModel.countDocuments(query);

    return {
      status: 200,
      success: true,
      message: "Models fetched successfully",
      data: {
        models: JSON.parse(JSON.stringify(models)), // Ensure serializability
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching models",
      error: error.message,
    };
  }
};

export const getModelById = async (modelId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!modelId) {
      return {
        status: 400,
        success: false,
        message: "Model ID is required",
      };
    }

    // Find the product and populate related fields
    const model = await ModelModel.findById(modelId)
    .populate("brand", "name")
    if (!model) {
      return {
        status: 404,
        success: false,
        message: "Model not found",
      };
    }


    return {
      status: 200,
      success: true,
      message: "Model fetched successfully",
      data: {
        product: JSON.parse(JSON.stringify(model)), 

      },
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while fetching the model",
      error: error.message,
    };
  }
};

export const createModel = async (modelData: CreateModelParams) => {
  try {
    await dbConnectMarketPlace();

    // Validate required fields
    const { name, brand } = modelData;
    if (!name || !brand) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name or brand",
      };
    }

    // Check if the model name already exists for the brand
    const existingModel = await ModelModel.findOne({ name, brand });
    if (existingModel) {
      return {
        status: 400,
        success: false,
        message: "Model with this name already exists for the brand",
      };
    }

    // Create a new model
    const newModel = new ModelModel({
      ...modelData,
    });

    const savedModel = await newModel.save();

    return {
      status: 201,
      success: true,
      message: "Model created successfully",
      data: JSON.parse(JSON.stringify(savedModel)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while creating the model",
      error: error.message,
    };
  }
};

export const updateModel = async (modelId: string, modelData: CreateModelParams) => {
  try {
    await dbConnectMarketPlace();


    const { name, brand, isActive } = modelData;
    if (!name || !brand || !isActive) {
      return {
        status: 400,
        success: false,
        message: "Missing required fields: name, brand, or Active status",
      };
    }

    const existingBrand = await ModelModel.findById(modelId);
    if (!existingBrand) {
      return {
        status: 404,
        success: false,
        message: "Modek not found",
      };
    }

    const nameConflict = await ModelModel.findOne({ name, _id: { $ne: modelId } });
    if (nameConflict) {
      return {
        status: 400,
        success: false,
        message: "Model with this name already exists",
      };
    }

    const updatedModel = await ModelModel.findByIdAndUpdate(
      modelId,
      { ...modelData },
      { new: true }
    );

    return {
      status: 200,
      success: true,
      message: "Model updated successfully",
      data: JSON.parse(JSON.stringify(updatedModel)),
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while updating the model",
      error: error.message,
    };
  }
};

export const deleteModel = async (modelId: string) => {
  try {
    await dbConnectMarketPlace();

    if (!modelId) {
      return {
        status: 400,
        success: false,
        message: "Category ID is required",
      };
    }

    const model = await ModelModel.findById(modelId);
    if (!model) {
      return {
        status: 404,
        success: false,
        message: "Brand not found",
      };
    }
    await ModelModel.findByIdAndDelete(model);


    return {
      status: 200,
      success: true,
      message: "Model deleted successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      success: false,
      message: "An error occurred while deleting the model",
      error: error.message,
    };
  }
}
