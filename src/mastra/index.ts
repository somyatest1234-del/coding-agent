import { Mastra } from "@mastra/core";
import { dataAgent } from "./agents/data-agent.js";

const CDATA_TOKEN = process.env.CDATA_API_TOKEN ?? "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const MCP_URL = process.env.MCP_URL ?? "";

const mcpServers =
  ENABLE_MCP && CDATA_TOKEN
    ? [
        {
          name: "CDataMCP",
          type: "http",
          url: MCP_URL,
          auth: {
            type: "bearer",
            token: CDATA_TOKEN,
          },
        },
      ]
    : [];

export const mastra = new Mastra({
  agents: {
    dataAgent, // must have name: "DataAgent"
  },
  observability: {
    default: { enabled: true },
  },
  ...(mcpServers.length > 0 && {
    mcp: {
      enabled: true,
      servers: mcpServers,
    },
  }),
});

console.log("✅ Mastra initialized successfully", {
  MCP_ENABLED: ENABLE_MCP,
  MCP_URL,
  CDATA_CONFIGURED: !!CDATA_TOKEN,
});
