import mongoose, { Schema } from "mongoose";

const SearchQuerySchema: Schema = new Schema(
	{
		query: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

// Index for faster queries
SearchQuerySchema.index({ query: "text" });

const SearchQueryModel = mongoose.models.SearchQuery || mongoose.model("SearchQuery", SearchQuerySchema);
export default SearchQueryModel;
