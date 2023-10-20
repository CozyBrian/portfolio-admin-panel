export type Project = {
  id: string;
  title: string;
  image: string[];
  disc: string;
  type: "web" | "mobile";
  live: string;
  link: string;
  tags: string[];
  pos: number | undefined;
};

export type Work = {
  id: string;
  pos: number | undefined;
  company: string;
  url: string;
  position: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string[];
  stack: string[];
};

export type Profile = {
  profileImage: string;
  resume: string;
};
