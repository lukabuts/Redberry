import Data from "./data";

export default interface PublishCategoryProps {
  setPublishDate: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<Data[]>>;
  setCategoriesFilter: React.Dispatch<React.SetStateAction<string>>;
  showCategories: boolean;
  categoriesFilter: string;
  publishDate: string;
  selectedCategories: number[];
  categories: Data[];
  loading: boolean;
}
