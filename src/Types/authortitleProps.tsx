export default interface AuthorTitleProps {
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  author: string;
  setSmallAuthor: React.Dispatch<React.SetStateAction<boolean>>;
  setmin2Words: React.Dispatch<React.SetStateAction<boolean>>;
  min2Words: boolean;
  setOnlyGeo: React.Dispatch<React.SetStateAction<boolean>>;
  onlyGeo: boolean;
  setSmallTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  smallAuthor: boolean;
  smallTitle: boolean;
}
