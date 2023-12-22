export default interface EmailBtnProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  validEmail: boolean;
  setValidEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isEverithingOk: boolean;
  loadingRes: boolean;
}
