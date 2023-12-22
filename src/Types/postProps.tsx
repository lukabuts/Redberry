import Data from "./data";
export default interface PostProps {
  img: string;
  author: string;
  date: string;
  id: number;
  title: string;
  desc: string;
  postCategories: Data[];
}
