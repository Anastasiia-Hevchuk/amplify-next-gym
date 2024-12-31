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
    "custom:age": {
      dataType: "Number",
      mutable: true,
      min: 8,
      max: 100,
    },
    "custom:name": {
      dataType: "String",
      mutable: true,
      maxLen: 100,
      minLen: 1,
    },
    "custom:gender": {
      dataType: "String",
      mutable: true,
      maxLen: 20,
      minLen: 1,
    },
  },
});
