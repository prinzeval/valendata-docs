# Valendata docs

The source of [docs.valendata.com](https://docs.valendata.com), built with [Mintlify](https://mintlify.com).

- Pages are MDX files with YAML frontmatter. Navigation, colours, logo and redirects live in `docs.json`.
- `openapispec.json` is generated from the backend. Do not edit it by hand: in `valendata-be`, run
  `venv/bin/python scripts/export_public_openapi.py ../valendata-docs/openapispec.json`.
- `_reconcile.md` maps each API page to the backend code it was checked against.

## Preview

```bash
npm i -g mint
mint dev
```

Check links before you push:

```bash
mint broken-links
```

Changes pushed to the default branch go live through the Mintlify GitHub app.
