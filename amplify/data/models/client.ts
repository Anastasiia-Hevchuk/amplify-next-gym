import { a } from "@aws-amplify/backend";

export const Client = a
  .model({
    userId: a.id(),
    gym: a.belongsTo("Gym", "userId"),
    schedule: a.belongsTo("Schedule", "userId"),
    feedback: a.belongsTo("Feedback", "userId"),
    name: a.string(),
    email: a.string(),
    role: a.string(),
    gender: a.string(),
    birthdate: a.date(),
    profilePictureUrl: a.string(),
    preferences: a.string().array(),
  })
  .authorization((allow) => [allow.owner()]);
