import { useEffect } from "react";
import AuthorTitleProps from "../../Types/authortitleProps";

function AuthorTitle({
  setAuthor,
  author,
  setSmallAuthor,
  setmin2Words,
  min2Words,
  setOnlyGeo,
  onlyGeo,
  setSmallTitle,
  setTitle,
  title,
  smallAuthor,
  smallTitle,
}: AuthorTitleProps) {
  // ?? Setting changes to sessionstorage
  // ! Author
  useEffect(() => {
    // Small input
    author.replace(/\s/g, "").length < 4
      ? setSmallAuthor(true)
      : setSmallAuthor(false);

    // Not 2 words
    author.trim().split(" ").length < 2
      ? setmin2Words(false)
      : setmin2Words(true);

    // Only Georgian Alphabet
    const georgianRegex = /^[\u10A0-\u10FF\s]+$/;

    if (!georgianRegex.test(author)) {
      setOnlyGeo(false);
    } else {
      setOnlyGeo(true);
    }

    sessionStorage.setItem("author", author);
  }, [author, setAuthor, setOnlyGeo, setSmallAuthor, setmin2Words]);

  // !Title
  useEffect(() => {
    title.replace(/\s/g, "").length < 2
      ? setSmallTitle(true)
      : setSmallTitle(false);
    sessionStorage.setItem("title", title);
  }, [title, setSmallTitle]);

  // ?? Handle Changes
  // ! Handle Author Input
  function handleAuthor(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setAuthor(inpValue);
  }

  // ! Handle Title Input
  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const inpValue = e.target.value;
    setTitle(inpValue);
  }

  return (
    <>
      <div className="flex gap-addBlog">
        {/* Author */}
        <div className="flex-1">
          <label
            htmlFor="author"
            className="text-black_ text-normal font-500 leading-20"
          >
            ავტორი*
          </label>
          <input
            autoComplete="name"
            required
            className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input  focus:outline-none text-normal text-gray_ font-400 leading-20 ${
              author.trim().length > 0 && !smallAuthor && min2Words && onlyGeo
                ? "border-success bg-success_bg"
                : author.trim().length > 0
                ? "border-err bg-err_bg"
                : author.trim().length === 0 && "border-input_normal bg-inp_bg"
            }`}
            id="author"
            type="text"
            name="author"
            placeholder="შეიყვანეთ ავტორი"
            value={author}
            onChange={handleAuthor}
          />
          <ul className="list-disc text-gray_ text-12 font-400 leading-20 ml-[16px]">
            <li
              className={`${
                author.trim().length === 0
                  ? ""
                  : !smallAuthor
                  ? "text-success"
                  : "text-err"
              }`}
            >
              მინიმუმ 4 სიმბოლო
            </li>
            <li
              className={`${
                author.trim().length === 0
                  ? ""
                  : min2Words
                  ? "text-success"
                  : "text-err"
              }`}
            >
              მინიმუმ 2 სიტყვა
            </li>
            <li
              className={`${
                author.trim().length === 0
                  ? ""
                  : onlyGeo
                  ? "text-success"
                  : "text-err"
              }`}
            >
              მხოლოდ ქართული ასოები
            </li>
          </ul>
        </div>
        {/* Title */}
        <div className="flex-1">
          <label
            htmlFor="title"
            className="text-black_ text-normal font-500 leading-20"
          >
            სათაური*
          </label>
          <input
            required
            onChange={handleTitle}
            value={title}
            autoComplete="off"
            className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input focus:outline-none text-normal text-gray_ font-400 leading-20 ${
              title.length > 0 && !smallTitle
                ? "border-success bg-success_bg"
                : title.length > 0
                ? "border-err bg-err_bg"
                : "border-input_normal bg-inp_bg "
            }`}
            type="text"
            name="title"
            placeholder="შეიყვანეთ სათაური"
            id="title"
          />
          <ul className=" text-gray_ text-12 font-400 leading-20">
            <li
              className={`${
                title.trim().length === 0
                  ? ""
                  : !smallTitle
                  ? "text-success"
                  : "text-err"
              }`}
            >
              მინიმუმ 2 სიმბოლო
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AuthorTitle;
