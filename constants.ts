import { Course, CourseFilter } from "./types";

// Fixed list of courses, used to build the chips on the form and the filter
export const COURSES: Course[] = ["Starter", "Main", "Dessert"];

// Filter chips = every course plus "All" to show everything again
export const FILTER_OPTIONS: CourseFilter[] = ["All", ...COURSES];

// Validation limits
export const MAX_NAME_LENGTH = 40;
export const MAX_DESCRIPTION_LENGTH = 150;
export const MAX_PRICE = 9999.99;

// One colour palette used on every screen so the app looks consistent
export const COLORS = {
  background: "#FAFAF7",
  surface: "#FFFFFF",
  border: "#EAE0D8",
  textDark: "#2C1A14",
  textMuted: "#604E47",
  textLight: "#A08E88",
  accent: "#C85A32",
  accentSoft: "#FDF0E6",
  error: "#D32F2F",
  errorSoft: "#FFEBEE",
  success: "#2E7D32",
  successSoft: "#E8F5E9",
};
