import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      mutable: true,
      maxLen: 16,
      minLen: 1,
    },
  },
});
