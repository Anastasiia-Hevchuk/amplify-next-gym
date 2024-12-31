import { a } from "@aws-amplify/backend";

export const Trainer = a
  .model({
    trainerId: a.id(),
    gym: a.belongsTo("Gym", "trainerId"),
    schedule: a.belongsTo("Schedule", "trainerId"),
    feedback: a.belongsTo("Feedback", "trainerId"),
    name: a.string(),
    email: a.string(),
    role: a.string(),
    bio: a.string(),
    birthdate: a.date(),
    gender: a.string(),
    profilePictureUrl: a.string(),
    skills: a.string().array(),
    availability: a.string().array(),
  })
  .authorization((allow) => [allow.owner(), allow.groups(["admin"])]);
