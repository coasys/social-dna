# Social DNA

Subject class definitions for [AD4M](https://ad4m.dev) applications, starting with [Flux](https://github.com/coasys/flux).

## What is this?

When an AI agent creates a neighbourhood (shared perspective) via AD4M's MCP tools, it needs to register the correct subject class schemas so that Flux (and other apps) can interoperate with the data. These JSON definitions describe each subject class in a SHACL-inspired format that AD4M's `add_model` MCP tool understands.

## Flux Subject Classes

The `flux/` directory contains definitions for all 12 subject classes that Flux registers when creating a community:

| Class | Description |
|---|---|
| **Community** | Top-level group with name, description, image, and child channels |
| **Channel** | Communication channel with name, description, views (apps), and participants |
| **Message** | Chat message with body, reactions, replies, and thread support |
| **App** | Application/view attached to a channel (chat, post, graph, voice, debug) |
| **Conversation** | AI-detected conversation grouping within a channel |
| **ConversationSubgroup** | Sub-topic within a conversation |
| **Topic** | Named topic extracted from conversations |
| **Embedding** | Vector embedding for semantic search |
| **SemanticRelationship** | Links expressions to tags/topics with relevance scores |
| **TaskBoard** | Kanban-style task board with ordered columns |
| **TaskColumn** | Column within a task board with ordered tasks |
| **Task** | Individual task with assignees and comment threads |

## Usage

### Load all classes at once

Use `flux/all.json` which contains all 12 classes in a single array.

### Load individual classes

Each class has its own file: `flux/Community.json`, `flux/Channel.json`, etc.

### With AD4M MCP

```
add_model(model: <contents of JSON file>)
```

## Format

Each JSON file follows this structure:

- **`target_class`** — The class URI (e.g., `flux://Community`)
- **`properties`** — Array of property definitions with paths, datatypes, cardinality, and setters
- **`constructor_actions`** — Links created when instantiating (entry type flag + rdf type)
- **`instance_conditions`** — Links that must exist for an entity to be recognized as this class
- **`remover_actions`** — Links removed when deleting (currently empty for all classes)

## Source

These definitions were derived from the TypeScript subject class decorators in [`coasys/flux`](https://github.com/coasys/flux/tree/main/packages/api/src).

## License

MIT
