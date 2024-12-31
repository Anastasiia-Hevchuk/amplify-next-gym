"use client";

import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { SignUpInput } from "aws-amplify/auth";

Amplify.configure(outputs);

export default function App() {
  const router = useRouter();
  const client = generateClient<Schema>();
  const { user, signOut } = useAuthenticator();
  console.log("🚀 ~ App ~ user:", user)
  const fetchTodos = async () => {
    let signUpData = {} as SignUpInput;
    const storedData = localStorage.getItem("signUpData");
    if (storedData) {
      signUpData = JSON.parse(storedData);
    }

    if (!signUpData.username) {
      return;
    }
    const role = signUpData.options?.userAttributes
      ? signUpData.options?.userAttributes["custom:role"]
      : "client";

    try {
      if (role === "client") {
        await client.models.Client.create({
          userId: signUpData.options?.userAttributes?.sub,
          email: signUpData.options?.userAttributes.email,
          name: signUpData.username,
          profilePictureUrl: "",
          gender: signUpData.options?.userAttributes.gender || "",
          birthdate: signUpData.options?.userAttributes.birthdate,
          preferences: [],
        });
        console.log("🚀 ~ Client data saved successfully (test).");
      } else {
        await client.models.Trainer.create({
          trainerId: signUpData.options?.userAttributes?.sub,
          email: signUpData.options?.userAttributes.email || "",
          name: signUpData.username,
          profilePictureUrl: "",
          gender: signUpData.options?.userAttributes.gender || "",
          birthdate: signUpData.options?.userAttributes.birthdate,
          skills: [],
          availability: [],
        });
        console.log("🚀 ~ Trainer data saved successfully (test).");
      }
    } catch (error) {
      console.error("🚀 ~ Error during test create:", error);
    }
    const data = await client.models.Trainer.list();
    console.log("🚀 ~ fetchTodos ~ clients:", data);
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  // useEffect(() => {
  //   async function redirectAfterLogin() {
  //     try {
  //       const user = await fetchUserAttributes();
  //       const role = user['custom:role'];

  //       if (role === 'trainer') {
  //         router.push('/setup/trainer-profile');
  //       } else if (role === 'client') {
  //         router.push('/setup/client-profile');
  //       } else {
  //         router.push('/');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //       router.push('/');
  //     }
  //   }

  //   redirectAfterLogin();
  // }, []);

  return (
    <main className="flex w-full">
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
      </div>
      <button
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        Sign out
      </button>
    </main>
  );
}
