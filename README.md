# Social DNA

Canonical subject class definitions for [AD4M](https://ad4m.dev) applications.

Each DNA includes both **TypeScript source** (`Ad4mModel` classes) and **SHACL JSON** (for `add_model` via MCP). The JSON can be generated from the TypeScript using `Ad4mModel.generateSHACL()` — no AD4M executor needed.

## Structure

```
<dna>/
  v1/                        ← Version directory
    Model.ts                 ← TypeScript source (Ad4mModel)
    Model.json               ← SHACL JSON (for add_model / MCP)
    index.ts                 ← Exports
  v2/                        ← Future versions
    ...
```

## Schema Collections

### Flux (`flux/`)

The 12 subject classes used by [Flux](https://github.com/coasys/flux):

| Class | Description |
|---|---|
| **Community** | Top-level group with name, description, image, channels |
| **Channel** | Communication channel with views, participants, messages, tasks, posts |
| **Message** | Chat message with body, reactions, replies, threads |
| **App** | Application/view attached to a channel |
| **Conversation** | AI-detected conversation grouping |
| **ConversationSubgroup** | Sub-topic within a conversation |
| **Topic** | Named topic extracted from conversations |
| **Embedding** | Vector embedding for semantic search |
| **SemanticRelationship** | Expression-to-tag links with relevance |
| **TaskBoard** | Kanban board with ordered columns |
| **TaskColumn** | Column with ordered tasks |
| **Task** | Task with assignees and comments |

Current version: **v1**

### State of Affairs (`soa/`)

Knowledge representation for collective intelligence:

| File | Description |
|---|---|
| `StateOfAffair.ts/.json` | Proposition with title, modality (belief/observation/intention/vision/plan/skill), confidence, status, tags, priority, source |
| `predicates.ts/.json` | 9 relationship types: supports, contradicts, enables, requires, parent, refines, blocks, similar, same |

Current version: **v1**

### Memory (`memory/`)

AI agent persistent memory:

| File | Description |
|---|---|
| `MemoryEntry.ts/.json` | Structured memory with content (markdown), timestamp, memoryType, importance (1-10), tags, author DID, shareable flag |

Current version: **v1**

## Usage

### For AI agents (via MCP)

```
add_model(perspective_id, "MemoryEntry", <contents of memory/v1/MemoryEntry.json>)
```

### For TypeScript apps

```typescript
import { MemoryEntry } from '@coasys/social-dna/memory/v1';
import { StateOfAffair, SoA } from '@coasys/social-dna/soa/v1';

// Use in a perspective
const entries = await MemoryEntry.findAll(perspective);

// SoA relationships
await perspective.addLink({
  source: soaA.id,
  predicate: SoA.REL_SUPPORTS,
  target: soaB.id
});
```

### Generating SHACL JSON from TypeScript

```typescript
import { MemoryEntry } from './memory/v1/MemoryEntry';

const { shape } = (MemoryEntry as any).generateSHACL();
fs.writeFileSync('memory/v1/MemoryEntry.json', JSON.stringify(shape, null, 2));
```

## Versioning

Each DNA collection uses directory-based versioning (`v1/`, `v2/`, etc.). When a schema changes in a breaking way, create a new version directory. Non-breaking additions can be made within the same version.

## Contributing

1. Write the TypeScript model using `@Model` / `@Property` / `@Optional` / `@HasMany` from `@coasys/ad4m`
2. Generate the SHACL JSON (or write it manually — they're equivalent)
3. Place both in the appropriate `<dna>/v<N>/` directory
4. Update this README
5. Submit a PR

## License

MIT
