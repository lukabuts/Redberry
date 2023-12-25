import arrow from "../../assets/images/arrow.png";
import { Link } from "react-router-dom";
import PostProps from "../../Types/postProps";

function Post({
  img,
  author,
  date,
  id,
  title,
  desc,
  postCategories,
}: PostProps) {
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col gap-post w-post">
      {/* Img */}
      <div className="flex items-center justify-center overflow-hidden h-post_img rounded-12">
        <img src={img} alt={title} className="object-cover w-full h-full" />
      </div>
      {/* Info */}
      <div className="flex flex-col gap-post_info">
        {/* Author data */}
        <div>
          <h3 className="text-black_ text-16 font-500">{author}</h3>
          <span className="text-gray_ text-12 font-400">
            {date.split("-").reverse().join(".")}
          </span>
        </div>
        <div>
          <h4 className="text-black_ text-20 font-500 line-clamp-2">{title}</h4>
        </div>
        {/* Categoories */}
        <div className="flex flex-wrap gap-post_info">
          {postCategories.map((category) => {
            return (
              <div
                className="cursor-pointer rounded-component_item px-small_component_x py-small_component_y -500"
                key={category.id}
                style={{ background: category.background_color }}
              >
                <p className="text-12 " style={{ color: category.text_color }}>
                  {category.title}
                </p>
              </div>
            );
          })}
        </div>
        {/* Description */}
        <div>
          <p className="max-w-full overflow-hidden text-dark_gray text-16 font-400 leading-post_desc line-clamp-2">
            {desc}
          </p>
        </div>
        {/* See More */}
        <div>
          <button onClick={scrollTop}>
            <Link
              className="flex text-normal font-500 text-see_more"
              to={`/blog-${id}`}
            >
              სრულად ნახვა
              <img width={20} height={20} src={arrow} alt="arrow" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
