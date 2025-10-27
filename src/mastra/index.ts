import { Mastra } from "@mastra/core";
import { dataAgent } from "./agents/data-agent.js";

const CDATA_TOKEN = process.env.CDATA_API_TOKEN ?? "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const MCP_URL = process.env.MCP_URL ?? "";

const mcpServers =
  ENABLE_MCP && CDATA_TOKEN
    ? [
        {
          name: "CData MCP Server",
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
  agents: { dataAgent },
  logger: {
    name: "MastraLogger",
    info: console.log,
    error: console.error,
    debug: console.debug,
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

console.log("✅ Mastra initialized with MCP:", {
  ENABLE_MCP,
  MCP_URL,
  mcpConfigured: mcpServers.length > 0,
});
