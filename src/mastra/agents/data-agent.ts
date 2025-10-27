import { Agent } from "@mastra/core";

export const dataAgent = new Agent({
  name: "DataAgent",
  instructions: `
You are a helpful data agent that can query and manage read/write sources such as Salesforce, YouTube, and Klaviyo via CData MCP.
Always respond with concise, clear summaries of actions.
  `,
});
