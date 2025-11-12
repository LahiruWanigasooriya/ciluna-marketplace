import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, // Model name
      brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true }, // Associated brand
      isActive: { type: Boolean, default: true }, // Visibility toggle for admins
    },
    { timestamps: true }
  );
  
  const ModelModel = mongoose.models.Model || mongoose.model('Model', ModelSchema);
  export default ModelModel;
  