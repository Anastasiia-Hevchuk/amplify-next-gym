import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Client: a
    .model({
      userId: a.id(),
      gym: a.belongsTo("Gym", "userId"),
      schedule: a.belongsTo("Schedule", "userId"),
      feedback: a.belongsTo("Feedback", "userId"),
      name: a.string(),
      email: a.string(),
      role: a.string(),
      profilePictureUrl: a.string(),
      preferences: a.string().array(),
    })
    .authorization((allow) => [allow.owner()]),

  Trainer: a
    .model({
      trainerId: a.id(),
      gym: a.belongsTo("Gym", "trainerId"),
      schedule: a.belongsTo("Schedule", "trainerId"),
      feedback: a.belongsTo("Feedback", "trainerId"),
      name: a.string(),
      email: a.string(),
      role: a.string(),
      bio: a.string(),
      profilePictureUrl: a.string(),
      skills: a.string().array(),
      availability: a.string().array(),
    })
    .authorization((allow) => [allow.owner(), allow.groups(["admin"])]),

  Gym: a
    .model({
      gymId: a.id(),
      name: a.string(),
      location: a.string(),
      description: a.string(),
      images: a.string().array(),
      trainers: a.hasMany("Trainer", "trainerId"),
      clients: a.hasMany("Client", "userId"),
    })
    .authorization((allow) => [allow.owner(), allow.groups(["admin"])]),

  Schedule: a
    .model({
      scheduleId: a.id(),
      trainer: a.hasMany("Trainer", "trainerId"),
      client: a.hasMany("Client", "userId"),
      feedback: a.hasMany("Feedback", "feedbackId"),
      date: a.string(),
      startTime: a.string(),
      endTime: a.string(),
      status: a.string(),
      notes: a
        .string()
        .authorization((allow) => [allow.owner(), allow.groups(["admin"])]),
    })
    .authorization((allow) => [allow.owner(), allow.groups(["admin"])]),

  Feedback: a
    .model({
      feedbackId: a.id(),
      trainer: a.hasMany("Trainer", "trainerId"),
      client: a.hasMany("Client", "userId"),
      session: a.belongsTo("Schedule", "feedbackId"),
      rating: a.integer(),
      comments: a.string(),
      sentiment: a.string(),
    })
    .authorization((allow) => [allow.owner(), allow.groups(["admin"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
