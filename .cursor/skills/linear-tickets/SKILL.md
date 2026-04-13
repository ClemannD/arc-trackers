---
name: linear-tickets
description: >
  Check-before-create workflow for Linear issue management. Always search for
  existing tickets before creating new ones. Use when reporting bugs, requesting
  features, or discussing work items for any project.
family: meta
---

# Linear Ticket Management

## Before creating a ticket

**Always search first.** Duplicate tickets waste time and fragment discussion.

### Step 1: Find the Linear project (slug or name)

**Prefer repo docs over MCP listing.**

1. **Read the project’s `AGENTS.md`** (repo root). The **Linear** section almost always names the team and the **Linear project** (slug or display name you pass to `project` on `save_issue` / `list_issues`).
2. If `AGENTS.md` doesn’t list it, skim **`README.md`** for the same (many repos document Linear there).
3. **Only if you still don’t have a project:** use MCP to discover it:
   - `list_projects` to browse, or
   - `get_project(query: "…")` when you have a rough name.

Do **not** call `list_projects` first when you already have the repo open—check `AGENTS.md` / `README` first.

### Step 2: Search for existing issues

```
list_issues(project: "card-scores", query: "search terms here")
```

Also try broader searches if the initial query returns nothing:

```
list_issues(team: "Clemann-developments", query: "search terms")
```

### Step 3: If no duplicate exists, create the ticket

```
save_issue(
  title: "Clear, specific title",
  description: "## Context\nWhat happened or what's needed\n\n## Expected behavior\nWhat should happen\n\n## Steps to reproduce\n(for bugs)",
  team: "Clemann-developments",
  project: "card-scores",
  assignee: "me",
  priority: 3
)
```

## Priority guide

| Priority | When to use |
|----------|-------------|
| 1 (Urgent) | Production down, data loss, security issue |
| 2 (High) | Blocks current work, significant user impact |
| 3 (Normal) | Standard feature or bug, default choice |
| 4 (Low) | Nice-to-have, minor polish, tech debt |

## Issue description format

Use markdown. Include:

- **Context** -- what happened or what's needed
- **Expected behavior** -- what should happen (for bugs)
- **Steps to reproduce** -- if applicable
- **Technical notes** -- relevant files, APIs, or architecture context

## When discussing from a project context

If working in a specific project repo:

1. **Resolve the Linear project from `AGENTS.md`**, then **`README.md` if needed** (same as Step 1).
2. Search that project first (`list_issues(project: "…", …)`).
3. Include links to relevant code or PRs in the issue description.

## When discussing from phone / remote

If you don’t have the repo handy:

1. Ask which project this relates to (or infer from the conversation).
2. If you can open the repo later, still prefer **`AGENTS.md` / `README`** for the canonical project name.
3. Otherwise use `get_project` / `list_projects` to resolve the project, then follow the same check-before-create flow.
