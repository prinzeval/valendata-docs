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
| api-reference/followups/*.mdx, concepts/follow-ups.mdx | /v1/followups, /v1/followups/{followup_id}, /cancel (followups:read / followups:write, + apps:read for email_app / app_tool) | followups/api/*, followups/service.py (MAX_ACTIVE_PER_USER, MAX_WAIT_HOURS), mcp/followup_tools.py |
| api-reference/jobs/*.mdx, concepts/background-jobs.mdx | /v1/jobs (POST start 1–6 items, 202, `refused`, 422 when none start), /v1/jobs/{job_id}, /cancel (jobs:read / jobs:write, + skills:invoke / workflows:invoke to start) | jobs/__init__.py, jobs/api/*, jobs/cancel.py, jobs/delivery/note.py, mcp/job_tools.py, agents/job_tools.py (MAX_ITEMS), services/subtask_service.py (MAX_FANOUT) |
| api-reference/notes/*.mdx, concepts/notes.mdx | /v1/notes (q, topic, tag, pinned, limit/cursor), /v1/notes/{note_id} GET/PATCH (body / append / find+replace_with)/DELETE (notes:read / notes:write; source `api`) | notes/api/*, notes/service.py (MAX_TITLE, MAX_BODY, MAX_TAGS, MAX_TAG, MAX_TOPIC), notes/agent_tools.py (write_note, appended, edited), notes/models.py (SOURCES), mcp/note_tools.py |
| api-reference/apps/*.mdx, concepts/connected-apps.mdx | /v1/apps, /v1/apps/connected, /v1/apps/{app}, /connection, /tools, /tools/{tool}/run (apps:read / apps:write) | integrations/apps/api/*, integrations/apps/step.py (MAX_WRITES_PER_RUN), mcp/connected_app_tools.py |
| api-reference/sites/*.mdx, guides/when-a-site-does-not-work.mdx | GET /v1/sites/proven (q, limit 50, offset; public), GET /v1/sites/{domain} (public; counts null under 3 people), POST /v1/site-requests, GET /v1/site-requests/mine, DELETE /v1/site-requests/{request_id}/vote; MCP site_status, request_site. Manual `api:` pages written from the frozen contract before the backend shipped; switch to `openapi:` once the exported spec has the routes | valendata-be sites routes (being built) |
| api-reference/site-apis/*.mdx, concepts/site-apis.mdx | GET /v1/apis, GET /v1/apis/{domain} (404 with no skill there), POST /v1/apis/{domain}/{endpoint_name}/run (= POST /v1/skills/{slug}/run), PATCH /v1/apis/{domain}/endpoints/{skill_id} (`name` snake_case 3–41, unique per site; 422 / 409), PUT /v1/apis/{domain}/defaults (new skills only); GET /v1/skills/{slug} + `site_domain`, `endpoint_name`; MCP list_site_apis, call_site_api. Manual `api:` pages written from the frozen contract before the backend shipped; switch to `openapi:` once the exported spec has the routes | valendata-be site APIs routes (being built) |
| api-reference/skills/cancel-creation.mdx | POST /v1/skill-creations/{creation_id}/cancel (stops at its next step, credits used not refunded, 409 when finished). Manual `api:` page until the spec has the route | skill_creation/router.py (being built) |
| api-reference/improvements/talk.mdx, chat.mdx | POST, GET /v1/skills/{slug}/doctor (message 1–2000; 409 while answering; `messages`, `working`); MCP talk_to_skill | published_skills/doctor/v1_router.py, mcp/doctor_tools.py |

Open follow-ups:
- 2026-10-19: the sites, site APIs and cancel-creation pages were checked against the shipped backend (app/sites/*,
  app/site_apis/*, skill_creation/router.py) and corrected: scopes, `sr_` ids, request statuses, `fields` as names,
  `success_rate` 0–1 for sites and 0–100 for endpoints, PUT defaults answer, cancel answer. They stay manual `api:`
  pages because they carry more than the spec; the spec now has their routes if you want to switch to `openapi:`.
- The backend's own descriptions for GET /v1/sites/proven and GET /v1/sites/{domain} (public_api/operations.py) still
  say "3+ people, 10+ runs, 90%+ worked"; app/sites/status.py (one working skill proves a site) is what runs, and the
  docs follow it. Fix the backend text, then re-export.

2026-10-19: `openapispec.json` re-exported with `scripts/export_public_openapi.py`; it now has the sites, site APIs, skill-creation cancel and doctor routes.
