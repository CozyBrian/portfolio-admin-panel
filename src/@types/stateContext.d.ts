export type stateContext = {
  cActive: string;
  pActive: string;
  setCActive: React.Dispatch<React.SetStateAction<string>>;
  setPActive: React.Dispatch<React.SetStateAction<string>>;
  onLoad: () => void;
  projects: never[];
  curObject: any;
  uploadImage: (image: any) => void;
  title: string;
  image: any;
  link: string;
  disc: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setDisc: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
};
