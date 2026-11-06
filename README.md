# MAST5112 Final PoE – Chef's Menu Manager

Code can be found in the App.tsx

# Links
- Video link (YouTube, unlisted): https://youtu.be/TObOjWGqaT8
- GitHub repository: https://github.com/Relebohile834/MAST5112-Part-2

# Chef's Menu Manager
A React Native mobile application that helps restaurant owners and chefs manage their menu digitally — no more paper lists. Built as part of the MAST5112 Portfolio of Evidence.

# Overview
Christoffel, a local restaurant owner, currently manages his menu on paper — making it slow to update dishes, keep things organised, and find information quickly. Chef's Menu Manager solves this by giving him a simple mobile app to manage his whole menu on the go.

This final version of the app allows the chef to:

- Add a new dish (name, description, course and price)
- Edit and delete existing dishes
- Search the menu by dish name and filter it by course
- See statistics about the menu (total dishes, average price, and dishes per course)
- Get immediate feedback if something is missing, entered incorrectly, or successfully saved

# Features
- **Three screens with clear navigation** — a bottom tab bar switches between Menu, Add Dish and Statistics
- **Edit menu items** — the Edit button opens the same form, pre-filled with the dish, and changes show immediately
- **Delete menu items** — a confirmation pop-up appears first so dishes are not removed by accident
- **Search by name** — the list updates as the chef types (not case sensitive, matches part of a name)
- **Filter by course** — tap All, Starter, Main or Dessert; search and filter work together
- **Clear search and filter** — one button brings the full menu back
- **Menu statistics** — total dishes, average price, and the number of dishes and average price in each course
- **Course selection chips** — tap to choose Starter, Main, or Dessert (no fiddly dropdown)
- **Field validation** — required fields, letters-only dish names, valid positive prices, no duplicate dish names, and length limits, all with inline error messages
- **Success and confirmation pop-ups** — shown when a dish is added, updated or deleted
- **Empty state messaging** — friendly messages when the menu is empty, when no dishes match a search, and when there are no statistics yet

# Screenshots
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/9040a1d2-4f85-4434-9681-a9033e665728" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/f059ab81-7862-47de-9339-4483821b8b25" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/0f06a870-3c90-447c-a1c2-d026e3ef353b" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/10b0ba10-7da4-486c-867b-69ed96cce43a" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/a270c07f-1a03-4a07-8a83-5ac8516440a6" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/0b1033c6-9d15-45fe-a960-6286bd7af9b3" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/941a019a-9b77-40e8-aca8-9562ae875dc8" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/d36589a9-ca09-480b-8b97-c2be5db1f470" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/a8756de2-842d-4348-81b5-8213804cb4a6" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/427dff4e-6eee-4227-b924-8069b3073371" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/2f28dcd2-00da-421f-9fcd-75a8e0c476f0" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/67baccba-7b77-4d0d-ae6a-c28bf7e48b2c" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/f92658e3-caa9-42c3-a333-42b33789078b" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/563e7f9e-aa09-47a8-b13b-f25f8fef905f" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/1e75c51c-d3bb-47a7-ab52-65cdf99ea43c" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/de5f1221-a777-4378-93c9-133d85ccb1e7" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/d203e0e1-2917-4bd1-a7cb-ee43a70e4b2e" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/b0f96d55-7985-4916-a44f-22c0b557c838" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/186875c9-6fc7-434a-8dd6-46d7f6e1e222" />
<img width="295" height="575" alt="image" src="https://github.com/user-attachments/assets/211d79d1-4130-408f-a28b-b3511e62baf2" />

# Tech Stack
- React Native
- Expo (managed workflow)
- TypeScript
- Core React Native components: TextInput, TouchableOpacity, FlatList, ScrollView, Modal, SafeAreaView, KeyboardAvoidingView

# How to run
```bash
npm install
npx expo start
```
Then press `w` for the web version, or scan the QR code with Expo Go on a phone.

