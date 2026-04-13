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

### Step 1: Find the project

```
list_projects
```

Or if you know the name:

```
get_project(query: "card-scores")
```

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
1. The project's AGENTS.md tells you which Linear project to use
2. Search that project first
3. Include links to relevant code or PRs in the issue description

## When discussing from phone / remote

If no repo context:
1. Ask which project this relates to (or infer from the conversation)
2. Use `get_project` to confirm the Linear project name
3. Follow the same check-before-create flow
