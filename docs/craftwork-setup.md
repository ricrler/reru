# Craftwork in this project

## CLI (already run)

```bash
npx -y @craftwork-design/wizard@latest mcp add -y
npx -y @craftwork-design/wizard@latest add -y --agent cursor
```

- **MCP**: `https://craftwork.design/api/mcp` (OAuth in Cursor)
- **Skill**: `.agents/skills/craftwork-assets` (+ guide in `SKILL.md`)

## Components installed from Craftwork MCP

| Component | Source | Path |
|-----------|--------|------|
| Bento Grid | [Blank / bento-grid](https://craftwork.design/components/blank/bento-grid) | `components/ui/bento-grid.tsx` |
| Shiny Text | [Blank / shiny-text](https://craftwork.design/components/blank/shiny-text) | `components/ui/shiny-text.tsx` |

Used on the landing page in `components/landing/bento-product.tsx`.

## Dependency

- `motion` — required by Craftwork text/motion components

## Fetch more

In Cursor chat (with Craftwork MCP connected), ask to search `craftwork_find_components` or use the skill in `.agents/skills/craftwork-assets`.