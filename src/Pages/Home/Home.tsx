import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../../Components/Categories/Categories";
import Header from "../../Components/Header/Header";
import blogLogo from "../../assets/images/blog-bg.svg";
import Post from "../../Components/Post/Post";
// !!! Delete this image
import testImg from "../../assets/images/test.svg";

function Home() {
  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("filters")) || []
  );
  useEffect(() => {
    axios
      .get("https://api.blog.redberryinternship.ge/api/categories")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      {/* Content Container */}
      <div className=" px-main mt-home_container_t py-content_y">
        {/* ბლოგი სათაური */}
        <div className="flex items-center justify-between mb-[64px] overflow-hidden">
          <h1 className="text-black_ text-64 font-700 leading-72 ml-[13px]">
            ბლოგი
          </h1>
          <img src={blogLogo} alt="" />
        </div>
        {/* Categories */}
        <div className="flex flex-wrap content-center justify-center gap-components mb-home_container_t">
          <Categories
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            data={data}
          />
        </div>

        {/* Posts */}
        <div className="flex flex-wrap items-center justify-center gap-x-post_container_x gap-y-post_container_y">
          <Post
            img={testImg}
            author={"ლილე კვარაცხელია"}
            date={"02.11.2023"}
            id={1}
            title={"EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა"}
            desc={
              "6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს მიენიჭა უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური ენერგია პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის ხელოვნების უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა თქმა უნდა, ეს ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების გამოსატანად. სანაცვლოდ, მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის სხვადასხვა მუსიკა მოასმენინონ რამდენიმე ყველს და უკვე ისინი შეაჯიბრონ ერთმანეთს. აქვე საგულისხმოა, რომ როგორც ბერნის მეცნიერები განმარტავენ, ექსპერიმენტს საფუძვლად არა ყველის გაუმჯობესებული წარმოება, არამედ კულტურული საკითხები დაედო. მათი თქმით, ადამიანებს უყვართ ყველი და მუსიკა, ამიტომაც საინტერესოა ამ ორის კავშირის დანახვა."
            }
            categories={[
              "აპლიკაცია",
              "მარკეტი",
              "ხელოვნური ინტელექტი",
              "UI/UX",
              "კვლევა",
            ]}
            categoriesData={data}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
