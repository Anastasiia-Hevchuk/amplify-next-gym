import { a } from "@aws-amplify/backend";

export const Feedback = a
  .model({
    feedbackId: a.id(),
    trainer: a.hasMany("Trainer", "trainerId"),
    client: a.hasMany("Client", "userId"),
    session: a.belongsTo("Schedule", "feedbackId"),
    rating: a.integer(),
    comments: a.string(),
    sentiment: a.string(),
  })
  .authorization((allow) => [allow.owner(), allow.groups(["admin"])]);
