import { Work } from "@/types";

const dummyFile = new File([""], "file");

export const initialState = {
  company: "",
  description: [""],
  position: "",
  endDate: "",
  startDate: "",
  url: "",
  stack: "",
  image: "",
  fileImage: dummyFile,
};

type ACTIONTYPE =
  | { type: "setCompany"; payload: string }
  | { type: "setDescriptions"; payload: string[] }
  | { type: "addDescription"; payload: string }
  | { type: "setDescription"; payload: { index: number; value: string } }
  | { type: "setPosition"; payload: string }
  | { type: "setUrl"; payload: string }
  | { type: "setStack"; payload: string }
  | { type: "setEndDate"; payload: string }
  | { type: "setStartDate"; payload: string }
  | { type: "setImage"; payload: string }
  | { type: "setFileImage"; payload: File }
  | { type: "setWork"; payload: Work };

export const action = {
  setCompany: (payload: string): ACTIONTYPE => ({
    type: "setCompany",
    payload,
  }),
  setDescriptions: (payload: string[]): ACTIONTYPE => ({
    type: "setDescriptions",
    payload,
  }),
  addDescription: (payload: string): ACTIONTYPE => ({
    type: "addDescription",
    payload,
  }),
  setDescription: (payload: { index: number; value: string }): ACTIONTYPE => ({
    type: "setDescription",
    payload,
  }),
  setPosition: (payload: string): ACTIONTYPE => ({
    type: "setPosition",
    payload,
  }),
  setUrl: (payload: string): ACTIONTYPE => ({
    type: "setUrl",
    payload,
  }),
  setStack: (payload: string): ACTIONTYPE => ({
    type: "setStack",
    payload,
  }),
  setEndDate: (payload: string): ACTIONTYPE => ({
    type: "setEndDate",
    payload,
  }),
  setStartDate: (payload: string): ACTIONTYPE => ({
    type: "setStartDate",
    payload,
  }),
  setImage: (payload: string): ACTIONTYPE => ({ type: "setImage", payload }),
  setFileImage: (payload: File): ACTIONTYPE => ({
    type: "setFileImage",
    payload,
  }),
  setWork: (payload: Work): ACTIONTYPE => ({ type: "setWork", payload }),
};

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "setCompany":
      return { ...state, company: action.payload };
    case "setDescriptions":
      return { ...state, description: action.payload };
    case "addDescription":
      return { ...state, description: [...state.description, action.payload] };
    case "setDescription":
      let description = [...state.description];
      description[action.payload.index] = action.payload.value;
      return { ...state, description: [...description] };
    case "setPosition":
      return { ...state, position: action.payload };
    case "setUrl":
      return { ...state, url: action.payload };
    case "setStack":
      return { ...state, stack: action.payload };
    case "setEndDate":
      return { ...state, endDate: action.payload };
    case "setStartDate":
      return { ...state, startDate: action.payload };
    case "setImage":
      return { ...state, image: action.payload };
    case "setFileImage":
      return { ...state, fileImage: action.payload };
    case "setWork":
      return {
        company: action.payload.company,
        description: action.payload.description,
        position: action.payload.position,
        endDate: action.payload.endDate,
        startDate: action.payload.startDate,
        url: action.payload.url || "",
        stack: (action.payload.stack || []).join(","),
        image: action.payload.image,
        fileImage: dummyFile,
      };
    default:
      return state;
  }
};
