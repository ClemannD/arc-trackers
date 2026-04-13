---

## name: brain
description: >
  Meta-skill that teaches agents the developer brain system. Covers project
  lookup via Linear MCP, ticket management, shared skill families, starter repo
  decisions, deployment debugging, and cross-project conventions. Install this
  skill globally or reference it from any project's AGENTS.md to give agents
  context about the full ecosystem.
family: meta

# Developer Brain

This skill teaches you the system that connects all of Dylan's projects. Use it when you need cross-project context, want to look up project info, manage Linear tickets, or help decide on a new project's stack.

## System architecture

There are four layers:

1. **Linear (MCP)** -- accessible from anywhere (phone, cloud, any machine). Contains project metadata, tickets, and documents.
2. **This wiki repo** (`clemann-dev-wiki` / `clemann-notes`) -- shared skills, rules, knowledge base, starter catalog.
3. **Per-project AGENTS.md** -- project-specific context (tech stack, deployment, Linear project, which shared skills apply).
4. **Per-project skills/rules** -- shared skills synced from the wiki, plus project-specific skills.

## Project lookup

Use the Linear MCP to find information about any project:

```
list_projects                                    -> all projects
get_project(query: "card-scores")                -> tech stack, deployment, repos
get_project(query: "card-scores", includeResources: true)  -> includes docs and links
```

Linear projects are on team **Clemann-developments**. Project descriptions contain structured metadata: tech stack, deployment info, repos, agent tools, and status. Each project should also include an **Infra** block: **Vercel project URL** when hosted there, **DigitalOcean DNS** when `*.clemann.app` (or other DO zones) apply, and a reminder to use **Vercel / DO MCP or CLIs** for changes. See the wiki page `wiki/projects/linear-project-infra-links.md` for the template and tool list.

## Ticket management

**Always check before creating.** Use the `linear-tickets` shared skill for the full workflow:

1. `list_issues(project: "<name>", query: "<search>")` -- check for duplicates
2. If no match: `save_issue(title: "...", team: "Clemann-developments", project: "<name>", ...)` -- create the ticket
3. Set appropriate priority, assignee ("me"), and labels

## Shared skill families

Projects declare which families they use in their AGENTS.md. Skills are organized by tech stack:

### Universal (all React/TS projects)

- `react-component-conventions` -- inline props, default exports, component ordering
- `cn-conditional-classes` -- cn() for dynamic classes
- `no-callback-props` -- colocate handlers
- `modular-components` -- no god components
- `readme-agents-sync` -- keep README in sync with agent config

### Expo + Firebase + NativeWind

- `expo-router-routing-layers` -- route tree structure
- `firestore-state-management` -- domain pattern + Zustand
- `access-control-route-guarding` -- auth state machine
- `workspace-multitenancy` -- multi-tenant workspaces
- `color-theme-system` -- NativeWind semantic theming
- `nativewind-styling` -- prefer className over StyleSheet
- `forms-implementation-expo` -- RHF + Zod + SwiftUI/RN fields
- `upgrade-expo` -- SDK upgrade workflow

### Next.js + Turborepo

- `nextjs-route-colocation` -- _components at lowest segment
- `turborepo` -- monorepo build system
- `shadcn` -- component library patterns
- `data-tables` -- TanStack Table pattern
- `entity-overlay-forms` -- Dialog/Sheet CRUD
- `jotai-feature-state` -- scoped UI state
- `forms-implementation-web` -- RHF + Zod + shadcn
- `trpc-react-query` -- tRPC frontend integration
- `nuqs-url-search-state` -- URL query params

### Deployment / Infra

- `railway-deployment` -- Railway operations
- `doppler-secrets` -- secret management

### Process

- `new-feature-checklist` -- cross-cutting feature review
- `git-commit-push` -- safe commit workflow

## New project decisions

When discussing a new project, consult `wiki/projects/starter-repos.md` in the wiki. Key starters:

- **clemann-starter-mono-firebase** -- fullest stack: Expo + Next.js + Firebase + Turborepo. Has 17 skills pre-loaded. Use for apps that need both mobile and web.
- **clemann-next-trpc-starter** -- lighter: Next.js + tRPC + Prisma. Use for web-only apps with a relational backend.

## Promoting a skill to shared

When a new skill is created in a project and should be shared:

1. Read the skill and reference docs in the current project
2. Generalize -- replace project-specific paths with generic guidance
3. Classify -- determine which family it belongs to
4. Split -- generic SKILL.md goes to the wiki; project-specific reference.md stays local
5. Copy to `clemann-dev-wiki/shared/skills/<name>/`
6. Create a matching `.mdc` rule in `shared/rules/` if the skill is a convention that should auto-trigger on file edits
7. Update `wiki/index.md` and append to `wiki/log.md`
8. Note which other projects should receive it

## Deployment debugging

Check the project's AGENTS.md or Linear project description for:

- Which platform it's deployed on (Vercel, Railway, Firebase, EAS)
- CLI commands for logs and deploys
- Which MCPs are available (Firebase, Railway, etc.)
- Environment variable management (Doppler, Vercel env, etc.)

## Active projects (quick reference)


| Project              | Stack                                         | Linear project    |
| -------------------- | --------------------------------------------- | ----------------- |
| card-scores-app      | Expo + Firebase + NativeWind                  | card-scores       |
| card-scores-web      | Next.js (standalone)                          | card-scores       |
| onecart-v3-app       | Expo + Firebase + NativeWind                  | one-cart          |
| snipr                | Next.js + NestJS + tRPC + Turborepo + Railway | --                |
| recipe-book-web      | Next.js + Firebase                            | recipe-forge      |
| shelf-web            | Next.js + Firebase                            | archivum          |
| dylan.clemann.com_v2 | Next.js                                       | dylan-clemann-com |
| curated-by-chey      | Next.js                                       | curated-by-chey   |
| blue-sea-lake        | Next.js                                       | --                |
| server-infra         | Ubuntu VPS configs                            | --                |


