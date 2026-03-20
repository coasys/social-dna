import { Ad4mModel, Model, Property, Optional } from '@coasys/ad4m';

/**
 * Modality of a State of Affairs — its epistemic status.
 */
export type SoAModality = 'belief' | 'observation' | 'intention' | 'vision' | 'plan' | 'skill';

/**
 * StateOfAffair — the fundamental unit of knowledge representation.
 *
 * A proposition about how things are, could be, or should be.
 * Forms the nodes of State of Affairs trees, which represent
 * an agent's worldview, goals, plans, and capabilities.
 *
 * Relationships between SoA nodes are expressed as AD4M links
 * using the predicates defined in predicates.json / predicates.ts.
 */
@Model({ name: 'StateOfAffair' })
export class StateOfAffair extends Ad4mModel {
  @Property({ through: 'soa://title', resolveLanguage: 'literal' })
  title: string = '';

  @Property({ through: 'soa://modality', resolveLanguage: 'literal' })
  modality: SoAModality = 'belief';

  @Optional({ through: 'soa://description', resolveLanguage: 'literal' })
  description: string = '';

  @Optional({ through: 'soa://confidence', resolveLanguage: 'literal' })
  confidence: number = 0;

  @Optional({ through: 'soa://status', resolveLanguage: 'literal' })
  status: string = '';

  @Optional({ through: 'soa://tags', resolveLanguage: 'literal' })
  tags: string = '';

  @Optional({ through: 'soa://priority', resolveLanguage: 'literal' })
  priority: number = 0;

  @Optional({ through: 'soa://source', resolveLanguage: 'literal' })
  source: string = '';
}

export default StateOfAffair;
