import React, { useEffect, useReducer, useState } from "react";
import cn from "classnames";
import TypeToggle from "./components/type-toggle";
import {
  action as localAction,
  initialState,
  reducer,
} from "@/reducers/projectReducer";
import ComboBox from "./components/combo-box";
import { Project } from "@/types";
import { getProjects, onPublish, uploadImage } from "@/firebase/database";
import { getDownloadURL } from "firebase/storage";
import { useAppDispatch } from "@/hooks";
import { action } from "@/redux";
import { toast } from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const ProjectDetails = ({ project }: { project: Project }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const [acitveImageIndex, setAcitveImageIndex] = useState(0);
  const [isImageUploading, setisImageUploading] = useState(false);
  const [isProjectSaving, setIsProjectSaving] = useState(false);
  const [imgButtonClicked, setImgButtonClicked] = useState<Boolean[]>(
    Array(project.image.length).fill(false)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    localDispatch(localAction.setProject(project));
    setAcitveImageIndex(0);
  }, [project]);

  const handleAddInput = () => {
    localDispatch(localAction.addImage(""));
    setImgButtonClicked([...imgButtonClicked, false]);
    localDispatch(localAction.addFileImage(new File([""], "file")));
    setAcitveImageIndex(state.images.length);
  };

  const onUploadImage = async (file: File) => {
    try {
      if (file) {
        const filenameFragment = file.name.split(".");
        setisImageUploading(true);
        const uploadRef = await uploadImage(
          file,
          `${project.title}-${acitveImageIndex}.${
            filenameFragment[filenameFragment.length - 1]
          }`,
          "projects-screenshots"
        );
        const url = await getDownloadURL(uploadRef.ref);
        toast.success("Image Uploaded");
        setisImageUploading(false);
        const tempImages = [...state.images];
        tempImages[acitveImageIndex] = url;
        localDispatch(localAction.setImages(tempImages));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-row w-full gap-2 h-full px-8 pb-8">
      <section className="w-[500px] h-full shrink-0 flex flex-col p-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="border border-gray-600 w-full aspect-[16/10]">
            {state.images[acitveImageIndex] === "" ? (
              state.fileImages[acitveImageIndex] && (
                <img
                  className="object-contain w-full aspect-[16/10]"
                  src={URL.createObjectURL(state.fileImages[acitveImageIndex])}
                  alt={`project-${acitveImageIndex}`}
                />
              )
            ) : (
              <img
                className="object-contain w-full aspect-[16/10]"
                src={state.images[acitveImageIndex]}
                alt={`project-${acitveImageIndex}`}
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2">
              {Array(state.images.length)
                .fill("a")
                .map((_, i) => (
                  <span
                    onClick={() => setAcitveImageIndex(i)}
                    key={`image-${i}`}
                    className={cn(
                      "w-4 h-4 aspect-square rounded-full",
                      acitveImageIndex === i ? "bg-sky-600" : "bg-sky-700"
                    )}
                  />
                ))}
            </div>
            <button
              onClick={() => handleAddInput()}
              className={cn(" rounded-full bg-slate-400 px-3 text-white")}
            >
              ADD
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            id="image-file-input"
            onChange={(e) => {
              if (!e.target.files) return;
              const tempFileImages = [...state.fileImages];
              tempFileImages[acitveImageIndex] = e.target.files[0];
              localDispatch(localAction.setFileImages(tempFileImages));
            }}
            hidden
          />
          <label
            onClick={() => {
              const tempButtonClicked = [...imgButtonClicked];
              tempButtonClicked[acitveImageIndex] = true;
              setImgButtonClicked(tempButtonClicked);
            }}
            htmlFor={
              state.images[acitveImageIndex] !== "" ? "" : "image-file-input"
            }
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 text-gray-200",
              state.images[acitveImageIndex] !== ""
                ? "cursor-not-allowed bg-slate-400"
                : "cursor-pointer bg-slate-700"
            )}
          >
            Add Image
          </label>
          <button
            disabled={state.images[acitveImageIndex] !== ""}
            onClick={() => onUploadImage(state.fileImages[acitveImageIndex])}
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 border ",
              state.images[acitveImageIndex] !== ""
                ? "border-slate-400 text-gray-400 cursor-not-allowed"
                : "border-slate-700 text-gray-800"
            )}
          >
            {isImageUploading ? (
              <Oval
                width={22}
                height={22}
                color="rgb(107 114 128)"
                secondaryColor="slate-500"
                strokeWidth={6}
              />
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
      </section>
      <section className="w-full h-full flex flex-col p-4">
        <h4 className="text-2xl font-medium tracking-wide font-Nunito mb-2">
          Metadata
        </h4>
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-row gap-4 w-full">
            <input
              type="text"
              value={state.title}
              onChange={(e) => {
                localDispatch(localAction.setTitle(e.target.value));
              }}
              placeholder="Title"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
            <TypeToggle
              value={state.type}
              onChange={(value) => localDispatch(localAction.setType(value))}
            />
          </div>
          <div className="w-full">
            <textarea
              value={state.description}
              onChange={(e) => {
                localDispatch(localAction.setDescription(e.target.value));
              }}
              placeholder="Description"
              draggable={false}
              rows={5}
              className={cn(
                "w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 py-2 text-lg resize-none"
              )}
            />
          </div>
          <div className="w-full">
            <input
              value={state.images[acitveImageIndex]}
              disabled
              type="text"
              placeholder="Image"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <ComboBox
            value={state.tags}
            onChange={(value) => {
              localDispatch(localAction.setTags(value));
            }}
          />
          <div className="w-full">
            <input
              type="text"
              value={state.link}
              onChange={(e) => {
                localDispatch(localAction.setLink(e.target.value));
              }}
              placeholder="Link"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              disabled={state.type === "mobile"}
              value={state.live}
              onChange={(e) => {
                localDispatch(localAction.setLive(e.target.value));
              }}
              placeholder="Live"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <button
            onClick={() => {
              localDispatch(localAction.setProject(project));
              setAcitveImageIndex(0);
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-slate-700 border-2 border-slate-700"
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const tempProject: Project = {
                ...project,
                title: state.title,
                image: state.images,
                disc: state.description,
                type: state.type,
                link: state.link,
                live: state.live,
                tags: state.tags.split(", "),
              };
              setIsProjectSaving(true);
              onPublish(tempProject).then(() => {
                (async () => {
                  toast.success("Project saved successfully");
                  const projects = await getProjects();
                  if (!projects) return;
                  dispatch(action.projects.setProjects(projects));
                })();
                setIsProjectSaving(false);
              });
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-gray-200 bg-slate-700"
            )}
          >
            {isProjectSaving ? (
              <Oval
                width={24}
                height={24}
                color="rgb(229 231 235)"
                secondaryColor="slate-500"
                strokeWidth={6}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
