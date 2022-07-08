import { project } from "./project";

export type stateContext = {
  cActive: string;
  pActive: string;
  setCActive: React.Dispatch<React.SetStateAction<string>>;
  setPActive: React.Dispatch<React.SetStateAction<string>>;
  onLoad: () => void;
  projects: project[];
  curObject: project;
  uploadImage: (image: any) => void;
  title: string;
  image: any;
  link: string;
  disc: string;
  selected: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setDisc: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  newProject: () => void;
  publish: () => void;
  onDelete: () => void;
  imgButtonClicked: boolean;
  setImgButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
