import React, { useEffect, useState } from "react";
import cn from "classnames";
import { Oval } from "react-loader-spinner";
import { Profile } from "@/types";
import { getProfile, updateProfile, uploadImage } from "@/firebase/database";
import { getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { action } from "@/redux";
import { useAppDispatch } from "@/hooks";

const ProfileDetails = ({ profile }: { profile: Profile }) => {
  const [resume, setResume] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setProfileImage(profile.profileImage);
    setResume(profile.resume);
  }, [profile]);

  const onUploadImage = async (file: File) => {
    try {
      if (file) {
        const filenameFragment = file.name.split(".");
        setIsImageUploading(true);
        const uploadRef = await uploadImage(
          file,
          `profile.${filenameFragment[filenameFragment.length - 1]}`,
          "profile"
        );
        const url = await getDownloadURL(uploadRef.ref);
        toast.success("Image Uploaded");
        setIsImageUploading(false);
        setProfileImage(url);
        setProfileImageFile(null);
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
            {profileImageFile !== null ? (
              <img
                className="object-contain w-full aspect-[16/10]"
                src={URL.createObjectURL(profileImageFile)}
                alt={`profile`}
              />
            ) : (
              <img
                className="object-contain w-full aspect-[16/10]"
                src={profileImage}
                alt={`profile`}
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="image-file-input"
            onChange={(e) => {
              if (!e.target.files) return;
              setProfileImageFile(e.target.files[0]);
            }}
            hidden
          />
          <label
            onClick={() => {
              // setImgButtonClicked(true);
            }}
            htmlFor={profileImageFile !== null ? "" : "image-file-input"}
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 text-gray-200",
              profileImageFile !== null
                ? "cursor-not-allowed bg-slate-400"
                : "cursor-pointer bg-slate-700"
            )}
          >
            Add Image
          </label>
          <button
            disabled={profileImageFile === null}
            onClick={() => onUploadImage(profileImageFile!)}
            className={cn(
              "flex flex-row items-center justify-center w-[150px] h-10 border",
              profileImageFile === null
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
              value={resume}
              onChange={(e) => {
                setResume(e.target.value);
              }}
              placeholder="Resume Link"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>

          <div className="w-full">
            <input
              value={profileImage}
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
              setProfileImage(profile.profileImage);
              setResume(profile.resume);
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-slate-700 border-2 border-slate-700"
            )}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const tempProfile: Profile = {
                profileImage: profileImage,
                resume: resume,
              };
              setIsProfileSaving(true);
              updateProfile(tempProfile).then(() => {
                (async () => {
                  toast.success("Project saved successfully");
                  const profile = await getProfile();
                  if (!profile) return;
                  dispatch(action.projects.setProfile(profile));
                })();
                setIsProfileSaving(false);
              });
            }}
            className={cn(
              "flex flex-row items-center justify-center w-[120px] h-12 text-lg text-gray-200 bg-slate-700"
            )}
          >
            {isProfileSaving ? (
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

export default ProfileDetails;
