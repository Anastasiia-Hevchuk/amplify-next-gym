import { a } from "@aws-amplify/backend";
import { Client } from "./client";
import { Trainer } from "./trainer";
import { Gym } from "./gym";
import { Schedule } from "./schedule";
import { Feedback } from "./feedback";

export const schema = a.schema({
  Client,
  Trainer,
  Gym,
  Schedule,
  Feedback,
});
