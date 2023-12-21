import Data from "./data";

type Posts = {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: Data;
  author: string;
};

export default Posts;