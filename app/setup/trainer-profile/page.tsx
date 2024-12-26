"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { downloadData, uploadData } from "aws-amplify/storage";

const TrainerProfileSetup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = React.useState<any>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);

    const res = async () => {
      console.log("Complete File read successfully!", data.image[0]);
      try {
        await uploadData({
          data: data.image[0],
          path: `picture-submissions/${data.image[0].name}`,
          options: {
            bucket: "amplifyTeamDrive",
          },
        });
      } catch (e) {
        console.log("error", e);
      }
    };

    res();
  };

  try {
    const result = downloadData({
      path: "album/2024/1.jpg",
      options: {
        // Specify a target bucket using name assigned in Amplify Backend
        bucket: "secondBucket",
      },
    }).result;
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-md rounded">
      <h1 className="text-2xl font-semibold mb-4 text-black">
        Set Up Your Trainer Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <TextField
            {...register("bio", { required: "Bio is required" })}
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors.bio}
            // helperText={errors.bio?.message}
          />
        </div>
        <div className="mb-4">
          <TextField
            {...register("expertise", { required: "Expertise is required" })}
            label="Expertise"
            variant="outlined"
            fullWidth
            error={!!errors.expertise}
            // helperText={errors.expertise?.message}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            // onChange={handleImageChange}
            className="w-full border border-black p-2 rounded"
            {...register("image")}
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-black"
              />
            </div>
          )}
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default TrainerProfileSetup;
