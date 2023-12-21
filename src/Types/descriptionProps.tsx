export default interface DescriptionProps {
  description: string;
  smallDesc: boolean;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setSmallDesc: React.Dispatch<React.SetStateAction<boolean>>;
}
