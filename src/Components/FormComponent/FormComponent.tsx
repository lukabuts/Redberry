import { useEffect, useState, useContext } from "react";
import Data from "../../Types/data";
import Image from "../FormComponents/Image";
import AuthorTitle from "../FormComponents/AuthorTitle";
import Description from "../FormComponents/Description";
import PublishCategory from "../FormComponents/PublishCategory";
import EmailBtn from "../FormComponents/EmailBtn";
import Notification from "../FormComponents/Notification";
import { TokenContext } from "../../App";
import axios from "axios";

function NewBlogInfo() {
  // Image
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  // Author
  const [author, setAuthor] = useState(localStorage.getItem("author") || "");
  const [smallAuthor, setSmallAuthor] = useState(false);
  const [min2Words, setmin2Words] = useState(false);
  const [onlyGeo, setOnlyGeo] = useState(true);
  // Title
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [smallTitle, setSmallTitle] = useState(false);
  // Description
  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  const [smallDesc, setSmallDesc] = useState(false);
  // Publish Date
  const [publishDate, setPublishDate] = useState(
    localStorage.getItem("publishDate") || ""
  );
  // Categories
  const savedSelectedCategories = localStorage.getItem("selectedCategories");
  const parsedSavedSelectedCategories = savedSelectedCategories
    ? JSON.parse(savedSelectedCategories)
    : null;
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    parsedSavedSelectedCategories || []
  );

  const savedCategories = localStorage.getItem("categories");
  const parsedSavedCategories = savedCategories
    ? JSON.parse(savedCategories)
    : null;
  const [categories, setCategories] = useState<Data[]>(
    parsedSavedCategories || []
  );

  const [categoriesFilter, setCategoriesFilter] = useState(
    localStorage.getItem("categoriesFilter") || ""
  );
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  // E-mail
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [validEmail, setValidEmail] = useState(false);
  const [longEmail, setLongEmail] = useState(false);
  // Check if everithing is OK
  const [isEverithingOk, setIsEverithingOk] = useState(false);
  // Success
  const [success, setSuccess] = useState(false);
  // Loading Upload
  const [loadingRes, setLoadingRes] = useState(false);
  // Error While uploading
  const [resultError, setResultError] = useState(false);
  // Show Popup
  const [activePopup, setActivePopup] = useState(false);
  // Token
  const token = useContext(TokenContext);

  useEffect(() => {
    // Avoid Scrolling While Popup is active
    const body = document.getElementById("body");
    if (!body) return;
    else if (!activePopup) {
      body.classList.contains("overflow-hidden") &&
        body.classList.remove("overflow-hidden");
    } else if (activePopup) {
      !body.classList.contains("overflow-hidden") &&
        body.classList.add("overflow-hidden");
    }
  }, [activePopup]);

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
      (email.length === 0 || (email.length > 0 && validEmail && !longEmail)) &&
      image &&
      !imageError
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
    image,
    imageError,
    longEmail,
  ]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", author);
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("description", description);
    image !== null && formData.append("image", image);
    formData.append("publish_date", publishDate);
    formData.append("title", title);
    formData.append("email", email);

    setLoadingRes(true);
    axios
      .post("https://api.blog.redberryinternship.ge/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuccess(true);
        setResultError(false);
        // Removing items from localstorage
        localStorage.removeItem("image");
        localStorage.removeItem("imageName");
        setImage(null);
        setAuthor("");
        setTitle("");
        setDescription("");
        setPublishDate("");
        setEmail("");
        setSelectedCategories([]);
        setCategories([]);
      })
      .catch((err) => {
        console.log("Error uploading blog:", err);
        setResultError(true);
        setSuccess(false);
      })
      .finally(() => {
        setLoadingRes(false);
        setActivePopup(true);
      });
  }

  return (
    <div className="flex flex-col w-full m-auto gap-blog max-w-blog my-newBlogCont">
      <h1 className="text-black_ text-32 font-700 leading-40">
        ბლოგის დამატება
      </h1>

      {/* Show the message */}
      {activePopup && (
        <Notification
          resultError={resultError}
          success={success}
          message={
            resultError ? "ბლოგი ვერ აიტვირთა" : "ჩანაწი წარმატებით დაემატა"
          }
          buttonInput={
            resultError ? "სცადეთ ხელახლა" : "მთავარ გვერდზე დაბრუნება"
          }
          setActivePopup={setActivePopup}
        />
      )}

      <form className="flex flex-col gap-addBlog" onSubmit={handleSubmit}>
        {/* Image */}
        <Image
          setImage={setImage}
          setImageError={setImageError}
          imageError={imageError}
          image={image}
        />
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
          setLoadingCategories={setLoadingCategories}
          setCategories={setCategories}
          publishDate={publishDate}
          setCategoriesFilter={setCategoriesFilter}
          showCategories={showCategories}
          loadingCategories={loadingCategories}
          categoriesFilter={categoriesFilter}
        />

        {/* E-mail */}
        <EmailBtn
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
          setValidEmail={setValidEmail}
          isEverithingOk={isEverithingOk}
          loadingRes={loadingRes}
          setLongEmail={setLongEmail}
          longEmail={longEmail}
        />
      </form>
    </div>
  );
}

export default NewBlogInfo;
