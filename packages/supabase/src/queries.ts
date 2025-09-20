import { getSupabaseClient, isSupabaseConfigured } from "./client";
import type { Database } from "./types";

export type Course = Database["catalog"]["Tables"]["course"]["Row"];
export type CourseContent = Database["catalog"]["Tables"]["course_content"]["Row"];
export type Uc = Database["catalog"]["Tables"]["uc"]["Row"];
export type UcLearningOutcome = Database["catalog"]["Tables"]["uc_learning_outcome"]["Row"];

export interface CourseWithRelations extends Course {
  content?: CourseContent;
  ucs?: (Uc & { outcomes: UcLearningOutcome[] })[];
}

export async function fetchCourses(): Promise<CourseWithRelations[]> {
  if (!isSupabaseConfigured) {
    console.warn("Supabase não configurado. Retornando lista de cursos vazia.");
    return [];
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const catalog = supabase.schema("catalog");

  const { data: courseRows, error: courseError } = await catalog
    .from("course")
    .select("*")
    .order("name", { ascending: true });

  if (courseError || !courseRows) {
    console.error("Erro ao buscar cursos", courseError);
    return [];
  }

  const courseCodes = courseRows.map((course) => course.code);

  const contentPromise = courseCodes.length
    ? catalog
        .from("course_content")
        .select("*")
        .in("course_code", courseCodes)
    : Promise.resolve({ data: [] as CourseContent[] });

  const ucResponse = courseCodes.length
    ? await catalog
        .from("uc")
        .select("*")
        .in("course_code", courseCodes)
    : { data: [] as Uc[] };

  const ucRows = ucResponse.data ?? [];

  const outcomeResponse = ucRows.length
    ? await catalog
        .from("uc_learning_outcome")
        .select("*")
        .in(
          "uc_code",
          ucRows.map((uc) => uc.code)
        )
    : { data: [] as UcLearningOutcome[] };

  const contentRows = (await contentPromise).data ?? [];
  const outcomeRows = outcomeResponse.data ?? [];

  const contentByCourse = new Map<string, CourseContent>();
  for (const content of contentRows) {
    contentByCourse.set(content.course_code, content);
  }

  const outcomesByUc = new Map<string, UcLearningOutcome[]>();
  for (const outcome of outcomeRows) {
    const items = outcomesByUc.get(outcome.uc_code) ?? [];
    items.push(outcome);
    outcomesByUc.set(outcome.uc_code, items);
  }

  const ucsByCourse = new Map<string, (Uc & { outcomes: UcLearningOutcome[] })[]>();
  for (const uc of ucRows) {
    const outcomes = outcomesByUc.get(uc.code)?.sort((a, b) => a.order - b.order) ?? [];
    const items = ucsByCourse.get(uc.course_code) ?? [];
    items.push({ ...uc, outcomes });
    ucsByCourse.set(uc.course_code, items);
  }

  return courseRows.map((course) => ({
    ...course,
    content: contentByCourse.get(course.code),
    ucs: ucsByCourse.get(course.code),
  }));
}

export async function fetchCourseByCode(code: string): Promise<CourseWithRelations | null> {
  if (!isSupabaseConfigured) {
    console.warn("Supabase não configurado. Retornando curso nulo.");
    return null;
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const catalog = supabase.schema("catalog");

  const { data: course, error } = await catalog
    .from("course")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error || !course) {
    if (error) {
      console.error(`Erro ao buscar curso ${code}`, error);
    }
    return null;
  }

  const contentPromise = catalog
    .from("course_content")
    .select("*")
    .eq("course_code", course.code)
    .maybeSingle();

  const { data: ucRows } = await catalog
    .from("uc")
    .select("*")
    .eq("course_code", course.code);

  const outcomesResponse = ucRows && ucRows.length
    ? await catalog
        .from("uc_learning_outcome")
        .select("*")
        .in(
          "uc_code",
          ucRows.map((uc) => uc.code)
        )
    : { data: [] as UcLearningOutcome[] };

  const content = (await contentPromise).data ?? undefined;
  const outcomes = outcomesResponse.data ?? [];

  const outcomesByUc = new Map<string, UcLearningOutcome[]>();
  for (const outcome of outcomes) {
    const items = outcomesByUc.get(outcome.uc_code) ?? [];
    items.push(outcome);
    outcomesByUc.set(outcome.uc_code, items);
  }

  const enrichedUcs = (ucRows ?? []).map((uc) => ({
    ...uc,
    outcomes: (outcomesByUc.get(uc.code) ?? []).sort((a, b) => a.order - b.order),
  }));

  return {
    ...course,
    content,
    ucs: enrichedUcs,
  };
}
