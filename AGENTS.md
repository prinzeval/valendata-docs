> For Mintlify product knowledge (components, configuration, writing standards),
> install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Use the Mintlify MCP server, `https://mcp.mintlify.com`, to edit content and settings via MCP
- Use the Mintlify docs MCP server, `https://www.mintlify.com/docs/mcp`, to query information about using Mintlify via MCP

## Terminology

- The product is **Valendata** (capital V, one word). Never "ValenData" or "Valendata AI".
- A **skill** is a saved task that returns rows. A **workflow** chains steps. A **run** is one execution.
- Pricing facts: new accounts get 100 free credits, no card; $1 = 100 credits. Plans are monthly subscriptions (Starter $10/mo = 1,000 credits a month, Growth $45/mo = 5,000, Pro $80/mo = 10,000; cancel any time, access to the end of the paid month). Top-ups are one-time, any amount, and top-up credits never expire. Never write "one-time packs", "no subscription", or "credits never expire" about plan credits.
- Check every fact against `valendata-be/app` before writing it.

## Style preferences

- Plain words, short sentences, true claims only. No emoji, no hype words ("seamless", "cutting-edge", "supercharge", "in seconds"), no made-up numbers.
- No uppercase eyebrow labels, badges, or sparkle icons.
- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references

## Content boundaries

- Document what users and developers can do: the app, the `/v1` API, and the MCP tools.
- Do not document the admin app or internal routes.
