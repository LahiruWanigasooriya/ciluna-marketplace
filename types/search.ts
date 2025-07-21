import { ICategory } from "./category";
import { IProduct } from "./product";
import { ISubCategory } from "./subcategory";

export interface SearchResults {
    products: IProduct[];
    categories: ICategory[];
    subCategories: ISubCategory[];
    error?: string;
  }