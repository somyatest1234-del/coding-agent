import { Agent } from "@mastra/core";

export const dataAgent = new Agent({
  name: "DataAgent",
  instructions: `
You are a data assistant agent that can query and interact with read/write data sources such as Salesforce, YouTube, and Klaviyo via the CData MCP server.
`,
});
