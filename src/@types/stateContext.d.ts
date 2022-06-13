export type stateContext = {
  cActive: string;
  pActive: string;
  setCActive: React.Dispatch<React.SetStateAction<string>>;
  setPActive: React.Dispatch<React.SetStateAction<string>>;
  onLoad: () => void;
  projects: never[];
  curObject: any;
};
