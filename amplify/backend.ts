import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { firstBucket, secondBucket } from "./storage/resource";

defineBackend({
  auth,
  data,
  firstBucket,
  secondBucket,
});
