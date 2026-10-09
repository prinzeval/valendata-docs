# Reconcile checklist (internal, not in nav, ignored by Mintlify)

Status 2026-10-06: **all pages reconciled** against valendata-be (manage/*, workflows/api/*, api/v1_schedules.py,
account_api/*, mcp/*_tools.py, mcp/constants.py, mcp/auth.py) and its live `/openapi.json`.
No `{/* reconcile */}` markers remain. Re-check a row here when its route changes.

| Page | Method and path | Source of truth |
| --- | --- | --- |
| api-reference/skills/list.mdx | GET /v1/skills (q, status, limit 1–100 default 50, cursor → `skills`, `next_cursor`) | published_skills/manage/router.py |
| api-reference/skills/create.mdx | POST /v1/skills | skill_creation/router.py |
| api-reference/skills/get-creation.mdx | GET /v1/skill-creations/{creation_id} | skill_creation/router.py |
| api-reference/skills/list-creations.mdx | GET /v1/skill-creations (status comma list or `active`, limit 20 max 100, cursor → `data`, `next_cursor`, `has_more`). Manual `api:` page until the spec has the route; then switch to `openapi:` | skill_creation/router.py |
| api-reference/skills/get.mdx | GET /v1/skills/{slug} (+ `price`) | execute_router.py, published_skills/price/* |
| api-reference/skills/update.mdx | PATCH /v1/skills/{slug} (SkillPatch → SkillEditResult: GET shape + changes, warnings, login) | manage/schemas.py, edit.py |
| api-reference/skills/delete.mdx | DELETE /v1/skills/{slug}?force (409 lists workflows; runs kept) | manage/delete.py |
| api-reference/skills/health.mdx | GET /v1/skills/{slug}/health | execute_router.py |
| api-reference/marketplace/search.mdx | GET /v1/marketplace/search (q 2–300, site, category, limit 1–50 default 10, kind skill/workflow; public, `skills:read` / `workflows:read` adds yours) | published_skills/search/*, price/*, workflows/marketplace_public.py |
| api-reference/runs/run-skill.mdx | POST /v1/skills/{slug}/run | execute_router.py |
| api-reference/runs/start-skill-run.mdx | POST /v1/skills/{slug}/runs | async_runs/router.py |
| api-reference/runs/list-skill-runs.mdx | GET /v1/skills/{slug}/runs (status, since, limit 50, cursor) | manage/runs.py |
| api-reference/runs/run-workflow.mdx | POST /v1/workflows/{slug}/run | workflows/api/router.py |
| api-reference/runs/start-workflow-run.mdx | POST /v1/workflows/{slug}/runs | workflows/api/router.py |
| api-reference/runs/list-workflow-runs.mdx | GET /v1/workflows/{slug}/runs (status, source, since, until, limit 25, cursor) | workflows/api/run_list.py |
| api-reference/runs/get.mdx | GET /v1/runs/{run_id} (skill `run_…` or workflow) | async_runs/router.py, run_dispatch.py |
| api-reference/runs/cancel.mdx | POST /v1/runs/{run_id}/cancel | manage/router.py, run_dispatch.py |
| api-reference/runs/send-code.mdx | POST /v1/runs/{run_id}/otp | logins/router.py |
| api-reference/versions/*.mdx | /v1/skills/{slug}/versions…, /pin | recipe_versions/router.py |
| api-reference/improvements/*.mdx | /v1/skills/{slug}/improve, /improvements, /v1/skill-improvements/{id} | improvements/router.py |
| api-reference/schedules/list.mdx | GET /v1/schedules (?kind) | api/v1_schedules.py |
| api-reference/schedules/get.mdx | GET /v1/schedules/{schedule_id} | api/v1_schedules.py |
| api-reference/schedules/list-skill-schedules.mdx | GET /v1/skills/{slug}/schedules (0 or 1) | manage/schedules/service.py |
| api-reference/schedules/create-skill-schedule.mdx | POST /v1/skills/{slug}/schedules (cron or every, timezone, inputs, max_results, enabled; 409) | manage/schedules/service.py |
| api-reference/schedules/list-workflow-schedules.mdx | GET /v1/workflows/{slug}/schedules | workflows/api/schedules_router.py |
| api-reference/schedules/create-workflow-schedule.mdx | POST /v1/workflows/{slug}/schedules (409; +workflows:invoke when enabled) | workflows/api/schedules_router.py |
| api-reference/schedules/update.mdx | PATCH /v1/schedules/{schedule_id} (sklsch_ / wfsch_) | api/v1_schedules.py |
| api-reference/schedules/delete.mdx | DELETE /v1/schedules/{schedule_id} | api/v1_schedules.py |
| api-reference/workflows/list.mdx | GET /v1/workflows (q, limit 25, cursor) | workflows/api/manage_router.py |
| api-reference/workflows/create.mdx | POST /v1/workflows | workflows/api/manage_schemas.py |
| api-reference/workflows/get.mdx | GET /v1/workflows/{slug} (?include_graph; + `price`, `yours`; public: `public_view`, `clone_url`, no graph) | workflows/api/router.py, workflows/api/public_info.py |
| api-reference/workflows/update.mdx | PATCH /v1/workflows/{slug} | workflows/api/manage.py |
| api-reference/workflows/delete.mdx | DELETE /v1/workflows/{slug} (runs deleted with it) | workflows/api/manage.py |
| api-reference/logins/*.mdx | /v1/logins, /v1/logins/{login_id} | logins/router.py |
| api-reference/account/get.mdx | GET /v1/account (account:read) | account_api/schemas.py |
| api-reference/account/usage.mdx | GET /v1/usage (from/to, ≤366 days, by_source, goodwill_refunds) | account_api/usage.py |
| api-reference/webhooks/*.mdx | /v1/webhooks/secret, /rotate | async_runs/router.py |
| api-reference/apps/*.mdx, concepts/connected-apps.mdx | /v1/apps, /v1/apps/connected, /v1/apps/{app}, /connection, /tools, /tools/{tool}/run (apps:read / apps:write) | integrations/apps/api/*, integrations/apps/step.py (MAX_WRITES_PER_RUN), mcp/connected_app_tools.py |

Open follow-ups:
- `workflows:write` and `account:read` are API-key only today. When the OAuth consent opt-in ships, the
  "AI assistants (OAuth)" column in api-reference/authentication.mdx already says "assistants you allowed to …";
  check the consent-screen label matches.
- Quickstart and guides/create-a-skill point at **My Skills → Create from a description** (being built by another
  agent). Check the button label once it ships.
