import { useEffect } from "react";
import error from "../../assets/images/error.svg";
import EmailBtnProps from "../../Types/EmailBtnProps";

function EmailBtn({
  email,
  setEmail,
  validEmail,
  setValidEmail,
  isEverithingOk,
  loadingRes,
  longEmail,
  setLongEmail,
}: EmailBtnProps) {
  // ?? Setting email to localstorage

  useEffect(() => {
    email.endsWith("@redberry.ge") ? setValidEmail(true) : setValidEmail(false);

    email.trim().split(" ").length !== 1
      ? setLongEmail(true)
      : setLongEmail(false);

    //Saving info in localstorage
    if (email.length === 0) {
      localStorage.removeItem("email");
    } else {
      localStorage.setItem("email", email);
    }
  }, [email, setValidEmail, setLongEmail]);
  // ! Handling User E-mail
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const inputVal = e.target.value;
    setEmail(inputVal);
  }
  return (
    <>
      <div className=" max-w-authorInp">
        <label
          htmlFor="e-mail"
          className="text-black_ text-normal font-500 leading-20"
        >
          ელ-ფოსტა
        </label>
        <input
          value={email}
          onChange={handleEmail}
          autoComplete="email"
          spellCheck={false}
          className={`my-[8px] w-full px-inp_x py-inp_y rounded-12 border-input focus:outline-none text-normal text-gray_ font-400 leading-20 focus:border-active_inp focus:bg-active_inp_bg ${
            email.trim().length > 0 && validEmail
              ? "border-success bg-success_bg"
              : email.trim().length > 0
              ? "border-err bg-err_bg"
              : email.trim().length === 0 &&
                "border-input_normal bg-inp_bg hover:bg-inp_bg_hover"
          }`}
          type="text"
          name="e-mail"
          placeholder="Example@redberry.ge"
          id="e-mail"
        />
        <div
          className={` gap-x-err ${
            (!validEmail && email.trim().length > 0) || longEmail
              ? "flex"
              : "hidden"
          }`}
        >
          <img height={20} width={20} src={error} alt="error" />
          <span className="font-normal text-err text-12 leading-20">
            {longEmail
              ? "მეილი უნდა შედგებოდეს ერთი სიტყვისგან"
              : !validEmail && "მეილი უნდა მთავრდებოდეს @redberry.ge-ით"}
          </span>
        </div>
      </div>
      {/* Submit Button */}
      <button
        disabled={!isEverithingOk || loadingRes}
        className="self-end w-full text-white bg-active_inp px-header_login_x py-header_login_y rounded-header_login max-w-authorInp disabled:bg-disabled_btn disabled:text-white disabled:cursor-not-allowed hover:bg-active_btn_hover"
        type="submit"
      >
        {loadingRes ? "ქვეყნდება..." : "გამოქვეყნება"}
      </button>
    </>
  );
}

export default EmailBtn;
