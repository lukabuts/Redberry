import { useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import Data from "../../Types/Data";
import arrowImg from "../../assets/Arrow.png";
import { Link } from "react-router-dom";

function Post({
  img,
  author,
  date,
  id,
  title,
  desc,
  categories,
  categoriesData,
}: {
  img: string;
  author: string;
  date: string;
  id: number;
  title: string;
  desc: string;
  categories: string[];
  categoriesData: Data[];
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = categoriesData.filter((x) =>
      categories.includes(x.title)
    );
    setData(filteredData);

    // for (let i = 0; i < categories.length; i++) {
    //   console.log(categories[i]);
    // }
  }, []);
  return (
    <div className="flex flex-col gap-post max-w-post">
      {/* Img */}
      <div className="flex items-center justify-center overflow-hidden bg-gray-500 h-post_img rounded-post_img">
        <img src={img} alt={title} />
      </div>
      {/* Info */}
      <div className="flex flex-col gap-post_info">
        {/* Author data */}
        <div>
          <h4 className="text-black_ text-16 font-500">{author}</h4>
          <span className="text-gray_ text-12 font-400">{date}</span>
        </div>
        <div>
          <h2 className="text-black_ text-20 font-500 line-clamp-2">{title}</h2>
        </div>
        {/* Categoories */}
        <div className="flex flex-wrap gap-post_info">
          <Categories data={data} />
        </div>
        {/* Description */}
        <div>
          <p className="max-w-full overflow-hidden text-dark_gray text-16 font-400 leading-post_desc line-clamp-2">
            {desc}
          </p>
        </div>
        {/* See More */}
        <div>
          <button>
            <Link
              className="flex text-normal font-500 text-see_more"
              to="/blog"
            >
              სრულად ნახვა
              <img src={arrowImg} alt="arrow" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
