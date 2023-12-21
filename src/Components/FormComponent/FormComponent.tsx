import { useEffect, useState } from "react";
import Data from "../../Types/data";
import Image from "./Image";
import AuthorTitle from "./AuthorTitle";
import Description from "./Description";
import PublishCategory from "./PublishCategory";
import EmailBtn from "./EmailBtn";
import Success from "./Success";

function NewBlogInfo() {
  // Image
  // Author
  const [author, setAuthor] = useState(sessionStorage.getItem("author") || "");
  const [smallAuthor, setSmallAuthor] = useState(false);
  const [min2Words, setmin2Words] = useState(false);
  const [onlyGeo, setOnlyGeo] = useState(true);
  // Title
  const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
  const [smallTitle, setSmallTitle] = useState(false);
  // Description
  const [description, setDescription] = useState(
    sessionStorage.getItem("description") || ""
  );
  const [smallDesc, setSmallDesc] = useState(false);
  // Publish Date
  const [publishDate, setPublishDate] = useState(
    sessionStorage.getItem("publishDate") || ""
  );
  // Categories
  const savedSelectedCategories: any =
    sessionStorage.getItem("selectedCategories");
  const savedCategories: any = sessionStorage.getItem("categories");
  const [categories, setCategories] = useState<Data[]>(
    JSON.parse(savedCategories) || []
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    JSON.parse(savedSelectedCategories) || []
  );
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  // E-mail
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [validEmail, setValidEmail] = useState(false);
  // Check if everithing is OK
  const [isEverithingOk, setIsEverithingOk] = useState(false);
  // Success
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Clearing SessionStorage
    sessionStorage.clear();
    // Avoid Scrolling While Popup is active
    const body = document.getElementById("body");
    if (!body) return;
    else if (!success) {
      body.classList.contains("overflow-hidden") &&
        body.classList.remove("overflow-hidden");
    } else if (success) {
      !body.classList.contains("overflow-hidden") &&
        body.classList.add("overflow-hidden");
    }
  }, [success]);

  // ! Is everithing ok?
  useEffect(() => {
    if (
      author.trim().length > 0 &&
      !smallAuthor &&
      min2Words &&
      onlyGeo &&
      title.trim().length > 0 &&
      !smallTitle &&
      description.trim().length > 0 &&
      !smallDesc &&
      publishDate.length > 0 &&
      selectedCategories.length > 0 &&
      (email.length === 0 || (email.length > 0 && validEmail))
    ) {
      setIsEverithingOk(true);
    } else {
      setIsEverithingOk(false);
    }
  }, [
    author,
    smallAuthor,
    min2Words,
    onlyGeo,
    title,
    smallTitle,
    description,
    smallDesc,
    publishDate,
    selectedCategories,
    email,
    validEmail,
  ]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
  }

  return (
    <div className="flex flex-col w-full m-auto gap-blog max-w-blog my-newBlogCont">
      <h1 className="text-black_ text-32 font-700 leading-40">
        ბლოგის დამატება
      </h1>

      {/* Success MSG */}
      {success ? <Success /> : ""}

      <form className="flex flex-col gap-addBlog" onSubmit={handleSubmit}>
        {/* Image */}
        <Image />
        {/* Author, Title */}
        <AuthorTitle
          setAuthor={setAuthor}
          author={author}
          setSmallAuthor={setSmallAuthor}
          setmin2Words={setmin2Words}
          min2Words={min2Words}
          setOnlyGeo={setOnlyGeo}
          onlyGeo={onlyGeo}
          setSmallTitle={setSmallTitle}
          setTitle={setTitle}
          title={title}
          smallAuthor={smallAuthor}
          smallTitle={smallTitle}
        />
        {/* Description */}
        <Description
          description={description}
          smallDesc={smallDesc}
          setDescription={setDescription}
          setSmallDesc={setSmallDesc}
        />
        {/* Publish Date and Category */}
        <PublishCategory
          setPublishDate={setPublishDate}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setShowCategories={setShowCategories}
          categories={categories}
          setLoading={setLoading}
          setCategories={setCategories}
          publishDate={publishDate}
          setCategoriesFilter={setCategoriesFilter}
          showCategories={showCategories}
          loading={loading}
          categoriesFilter={categoriesFilter}
        />

        {/* E-mail */}
        <EmailBtn
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
          setValidEmail={setValidEmail}
          isEverithingOk={isEverithingOk}
        />
      </form>
    </div>
  );
}

export default NewBlogInfo;
