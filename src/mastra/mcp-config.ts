export const mcpConfig = {
  enabled: true,
  servers: [
    {
      name: "CData Managed",
      type: "http",
      url: "https://mcp.cloud.cdata.com/mcp",
      auth: {
        type: "bearer",
        token: process.env.CDATA_API_TOKEN || "",
      },
    },
  ],
};
