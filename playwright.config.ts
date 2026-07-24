import { defineConfig } from "@playwright/test";

export default defineConfig({
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
  },
});