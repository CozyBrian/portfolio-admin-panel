import { Project } from "@/types";

export const initialState = {
  title: "",
  description: "",
  type: "web" as "web" | "mobile",
  images: [""] as string[],
  fileImages: [new File([""], "file")] as File[],
  tags: "",
  link: "",
  live: "",
};

type ACTIONTYPE =
  | { type: "setTitle"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setType"; payload: "web" | "mobile" }
  | { type: "addImage"; payload: string }
  | { type: "setImage"; payload: string[] }
  | { type: "addFileImage"; payload: File }
  | { type: "setFileImages"; payload: File[] }
  | { type: "setTags"; payload: string }
  | { type: "setLink"; payload: string }
  | { type: "setLive"; payload: string }
  | { type: "setProject"; payload: Project };

export const action = {
  setTitle: (payload: string): ACTIONTYPE => ({ type: "setTitle", payload }),
  setDescription: (payload: string): ACTIONTYPE => ({
    type: "setDescription",
    payload,
  }),
  setType: (payload: "web" | "mobile"): ACTIONTYPE => ({
    type: "setType",
    payload,
  }),
  addImage: (payload: string): ACTIONTYPE => ({ type: "addImage", payload }),
  setImages: (payload: string[]): ACTIONTYPE => ({
    type: "setImage",
    payload,
  }),
  addFileImage: (payload: File): ACTIONTYPE => ({
    type: "addFileImage",
    payload,
  }),
  setFileImages: (payload: File[]): ACTIONTYPE => ({
    type: "setFileImages",
    payload,
  }),
  setTags: (payload: string): ACTIONTYPE => ({ type: "setTags", payload }),
  setLink: (payload: string): ACTIONTYPE => ({ type: "setLink", payload }),
  setLive: (payload: string): ACTIONTYPE => ({ type: "setLive", payload }),
  setProject: (payload: Project): ACTIONTYPE => ({
    type: "setProject",
    payload,
  }),
};

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "setTitle":
      return { ...state, title: action.payload };
    case "setDescription":
      return { ...state, description: action.payload };
    case "setType":
      return { ...state, type: action.payload };
    case "addImage":
      return { ...state, images: [...state.images, action.payload] };
    case "setImage":
      return { ...state, images: action.payload };
    case "addFileImage":
      return { ...state, fileImages: [...state.fileImages, action.payload] };
    case "setFileImages":
      return { ...state, fileImages: action.payload };
    case "setTags":
      return { ...state, tags: action.payload };
    case "setLink":
      return { ...state, link: action.payload };
    case "setLive":
      return { ...state, live: action.payload };
    case "setProject":
      return {
        title: action.payload.title,
        description: action.payload.disc,
        type: action.payload.type,
        images: action.payload.image,
        fileImages: Array(action.payload.image.length).fill(
          new File([""], "file")
        ),
        tags: action.payload.tags.join(", "),
        link: action.payload.link,
        live: action.payload.live,
      };
    default:
      return state;
  }
};
