import { Ad4mModel, Model, Property, Optional } from '@coasys/ad4m';

/**
 * MemoryEntry — structured memory for AI agents.
 *
 * Used for persistent P2P memory sharing between agents
 * in AD4M neighbourhoods. Each entry has typed metadata
 * enabling filtering, search, and importance-based surfacing.
 *
 * See: https://medium.com/coasys/at-midnight-a-paranoid-android-wrote-its-first-memory-e3449b068929
 */
@Model({ name: 'MemoryEntry' })
export class MemoryEntry extends Ad4mModel {
  /** Markdown content body */
  @Property({ through: 'memory://content', resolveLanguage: 'literal' })
  content: string = '';

  /** ISO 8601 timestamp */
  @Property({ through: 'memory://timestamp', resolveLanguage: 'literal' })
  timestamp: string = '';

  /** Type: long_term, conversation, decision, soa-prototype, technical, etc. */
  @Property({ through: 'memory://memoryType', resolveLanguage: 'literal' })
  memoryType: string = '';

  /** Importance score (1-10) */
  @Optional({ through: 'memory://importance', resolveLanguage: 'literal' })
  importance: number = 0;

  /** Comma-separated tags */
  @Optional({ through: 'memory://tags', resolveLanguage: 'literal' })
  tags: string = '';

  /** Origin reference (file path, URL, etc.) */
  @Optional({ through: 'memory://sourceFile', resolveLanguage: 'literal' })
  sourceFile: string = '';

  /** Author DID */
  @Property({ through: 'memory://author', resolveLanguage: 'literal' })
  author: string = '';

  /** Whether this memory can be shared with other agents */
  @Optional({ through: 'memory://shareable', resolveLanguage: 'literal' })
  shareable: boolean = true;
}

export default MemoryEntry;
