import { a } from "@aws-amplify/backend";

export const Schedule = a
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
  .authorization((allow) => [allow.owner(), allow.groups(["admin"])]);
