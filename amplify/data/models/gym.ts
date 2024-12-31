import { a } from "@aws-amplify/backend";

export const Gym = a
  .model({
    gymId: a.id(),
    name: a.string(),
    location: a.string(),
    description: a.string(),
    images: a.string().array(),
    trainers: a.hasMany("Trainer", "trainerId"),
    clients: a.hasMany("Client", "userId"),
  })
  .authorization((allow) => [allow.owner(), allow.groups(["admin"])]);
