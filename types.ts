// Shared TypeScript types used across the whole app

export type Course = "Starter" | "Main" | "Dessert";

// "All" is only used by the filter, never stored on a dish
export type CourseFilter = Course | "All";

// The three screens the chef can move between
export type TabKey = "menu" | "add" | "stats";

// A single dish on the menu
export interface MenuItem {
  id: string; // Unique identifier (timestamp)
  dishName: string;
  description: string;
  course: Course;
  price: number;
}

// Raw text values held by the add/edit form (price is text until validated)
export interface FormValues {
  dishName: string;
  description: string;
  course: Course;
  price: string;
}

// One error message per text field ("" means no error)
export interface FormErrors {
  dishName: string;
  description: string;
  price: string;
}

// Numbers shown on the statistics screen
export interface MenuStats {
  total: number;
  averagePrice: number;
  countByCourse: Record<Course, number>;
  averageByCourse: Record<Course, number>;
}
