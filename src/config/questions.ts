import type { Question } from '../types/screening';

// Стандартные варианты ответов для большинства вопросов
const standardAnswers = [
  { value: 0 as const, label: 'Никогда' },
  { value: 1 as const, label: 'Несколько дней' },
  { value: 2 as const, label: 'Больше половины дней' },
  { value: 3 as const, label: 'Почти каждый день' }
];

export const questions: Question[] = [
  // ============= PHQ-2 (Quick) =============
  {
    id: 'phq2_1',
    text: 'Мало интереса или удовольствия от того, чем занимаетесь?',
    scale: 'PHQ2',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'both',
    topic_gate: 'all',
    order: 1
  },
  {
    id: 'phq2_2',
    text: 'Чувствуете подавленность, депрессию или безнадёжность?',
    scale: 'PHQ2',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'both',
    topic_gate: 'all',
    order: 2
  },

  // ============= PHQ-9 (Deep, продолжение после PHQ-2) =============
  {
    id: 'phq9_3',
    text: 'Трудности с засыпанием, сном или слишком много спите?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 3
  },
  {
    id: 'phq9_4',
    text: 'Чувствуете усталость или нехватку энергии?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 4
  },
  {
    id: 'phq9_5',
    text: 'Плохой аппетит или переедание?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 5
  },
  {
    id: 'phq9_6',
    text: 'Плохо относитесь к себе, чувствуете себя неудачником или подводите семью?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 6
  },
  {
    id: 'phq9_7',
    text: 'Трудно сосредоточиться на чём-то (чтение, ТВ)?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 7
  },
  {
    id: 'phq9_8',
    text: 'Двигаетесь или говорите так медленно, что окружающие замечают? Или наоборот — очень беспокойны и подвижны?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 8
  },
  {
    id: 'phq9_9',
    text: 'Мысли, что лучше было бы умереть или как-то навредить себе?',
    scale: 'PHQ9',
    evidence_source: 'PHQ-9',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 9
  },

  // ============= GAD-2 (Quick) =============
  {
    id: 'gad2_1',
    text: 'Чувствуете нервозность, тревогу или напряжение?',
    scale: 'GAD2',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'both',
    topic_gate: 'all',
    order: 10
  },
  {
    id: 'gad2_2',
    text: 'Не можете перестать беспокоиться или контролировать беспокойство?',
    scale: 'GAD2',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'both',
    topic_gate: 'all',
    order: 11
  },

  // ============= GAD-7 (Deep, продолжение) =============
  {
    id: 'gad7_3',
    text: 'Слишком много беспокоитесь о разных вещах?',
    scale: 'GAD7',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 12
  },
  {
    id: 'gad7_4',
    text: 'Трудно расслабиться?',
    scale: 'GAD7',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 13
  },
  {
    id: 'gad7_5',
    text: 'Настолько беспокойны, что трудно усидеть на месте?',
    scale: 'GAD7',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 14
  },
  {
    id: 'gad7_6',
    text: 'Легко раздражаетесь или злитесь?',
    scale: 'GAD7',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 15
  },
  {
    id: 'gad7_7',
    text: 'Чувствуете страх, будто что-то ужасное может произойти?',
    scale: 'GAD7',
    evidence_source: 'GAD-7',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 16
  },

  // ============= PSS-SHORT (Quick, 2 вопроса) =============
  {
    id: 'pss_short_1',
    text: 'Чувствовали, что не можете справиться с важными делами?',
    scale: 'PSS_SHORT',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'all',
    order: 17
  },
  {
    id: 'pss_short_2',
    text: 'Раздражали мелочи, выходящие из-под контроля?',
    scale: 'PSS_SHORT',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'all',
    order: 18
  },

  // ============= PSS-10 (Deep) =============
  {
    id: 'pss10_1',
    text: 'Расстраивались из-за чего-то неожиданного?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 19
  },
  {
    id: 'pss10_2',
    text: 'Чувствовали, что не можете контролировать важные вещи в жизни?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 20
  },
  {
    id: 'pss10_3',
    text: 'Чувствовали нервозность и стресс?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 21
  },
  {
    id: 'pss10_4',
    text: 'Уверенно справлялись с личными проблемами?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: true, // обратный вопрос
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 22
  },
  {
    id: 'pss10_5',
    text: 'Чувствовали, что всё идёт по вашему плану?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 23
  },
  {
    id: 'pss10_6',
    text: 'Чувствовали, что не справляетесь со всем, что нужно сделать?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 24
  },
  {
    id: 'pss10_7',
    text: 'Могли контролировать раздражение в жизни?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 25
  },
  {
    id: 'pss10_8',
    text: 'Чувствовали, что всё под контролем?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 26
  },
  {
    id: 'pss10_9',
    text: 'Злились на вещи вне вашего контроля?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 27
  },
  {
    id: 'pss10_10',
    text: 'Чувствовали, что трудностей накопилось слишком много?',
    scale: 'PSS10',
    evidence_source: 'PSS-10',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 28
  },

  // ============= WHO-5 SHORT (Quick, 2 вопроса) =============
  {
    id: 'who_short_1',
    text: 'Чувствовали бодрость и хорошее настроение?',
    scale: 'WHO_SHORT',
    evidence_source: 'WHO-5',
    reverse_scored: true, // позитивный вопрос, инвертируем для "нагрузки"
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'all',
    order: 29
  },
  {
    id: 'who_short_2',
    text: 'Чувствовали спокойствие и расслабленность?',
    scale: 'WHO_SHORT',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'all',
    order: 30
  },

  // ============= WHO-5 FULL (Deep) =============
  {
    id: 'who5_1',
    text: 'Чувствовали бодрость и хорошее настроение?',
    scale: 'WHO5',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 31
  },
  {
    id: 'who5_2',
    text: 'Чувствовали спокойствие и расслабленность?',
    scale: 'WHO5',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 32
  },
  {
    id: 'who5_3',
    text: 'Чувствовали активность и энергичность?',
    scale: 'WHO5',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 33
  },
  {
    id: 'who5_4',
    text: 'Просыпались свежим и отдохнувшим?',
    scale: 'WHO5',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 34
  },
  {
    id: 'who5_5',
    text: 'Ваша повседневная жизнь была полна интересного?',
    scale: 'WHO5',
    evidence_source: 'WHO-5',
    reverse_scored: true,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'all',
    order: 35
  },

  // ============= TOPIC: RELATIONSHIPS (Quick - 4 вопроса) =============
  {
    id: 'topic_rel_quick_1',
    text: 'Сложно говорить о своих чувствах и потребностях с близкими?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'relationships',
    order: 100
  },
  {
    id: 'topic_rel_quick_2',
    text: 'Чувствуете, что уступаете или избегаете конфликтов, хотя внутри копится напряжение?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'relationships',
    order: 101
  },
  {
    id: 'topic_rel_quick_3',
    text: 'Чувствуете себя непонятым или одиноким в отношениях?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'relationships',
    order: 102
  },
  {
    id: 'topic_rel_quick_4',
    text: 'Сомневаетесь в том, можно ли доверять или полагаться на других?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'relationships',
    order: 103
  },

  // ============= TOPIC: RELATIONSHIPS (Deep - 12 вопросов) =============
  {
    id: 'topic_rel_deep_1',
    text: 'Трудно устанавливать или удерживать личные границы?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 104
  },
  {
    id: 'topic_rel_deep_2',
    text: 'Чувствуете вину, когда отказываете или думаете о своих потребностях?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 105
  },
  {
    id: 'topic_rel_deep_3',
    text: 'Избегаете конфликтов, даже когда это важно?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 106
  },
  {
    id: 'topic_rel_deep_4',
    text: 'Чувствуете, что слишком много отдаёте и мало получаете?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 107
  },
  {
    id: 'topic_rel_deep_5',
    text: 'Сложно попросить о помощи или поддержке?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 108
  },
  {
    id: 'topic_rel_deep_6',
    text: 'Чувствуете одиночество, даже находясь рядом с близкими?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 109
  },
  {
    id: 'topic_rel_deep_7',
    text: 'Сомневаетесь, можно ли доверять партнёру или близким?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 110
  },
  {
    id: 'topic_rel_deep_8',
    text: 'Чувствуете тревогу о том, что вас могут бросить или отвергнуть?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 111
  },
  {
    id: 'topic_rel_deep_9',
    text: 'Часто конфликтуете или чувствуете напряжение в отношениях?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 112
  },
  {
    id: 'topic_rel_deep_10',
    text: 'Трудно выражать гнев или недовольство экологично?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 113
  },
  {
    id: 'topic_rel_deep_11',
    text: 'Чувствуете вину за свои эмоции или потребности в отношениях?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 114
  },
  {
    id: 'topic_rel_deep_12',
    text: 'Сложно поддерживать близость, открываться перед другими?',
    scale: 'TOPIC_REL',
    evidence_source: 'Custom-Relationships',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'relationships',
    order: 115
  },

  // ============= TOPIC: ANXIETY (Quick - 4 вопроса) =============
  {
    id: 'topic_anx_quick_1',
    text: 'Чувствуете страх перед неопределённостью или новым?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'anxiety',
    order: 200
  },
  {
    id: 'topic_anx_quick_2',
    text: 'Избегаете ситуаций, которые вызывают тревогу?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'anxiety',
    order: 201
  },
  {
    id: 'topic_anx_quick_3',
    text: 'Чувствуете телесные симптомы тревоги (учащённое сердцебиение, напряжение)?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'anxiety',
    order: 202
  },
  {
    id: 'topic_anx_quick_4',
    text: 'Сложно остановить поток тревожных мыслей?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'anxiety',
    order: 203
  },

  // ============= TOPIC: ANXIETY (Deep - 12 вопросов) =============
  {
    id: 'topic_anx_deep_1',
    text: 'Трудно переносить неопределённость, нужно всё контролировать?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 204
  },
  {
    id: 'topic_anx_deep_2',
    text: 'Избегаете ситуаций или мест, которые вызывают тревогу?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 205
  },
  {
    id: 'topic_anx_deep_3',
    text: 'Проверяете много раз одно и то же (сообщения/замок/плиту)?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 206
  },
  {
    id: 'topic_anx_deep_4',
    text: 'Чувствуете учащённое сердцебиение, напряжение в теле, тремор?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 207
  },
  {
    id: 'topic_anx_deep_5',
    text: 'Замечаете головокружение, тошноту, "ком в горле"?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 208
  },
  {
    id: 'topic_anx_deep_6',
    text: 'Прокручиваете одни и те же мысли по кругу (руминации)?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 209
  },
  {
    id: 'topic_anx_deep_7',
    text: 'Думаете о плохих сценариях будущего (катастрофизация)?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 210
  },
  {
    id: 'topic_anx_deep_8',
    text: 'Сложно "выключить голову" перед сном?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 211
  },
  {
    id: 'topic_anx_deep_9',
    text: 'Чувствуете страх оценки или осуждения других?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 212
  },
  {
    id: 'topic_anx_deep_10',
    text: 'Боитесь потерять контроль над собой или ситуацией?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 213
  },
  {
    id: 'topic_anx_deep_11',
    text: 'Часто перепроверяете информацию или ищете подтверждения?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 214
  },
  {
    id: 'topic_anx_deep_12',
    text: 'Тревога мешает работе, учёбе или социальной жизни?',
    scale: 'TOPIC_ANX',
    evidence_source: 'Custom-Anxiety',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'anxiety',
    order: 215
  },

  // ============= TOPIC: WORK (Quick - 4 вопроса) =============
  {
    id: 'topic_work_quick_1',
    text: 'Чувствуете эмоциональное истощение от работы?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'work',
    order: 300
  },
  {
    id: 'topic_work_quick_2',
    text: 'Стали более циничны или отстранены от работы?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'work',
    order: 301
  },
  {
    id: 'topic_work_quick_3',
    text: 'Работа "выходит за границы" личного времени или здоровья?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'work',
    order: 302
  },
  {
    id: 'topic_work_quick_4',
    text: 'Чувствуете, что работа потеряла смысл или ценность?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'work',
    order: 303
  },

  // ============= TOPIC: WORK (Deep - 12 вопросов) =============
  {
    id: 'topic_work_deep_1',
    text: 'Чувствуете физическое и эмоциональное истощение на работе?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 304
  },
  {
    id: 'topic_work_deep_2',
    text: 'Утром трудно заставить себя идти на работу?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 305
  },
  {
    id: 'topic_work_deep_3',
    text: 'Работа кажется бессмысленной или не приносит удовлетворения?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 306
  },
  {
    id: 'topic_work_deep_4',
    text: 'Стали циничны, раздражительны по отношению к коллегам/клиентам?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 307
  },
  {
    id: 'topic_work_deep_5',
    text: 'Чувствуете эмоциональную отстранённость, "выгорание"?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 308
  },
  {
    id: 'topic_work_deep_6',
    text: 'Работаете сверхурочно, забывая об отдыхе?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 309
  },
  {
    id: 'topic_work_deep_7',
    text: 'Сложно отключиться от работы в нерабочее время?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 310
  },
  {
    id: 'topic_work_deep_8',
    text: 'Чувствуете вину, когда отдыхаете или говорите "нет"?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 311
  },
  {
    id: 'topic_work_deep_9',
    text: 'Трудно устанавливать рабочие границы с начальством/коллегами?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 312
  },
  {
    id: 'topic_work_deep_10',
    text: 'Чувствуете, что потеряли профессиональный смысл или мотивацию?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 313
  },
  {
    id: 'topic_work_deep_11',
    text: 'Производительность снизилась, трудно концентрироваться?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 314
  },
  {
    id: 'topic_work_deep_12',
    text: 'Думаете об уходе или смене профессии из-за истощения?',
    scale: 'TOPIC_WORK',
    evidence_source: 'Custom-Burnout',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'work',
    order: 315
  },

  // ============= TOPIC: OTHER (Quick - 4 вопроса) =============
  {
    id: 'topic_other_quick_1',
    text: 'Чувствуете, что эмоции слишком сильные или неконтролируемые?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'other',
    order: 400
  },
  {
    id: 'topic_other_quick_2',
    text: 'Трудно сосредоточиться на задачах или принять решение?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'other',
    order: 401
  },
  {
    id: 'topic_other_quick_3',
    text: 'Сомневаетесь в своей ценности или способностях?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'other',
    order: 402
  },
  {
    id: 'topic_other_quick_4',
    text: 'Чувствуете, что не на кого опереться или попросить помощь?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'quick',
    topic_gate: 'other',
    order: 403
  },

  // ============= TOPIC: OTHER (Deep - 12 вопросов) =============
  {
    id: 'topic_other_deep_1',
    text: 'Эмоции меняются очень быстро и неожиданно?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 404
  },
  {
    id: 'topic_other_deep_2',
    text: 'Сложно справляться с гневом, грустью или тревогой?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 405
  },
  {
    id: 'topic_other_deep_3',
    text: 'Чувствуете "эмоциональное онемение", словно ничего не чувствуете?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 406
  },
  {
    id: 'topic_other_deep_4',
    text: 'Трудно понять, что именно вы чувствуете (алекситимия)?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 407
  },
  {
    id: 'topic_other_deep_5',
    text: 'Думаете о себе в негативном ключе, критикуете себя?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 408
  },
  {
    id: 'topic_other_deep_6',
    text: 'Чувствуете, что недостаточно хороши, не заслуживаете любви/успеха?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 409
  },
  {
    id: 'topic_other_deep_7',
    text: 'Сравниваете себя с другими и чувствуете себя хуже?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 410
  },
  {
    id: 'topic_other_deep_8',
    text: 'Сложно сосредоточиться, мысли постоянно скачут?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 411
  },
  {
    id: 'topic_other_deep_9',
    text: 'Трудно принимать решения, постоянно сомневаетесь?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 412
  },
  {
    id: 'topic_other_deep_10',
    text: 'Чувствуете отсутствие поддержки или опоры в жизни?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 413
  },
  {
    id: 'topic_other_deep_11',
    text: 'Изолируете себя, избегаете людей или активностей?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 414
  },
  {
    id: 'topic_other_deep_12',
    text: 'Чувствуете потерю смысла или направления в жизни?',
    scale: 'TOPIC_OTHER',
    evidence_source: 'Custom-General',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'deep',
    topic_gate: 'other',
    order: 415
  },

  // ============= SAFETY (всегда последний) =============
  {
    id: 'safety_1',
    text: 'Появлялись мысли, что не хочется жить или хочется исчезнуть?',
    scale: 'SAFETY',
    evidence_source: 'Safety Screen',
    reverse_scored: false,
    answers: standardAnswers,
    version: 'both',
    topic_gate: 'all',
    order: 999
  }
];
