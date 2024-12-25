"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import "./app.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import Navigation from "./components/navbar";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./common/Theme";

Amplify.configure(outputs);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html lang="en">
      <ThemeProvider theme={darkTheme}>
        <body className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
          <Authenticator
            signUpAttributes={["email", "name", "gender", "birthdate"]}
            components={{
              SignUp: {
                FormFields() {
                  return (
                    <>
                      <Authenticator.SignUp.FormFields />
                      <div className="mt-4">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="custom:role"
                          required
                          defaultValue="client"
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="trainer">Trainer</option>
                          <option value="client">Client</option>
                        </select>
                      </div>
                    </>
                  );
                },
              },
            }}
          >
            <Navigation />
            <main className="flex-1 flex flex-col p-4">{children}</main>
          </Authenticator>
        </body>
      </ThemeProvider>
    </html>
  );
}
