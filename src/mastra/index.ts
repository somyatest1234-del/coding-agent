import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { codingAgent } from "./agents/coding-agent";
import { mcpConfig } from "./mcp-config";

export const mastra = new Mastra({
  agents: { codingAgent },
  storage: new LibSQLStore({ url: "file:../.mastra.db" }),
  logger: { name: "Mastra", info: console.log, error: console.error, debug: console.debug },
  observability: { default: { enabled: true } },
  mcp: mcpConfig, // <— use the imported object directly
});
