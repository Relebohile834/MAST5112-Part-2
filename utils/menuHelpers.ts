import { Course, CourseFilter, MenuItem, MenuStats } from "../types";

// Formats a number as South African Rand, e.g. 85 -> "R85.00"
export function formatPrice(amount: number): string {
  return `R${amount.toFixed(2)}`;
}

// Returns only the dishes that match the search text AND the chosen course.
// Search ignores capital letters; "All" means no course filtering.
export function filterMenuItems(
  items: MenuItem[],
  searchText: string,
  course: CourseFilter,
): MenuItem[] {
  const query = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName =
      query === "" || item.dishName.toLowerCase().includes(query);
    const matchesCourse = course === "All" || item.course === course;
    return matchesName && matchesCourse;
  });
}

// Creates a { Starter: 0, Main: 0, Dessert: 0 } style object
function emptyCourseRecord(): Record<Course, number> {
  return { Starter: 0, Main: 0, Dessert: 0 };
}

// Works out the totals and averages shown on the statistics screen
export function calculateStats(items: MenuItem[]): MenuStats {
  const countByCourse = emptyCourseRecord();
  const priceTotalByCourse = emptyCourseRecord();
  let priceTotal = 0;

  items.forEach((item) => {
    countByCourse[item.course] += 1;
    priceTotalByCourse[item.course] += item.price;
    priceTotal += item.price;
  });

  const averageByCourse = emptyCourseRecord();
  (Object.keys(averageByCourse) as Course[]).forEach((course) => {
    averageByCourse[course] =
      countByCourse[course] > 0
        ? priceTotalByCourse[course] / countByCourse[course]
        : 0;
  });

  return {
    total: items.length,
    averagePrice: items.length > 0 ? priceTotal / items.length : 0,
    countByCourse,
    averageByCourse,
  };
}
