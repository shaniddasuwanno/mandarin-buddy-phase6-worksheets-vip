import type { Grade, StudySentence, VocabWord } from './sampleVocab';

/** Independent, original weekly curriculum; retains the app's existing VocabWord shape. */
export type PrimaryWeek = {
  week: number;
  title_th: string;
  title_en: string;
  moral_th: string;
  moral_en: string;
};

export interface PrimaryCurriculumWord<G extends Grade = Grade> extends VocabWord {
  grade: G;
  week: number;
  unit_title_th: string;
  unit_title_en: string;
  meaning_th: string;
  meaning_en: string;
  example_sentence: string;
  example_pinyin: string;
  example_th: string;
  example_en: string;
  moral_lesson_th: string;
  weekly_moral_th: string;
  weekly_moral_en: string;
  tingxie_callout_th: string;
  tingxie_callout_zh: string;
  radical_tip_th: string;
  radical_tip_en: string;
  illustration: { scene: string; animation: string };
}

export type PrimaryRow = readonly [
  hanzi: string, pinyin: string, meaning_th: string, meaning_en: string,
  sentence1: readonly [string, string, string, string],
  sentence2: readonly [string, string, string, string],
  radical_tip_th: string, radical_tip_en: string,
  tingxie_callout_zh: string, moral_lesson_th: string,
];

export function makeStudySentence(
  [hanzi, pinyin, meaning_th, meaning_en]: readonly [string, string, string, string],
): StudySentence {
  return { hanzi, pinyin, meaning_th, meaning_en };
}

export function makePrimaryWeek<G extends Grade>(
  grade: G, unit: PrimaryWeek, rows: readonly PrimaryRow[],
): PrimaryCurriculumWord<G>[] {
  if (rows.length !== 10) throw new Error(`P${grade} week ${unit.week} must contain 10 words`);
  return rows.map(([hanzi, pinyin, meaning_th, meaning_en, first, second,
    radical_tip_th, radical_tip_en, tingxie_callout_zh, moral_lesson_th], i) => {
    const sentences: [StudySentence, StudySentence] = [makeStudySentence(first), makeStudySentence(second)];
    const example = { hanzi: first[0], pinyin: first[1], th: first[2], en: first[3] };
    return {
      id: `P${grade}-W${String(unit.week).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      grade, week: unit.week, unit_title_th: unit.title_th, unit_title_en: unit.title_en,
      hanzi, pinyin, meaning_th, meaning_en, meaningTh: meaning_th, meaningEn: meaning_en,
      example, sentences, is_mandatory_write: true,
      example_sentence: first[0], example_pinyin: first[1], example_th: first[2], example_en: first[3],
      memory_tip_th: radical_tip_th, memory_tip_en: radical_tip_en,
      radical_tip_th, radical_tip_en, moral_lesson_th,
      weekly_moral_th: unit.moral_th, weekly_moral_en: unit.moral_en,
      tingxie_callout_th: 'คำใบ้เขียนตามคำบอก: ' + tingxie_callout_zh, tingxie_callout_zh,
      illustration: { scene: hanzi, animation: 'bounce' },
    };
  });
}

export interface ReadingParagraph {
  id: string;
  week: number;
  title_zh: string;
  title_th: string;
  title_en: string;
  sentences: readonly [StudySentence, StudySentence, StudySentence];
  question: StudySentence;
  answer: StudySentence;
  moral_th: string;
  moral_en: string;
}