# Project structure
```
App.tsx                      Main screen logic and state
types.ts                     Shared TypeScript types
constants.ts                 Courses, validation limits, colour palette
components/
  AppHeader.tsx              Title bar with the dish count
  TabBar.tsx                 Bottom navigation (Menu / Add Dish / Statistics)
  MenuForm.tsx               Form used for both adding and editing a dish
  MenuItemCard.tsx           One dish card with Edit and Delete buttons
  SearchFilterBar.tsx        Search box, course chips and clear button
  StatsPanel.tsx             Menu statistics display
  FeedbackModal.tsx          Reusable pop-up (success messages, delete confirmation)
utils/
  validation.ts              Form validation rules
  menuHelpers.ts             Filtering, statistics and price formatting functions
```

# Change Log (changes since Part 2)

## New functionality
1. **Edit a menu item** — Edit button on each dish card opens the form pre-filled with the dish's details; saving updates the list straight away.
2. **Delete a menu item** — Delete button on each card, with a "Delete dish?" confirmation before the dish is removed.
3. **Search by name** — search box filters the list as the chef types.
4. **Filter by course** — All / Starter / Main / Dessert chips.
5. **Clear search and filter** — button appears whenever a search or filter is active.
6. **Menu statistics** — new Statistics screen showing total dishes, average price, and dishes and average price per course (with a bar showing each course's share of the menu).
7. **Navigation** — bottom tab bar to move between Menu, Add Dish and Statistics (Part 2 had a single screen).

## User experience and validation improvements
- Duplicate dish names are now rejected (not case sensitive; a dish can keep its own name while being edited).
- Added length limits for the dish name (40 characters) and description (150 characters), and a maximum price of R9999.99.
- Clearer error messages, and each field's error disappears as soon as the chef starts correcting it.
- Success pop-ups when a dish is added, updated or deleted.
- Fields now have labels above them, with example text kept as placeholders.
- Header now reads "3 dishes on the menu" (and "1 dish" for a single dish) instead of "Total Items Added: 3".
- The Menu screen shows "Showing 2 of 5 dishes" while a search or filter is active.
- Three different empty states: no dishes yet, no search matches (with a "Show all dishes" button), and no statistics yet.
- The same colours, card style and spacing are used on every screen.

## Refactoring (what changed in the code)
- **Split one large file into modules.** Part 2 kept everything in a single `App.tsx` of about 530 lines. The code is now divided into `types.ts`, `constants.ts`, `utils/` and `components/`, and `App.tsx` only handles state and screen layout.
- **Reusable components.** The UI is built from small components (`AppHeader`, `TabBar`, `MenuForm`, `MenuItemCard`, `SearchFilterBar`, `StatsPanel`, `FeedbackModal`) instead of one long block of JSX.
- **One form for adding and editing.** `MenuForm` is used for both, so the layout and validation are not written twice.
- **Reusable functions.** Validation moved out of `handleAddDish` into `validateMenuForm` and `hasErrors`. Filtering, statistics and price formatting are now `filterMenuItems`, `calculateStats` and `formatPrice`.
- **Shared types.** The `"Starter" | "Main" | "Dessert"` type was repeated in several places in Part 2. It is now defined once as `Course` in `types.ts`, together with `CourseFilter`, `FormValues`, `FormErrors` and `MenuStats`.
- **Simpler form state.** Separate `useState` variables for each field and each error (six in total) were replaced by one `values` object and one `errors` object inside `MenuForm`.
- **Colours and settings in one place.** Colour codes that were typed directly into the styles are now in a `COLORS` object in `constants.ts`, next to the course list and validation limits.
- **Generalised the pop-up.** The Part 2 success modal became `FeedbackModal`, which supports success, error and confirmation variants (success and delete confirmation are used in the app).
- **Removed unneeded state.** The `lastAddedDish` state was removed because the success message is now built when the dish is added.
- **Efficient calculations.** The filtered list and the statistics use `useMemo`, so they are only recalculated when the menu, search text or filter changes.
- **Clearer code.** Descriptive function and variable names, with comments explaining each part.

# References
React Native, 2026. React Native Documentation. [online] Available at: <https://reactnative.dev/docs/getting-started> [Accessed 24 October 2026].

# Author
Relebohile Thato Phalatsi
Student Number: ST10508029
MAST5112 — Mobile Application Scripting
