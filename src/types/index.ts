export type Project = {
  id: string;
  title: string;
  image: string[];
  disc: string;
  type: "web" | "mobile";
  live: string;
  link: string;
  tags: string[];
};

export type Profile = {
  profileImage: string;
  resume: string;
};
