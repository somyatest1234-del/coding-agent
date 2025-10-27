import { createAgent } from "@mastra/core";

export const dataAgent = createAgent({
  name: "dataAgent",
  description: "Agent that queries CData MCP sources like Salesforce, YouTube, and Klaviyo.",

  actions: {
    async querySource(ctx, { source, query }) {
      const tool = await ctx.tools.get(source);
      if (!tool) throw new Error(`Tool not found: ${source}`);

      const result = await tool.run({ query });
      return result;
    },
  },
});
