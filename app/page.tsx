"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

export default function App() {
  const router = useRouter();

  const { signOut } = useAuthenticator();

  useEffect(() => {
    async function redirectAfterLogin() {
      try {
        const user = await fetchUserAttributes();
        const role = user['custom:role'];

        if (role === 'trainer') {
          router.push('/setup/trainer-profile');
        } else if (role === 'client') {
          router.push('/setup/client-profile');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/');
      }
    }

    redirectAfterLogin();
  }, []);

  return (
    <main className="flex w-full">
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
