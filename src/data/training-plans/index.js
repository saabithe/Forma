// Training plan registry
// Combines all custom plans and provides fallback to default generator

import { BEGINNER_PLANS } from './beginner-plans'
import { INTERMEDIATE_PLANS } from './intermediate-plans'
import { ADVANCED_PLANS } from './advanced-plans'
import { ELITE_PLANS } from './elite-plans'
import { SUPPORTING_PLANS } from './supporting-plans'
import { generateDefaultPlan } from './default-plan'

const ALL_CUSTOM_PLANS = [
  ...BEGINNER_PLANS,
  ...INTERMEDIATE_PLANS,
  ...ADVANCED_PLANS,
  ...ELITE_PLANS,
  ...SUPPORTING_PLANS,
]

// Build a map for fast lookup
const PLAN_MAP = new Map()
for (const plan of ALL_CUSTOM_PLANS) {
  PLAN_MAP.set(plan.skillId, plan)
}

/**
 * Get the training plan for a skill.
 * Returns the custom plan if it exists, otherwise generates a default plan
 * from the skill's legacy workout data.
 */
export function getTrainingPlan(skillId) {
  const custom = PLAN_MAP.get(skillId)
  if (custom) return custom

  // Fallback: generate from legacy workout data
  return generateDefaultPlan(skillId)
}

/**
 * Check if a skill has a custom (non-default) training plan
 */
export function hasCustomPlan(skillId) {
  return PLAN_MAP.has(skillId)
}

/**
 * Get all custom training plans
 */
export function getAllCustomPlans() {
  return ALL_CUSTOM_PLANS
}

export { BEGINNER_PLANS, INTERMEDIATE_PLANS, ADVANCED_PLANS, ELITE_PLANS, SUPPORTING_PLANS }
