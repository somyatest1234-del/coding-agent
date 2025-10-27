import { Mastra } from "@mastra/core";
import { dataAgent } from "./agents/data-agent";

const CDATA_TOKEN = process.env.CDATA_API_TOKEN ?? "";
const ENABLE_MCP = process.env.ENABLE_MCP === "true";
const MCP_URL = process.env.MCP_URL ?? "https://mcp.cloud.cdata.com/mcp";

export const mastra = new Mastra({
  agents: {
    dataAgent, // must be defined
  },
  observability: {
    default: { enabled: true },
  },
  ...(ENABLE_MCP &&
    CDATA_TOKEN && {
      mcp: {
        enabled: true,
        servers: [
          {
            name: "CDataMCP",
            type: "http",
            url: MCP_URL,
            auth: {
              type: "bearer",
              token: CDATA_TOKEN,
            },
          },
        ],
      },
    }),
});

console.log("✅ Mastra initialized", {
  MCP_ENABLED: ENABLE_MCP,
  TOKEN_PRESENT: !!CDATA_TOKEN,
});
