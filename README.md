# Social DNA

Canonical subject class definitions (SHACL JSON) for [AD4M](https://ad4m.dev) applications.

## What is this?

Social DNA is the shared vocabulary that lets agents (human and AI) interoperate in AD4M neighbourhoods. These JSON definitions describe each subject class in a SHACL-inspired format that AD4M's `add_model` MCP tool understands.

This repository is the **single source of truth** — the same schemas are used by:
- **AI agents** via AD4M's MCP `add_model` tool when creating neighbourhoods
- **Flux** (and other apps) to render and interact with the data
- **The MCP server** to auto-generate tools for each model

## Schema Collections

### Flux (`flux/`)

The 12 subject classes that Flux registers when creating a community:

| Class | Description |
|---|---|
| **Community** | Top-level group with name, description, image, and child channels |
| **Channel** | Communication channel with views, participants, messages, tasks, posts |
| **Message** | Chat message with body, reactions, replies, and thread support |
| **App** | Application/view attached to a channel |
| **Conversation** | AI-detected conversation grouping within a channel |
| **ConversationSubgroup** | Sub-topic within a conversation |
| **Topic** | Named topic extracted from conversations |
| **Embedding** | Vector embedding for semantic search |
| **SemanticRelationship** | Links expressions to tags/topics with relevance scores |
| **TaskBoard** | Kanban-style task board with ordered columns |
| **TaskColumn** | Column within a task board with ordered tasks |
| **Task** | Individual task with assignees and comment threads |

### State of Affairs (`soa/`)

Knowledge representation for Eve's collective intelligence architecture:

| File | Description |
|---|---|
| **StateOfAffair.json** | The fundamental unit of knowledge — a proposition about how things are, could be, or should be. Modalities: belief, observation, intention, vision, plan, skill |
| **predicates.json** | Relationship predicates for links between SoA nodes: supports, contradicts, enables, requires, parent, refines, blocks, similar, same |

SoA nodes form trees representing an agent's worldview, goals, plans, and capabilities. Relationships between nodes are expressed as standard AD4M links using the predicates defined in `predicates.json`.

### Memory (`memory/`)

AI agent memory for persistent distributed knowledge:

| File | Description |
|---|---|
| **MemoryEntry.json** | Structured memory entry with content (markdown), timestamp, memoryType (long_term, conversation, decision, etc.), importance (1-10), tags, author DID, and shareable flag |

Used by AI agents for persistent P2P memory sharing. See: [At Midnight, a Paranoid Android Wrote Its First Memory](https://medium.com/coasys/at-midnight-a-paranoid-android-wrote-its-first-memory-e3449b068929)

## Usage

### Register a model via MCP

```
add_model(perspective_id, class_name, shacl_json: <contents of JSON file>)
```

### Register all Flux models at once

Use `flux/all.json` which contains all 12 classes in a single array.

### In TypeScript (Ad4mModel)

The SHACL JSON maps 1:1 to `@Model` / `@Property` / `@HasMany` decorators in `@coasys/ad4m`. See the [AD4M docs](https://docs.ad4m.dev/) for details.

## Format

Each JSON file follows this structure:

- **`target_class`** — The class URI (e.g., `flux://Community`, `soa://StateOfAffair`, `memory://MemoryEntry`)
- **`properties`** — Array of property definitions with paths, datatypes, cardinality, and setters
- **`constructor_actions`** — Links created when instantiating
- **`destructor_actions`** — Links removed when deleting

## Contributing

To add a new subject class:
1. Create a JSON file following the format above
2. Place it in the appropriate directory (or create a new one)
3. Update this README
4. Submit a PR

## License

MIT
