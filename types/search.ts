import { ICategory } from "./category";
import { IProduct } from "./product";
import { ISubCategory } from "./subcategory";
import { ISubSubCategory } from "./subsubcategory";

export interface SearchResults {
    products: IProduct[];
    categories: ICategory[];
    subCategories: ISubCategory[];
    subsubCategories: ISubSubCategory[];
    error?: string;
  }