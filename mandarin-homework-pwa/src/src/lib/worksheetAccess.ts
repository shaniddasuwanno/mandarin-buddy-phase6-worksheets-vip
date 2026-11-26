import type { Grade } from '@/data/sampleVocab';

export type WorksheetGrant = {
  grade: number;
  expires_at: string | null;
};

export function activeGrades(grants: WorksheetGrant[], now = Date.now()): Grade[] {
  return grants
    .filter(
      (g) =>
        Number.isInteger(g.grade) &&
        g.grade >= 1 &&
        g.grade <= 6 &&
        (g.expires_at === null || Date.parse(g.expires_at) > now)
    )
    .map((g) => g.grade as Grade)
    .sort((a, b) => a - b);
}

/**
 * Checks whether a specific worksheet grade/set is unlocked.
 * App-only access (฿399) does NOT unlock printable worksheets;
 * users must have explicit worksheet grants (฿599 / ฿899 Combo / VIP).
 */
export function worksheetAllowed(
  _appAccess: boolean,
  grades: Grade[],
  grade: Grade,
  _set: number
): boolean {
  return grades.includes(grade);
}

/** Only call with a verified account's database profile and grants. */
export function resolveAccess(
  profile: { is_paid: boolean } | null,
  grants: WorksheetGrant[]
) {
  const appAccess = profile?.is_paid === true;
  const worksheetGrades: Grade[] = activeGrades(grants);
  return { appAccess, worksheetGrades };
}

