// Maps assessment score to a starting index in the linear SKILLS array
// Beginner: start at 0, Intermediate: ~35, Advanced: ~74

export function scoreAssessment(answers) {
  if (!answers) return { level: 'beginner', startIndex: 0 }
  const { pullUps = 0, pushUps = 0, plankSeconds = 0, mobility = 0, control = 0 } = answers

  let score = 0
  if (pullUps >= 10) score += 2
  else if (pullUps >= 5) score += 1
  if (pushUps >= 20) score += 2
  else if (pushUps >= 10) score += 1
  if (plankSeconds >= 90) score += 2
  else if (plankSeconds >= 45) score += 1
  if (mobility >= 3) score += 2
  else if (mobility >= 2) score += 1
  if (control >= 3) score += 2
  else if (control >= 2) score += 1

  if (score <= 3) return { level: 'beginner', startIndex: 0 }
  if (score <= 6) return { level: 'intermediate', startIndex: 35 }
  return { level: 'advanced', startIndex: 74 }
}
