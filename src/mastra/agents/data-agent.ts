import { Agent } from "@mastra/core";

export const dataAgent = new Agent({
  name: "DataAgent",
  instructions: `
    You are a helpful data assistant. You can query read/write data sources such as Salesforce, YouTube, and Klaviyo using CData MCP connections.
    Respond with structured, concise outputs.
  `,
});
