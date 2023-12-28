import { Context } from "../../App";
import { useContext } from "react";
import Header from "../../Components/Header/Header";
import FormComponent from "../../Components/FormComponent/FormComponent";
import BackBtn from "../../Components/BackBtn/BackBtn";
import { Helmet } from "react-helmet";

function CreatePost() {
  const signedIn = useContext(Context);

  return (
    <div>
      <Header creatingPost={true} />
      <Helmet>
        <title>დაამატე ბლოგი</title>
      </Helmet>
      <BackBtn />
      {signedIn[0] ? (
        <FormComponent />
      ) : (
        <>
          <h1 className="mt-20 text-center text-err text-24">
            თქვენ არ ხართ სისტემაში შესული
          </h1>
        </>
      )}
    </div>
  );
}

export default CreatePost;
