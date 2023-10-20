import React, { useEffect, useReducer, useState } from "react";
import { Work } from "@/types";
import { Oval } from "react-loader-spinner";
import cn from "classnames";
import {
  action as localAction,
  initialState,
  reducer,
} from "@/reducers/workReducer";
import { getWorks, onPublishWork, uploadImage } from "@/firebase/database";
import { getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { action } from "@/redux";
import { useAppDispatch } from "@/hooks";
import { Plus } from "lucide-react";
import ComboBox from "./components/combo-box";

const WorkDetails = ({ work }: { work: Work }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const [isImageUploading, setisImageUploading] = useState(false);
  const [isWorkSaving, setIsWorkSaving] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    localDispatch(localAction.setWork(work));
  }, [work]);

  const onUploadImage = async (file: File) => {
    try {
      if (file) {
        const filenameFragment = file.name.split(".");
        setisImageUploading(true);
        const uploadRef = await uploadImage(
          file,
          `${work.company}-work.${
            filenameFragment[filenameFragment.length - 1]
          }`,
          "work-screenshots"
        );
        const url = await getDownloadURL(uploadRef.ref);
        toast.success("Image Uploaded");
        setisImageUploading(false);
        localDispatch(localAction.setImage(url));
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
            {state.image === "" ? (
              state.fileImage && (
                <img
                  className="object-contain w-full aspect-[16/10]"
                  src={URL.createObjectURL(state.fileImage)}
                  alt={`project-{acitveImageIndex}`}
                />
              )
            ) : (
              <img
                className="object-contain w-full aspect-[16/10]"
                src={state.image}
                alt={`project-{acitveImageIndex}`}
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="image-file-input"
            onChange={(e) => {
              if (!e.target.files) return;
              localDispatch(localAction.setFileImage(e.target.files[0]));
            }}
            hidden
          />
          <label
            onClick={() => {}}
            htmlFor={state.image !== "" ? "" : "image-file-input"}
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 text-gray-200",
              state.image !== ""
                ? "cursor-not-allowed bg-slate-400"
                : "cursor-pointer bg-slate-700"
            )}
          >
            Add Image
          </label>
          <button
            disabled={state.image !== ""}
            onClick={() => onUploadImage(state.fileImage)}
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 border ",
              state.image !== ""
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
              value={state.company}
              onChange={(e) => {
                localDispatch(localAction.setCompany(e.target.value));
              }}
              placeholder="Company"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={state.position}
              onChange={(e) => {
                localDispatch(localAction.setPosition(e.target.value));
              }}
              placeholder="Position"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={state.url}
              onChange={(e) => {
                localDispatch(localAction.setUrl(e.target.value));
              }}
              placeholder="Url"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <ComboBox
            value={state.stack}
            placeholder="Stack"
            onChange={(value) => {
              localDispatch(localAction.setStack(value));
            }}
          />
          <div className="flex flex-row gap-4 w-full">
            <input
              type="text"
              value={state.startDate}
              onChange={(e) => {
                localDispatch(localAction.setStartDate(e.target.value));
              }}
              placeholder="Start Date"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
            <input
              type="text"
              value={state.endDate}
              onChange={(e) => {
                localDispatch(localAction.setEndDate(e.target.value));
              }}
              placeholder="End Date"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <div className="flex flex-col gap-1 items-end w-full">
            {state.description.map((desc, index) => {
              return (
                <textarea
                  key={`description-${index}`}
                  value={desc}
                  onChange={(e) => {
                    localDispatch(
                      localAction.setDescription({
                        index,
                        value: e.target.value,
                      })
                    );
                  }}
                  placeholder="Description"
                  draggable={false}
                  rows={2}
                  className={cn(
                    "w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 py-2 text-lg resize-none"
                  )}
                />
              );
            })}
            <button
              disabled={state.description.length === 3}
              onClick={() => {
                if (state.description.length < 4) {
                  localDispatch(localAction.addDescription(""));
                }
              }}
              className={cn(
                "border-2 bg-white  p-1 rounded-md",
                state.description.length === 3
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-slate-700 text-gray-800"
              )}
            >
              <Plus />
            </button>
          </div>
          <div className="w-full">
            <input
              value={state.image}
              disabled
              type="text"
              placeholder="Image"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <button
            onClick={() => {
              localDispatch(localAction.setWork(work));
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-slate-700 border-2 border-slate-700"
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const tempWork = {
                ...work,
                ...state,
                stack: state.stack.split(", "),
                fileImage: undefined,
              };
              delete tempWork.fileImage;
              setIsWorkSaving(true);
              onPublishWork(tempWork).then(() => {
                (async () => {
                  toast.success("Work saved successfully");
                  const works = await getWorks();
                  if (!works) return;
                  dispatch(action.projects.setWorks(works));
                })();
                setIsWorkSaving(false);
              });
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-gray-200 bg-slate-700"
            )}
          >
            {isWorkSaving ? (
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

export default WorkDetails;
