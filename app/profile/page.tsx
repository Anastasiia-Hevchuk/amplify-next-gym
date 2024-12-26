"use client";

import React, { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

const UserProfile = () => {
  const [userAttributes, setUserAttributes] = useState<{
    email?: string;
    name?: string;
    gender?: string;
    birthdate?: string;
    role?: string;
  }>({});

  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "",
    birthdate: "",
    role: "",
  });

  // Fetch user data and set the state
  async function getUserData() {
    try {
      const attributes = await fetchUserAttributes();
      // Set user attributes
      setUserAttributes({
        email: attributes.email,
        name: attributes.name,
        gender: attributes.gender,
        birthdate: attributes.birthdate,
        role: attributes["custom:role"], // Access custom attributes
      });

      // Initialize the form data
      setFormData({
        email: attributes.email || "",
        name: attributes.name || "",
        gender: attributes.gender || "Male",
        birthdate: attributes.birthdate || "",
        role: attributes["custom:role"] || "Client",
      });
    } catch (error) {
      console.log("Error getting user data:", error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save the changes (for now, just log them)
  const saveChanges = () => {
    console.log("Updated data:", formData);
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 w-100% flex justify-center items-center">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full h-1/2">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={saveChanges}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
              Save
            </button>
          )}
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div className="border-t border-gray-200 py-4">
            <p className="text-sm font-medium text-gray-500">Name</p>
            {!isEditing ? (
              <p className="text-lg text-gray-800">
                {userAttributes.name || "N/A"}
              </p>
            ) : (
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>

          {/* Email */}
          <div className="border-t border-gray-200 py-4">
            <p className="text-sm font-medium text-gray-500">Email</p>
            {!isEditing ? (
              <p className="text-lg text-gray-800">
                {userAttributes.email || "N/A"}
              </p>
            ) : (
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>

          {/* Gender */}
          <div className="border-t border-gray-200 py-4">
            <p className="text-sm font-medium text-gray-500">Gender</p>
            {!isEditing ? (
              <p className="text-lg text-gray-800">
                {userAttributes.gender || "N/A"}
              </p>
            ) : (
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          </div>

          {/* Birthdate */}
          <div className="border-t border-gray-200 py-4">
            <p className="text-sm font-medium text-gray-500">Birthdate</p>
            {!isEditing ? (
              <p className="text-lg text-gray-800">
                {userAttributes.birthdate || "N/A"}
              </p>
            ) : (
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate || ""}
                onChange={handleInputChange}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>

          {/* Role (View Only) */}
          <div className="border-t border-gray-200 py-4">
            <p className="text-sm font-medium text-gray-500">Role</p>
            <p className="text-lg text-gray-800">
              {userAttributes.role || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
