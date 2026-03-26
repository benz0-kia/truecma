const UPDATED_KEYWORDS = [
  'remodeled', 'renovated', 'updated', 'new kitchen', 'new bath',
  'new floor', 'new roof', 'new hvac', 'move-in ready', 'turnkey',
  'fresh paint', 'new appliances', 'new windows',
];

const ORIGINAL_KEYWORDS = [
  'as-is', 'fixer', 'tlc', 'original', 'needs work', 'investor',
  'estate sale', 'cosmetic', 'dated', 'deferred',
];

export function analyzeCondition(
  remarks: string | undefined | null
): 'Updated' | 'Original' | 'Mixed' | 'Unknown' {
  if (!remarks) return 'Unknown';
  const lower = remarks.toLowerCase();
  const hasUpdated = UPDATED_KEYWORDS.some((kw) => lower.includes(kw));
  const hasOriginal = ORIGINAL_KEYWORDS.some((kw) => lower.includes(kw));
  if (hasUpdated && hasOriginal) return 'Mixed';
  if (hasUpdated) return 'Updated';
  if (hasOriginal) return 'Original';
  return 'Unknown';
}
