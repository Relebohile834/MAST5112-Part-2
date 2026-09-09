# MAST5112-Part-2

# Code can be found in the App.tsx

# Chef's Menu Manager
A React Native mobile application that helps restaurant owners and chefs manage their menu digitally — no more paper lists. Built as part of the MAST5112 Portfolio of Evidence.

# Overview
Christoffel, a local restaurant owner, currently manages his menu on paper — making it slow to update dishes, keep things organised, and find information quickly. Chef's Menu Manager solves this by giving him a simple mobile app to capture and view menu items on the go.

This version of the app allows the chef to:

Enter a new dish's name, description, course, and price
Save the dish to the current menu
View all added dishes in a clean, scrollable list
Get immediate feedback if something's missing or entered incorrectly

# Features
Simple, card-based UI — clear header, input form, and menu list, styled consistently throughout
Course selection chips — tap to choose Starter, Main, or Dessert (no fiddly dropdown)
Live item counter — header updates automatically as dishes are added
Field validation — required fields are enforced, with inline error messages
Pattern validation — dish names must contain only letters; prices must be a valid positive number
Success confirmation — a modal confirms each dish was added successfully
Empty state messaging — a friendly prompt is shown before any dishes have been added
Dynamic list rendering — the menu list updates instantly using FlatList, no manual refresh needed

# Screenshots
Empty Form:
<img width="1917" height="1033" alt="Screenshot 2026-09-09 132801" src="https://github.com/user-attachments/assets/9cdbd434-c70a-49ce-9146-b56bee0dc239" />
<img width="1893" height="427" alt="Screenshot 2026-09-09 133108" src="https://github.com/user-attachments/assets/c55bca67-18f3-4710-9217-cd47e4df8139" />

Populated Menu:
<img width="1915" height="726" alt="Screenshot 2026-09-09 133452" src="https://github.com/user-attachments/assets/383cc3a4-e636-4165-a06f-eb61fbdc0512" />
<img width="1906" height="861" alt="Screenshot 2026-09-09 133741" src="https://github.com/user-attachments/assets/7a28f0a0-480e-4fbb-9430-a031f32c2f30" />

Validation Errors:
<img width="1917" height="907" alt="Screenshot 2026-09-09 133955" src="https://github.com/user-attachments/assets/759a5805-2e6f-4139-9bf3-96443c45e5b9" />
<img width="1912" height="902" alt="Screenshot 2026-09-09 134356" src="https://github.com/user-attachments/assets/08b2d7b3-bed0-4d0a-b61d-fdf71d6ff344" />
<img width="1916" height="933" alt="Screenshot 2026-09-09 134512" src="https://github.com/user-attachments/assets/77026c1e-465c-4de6-adec-6a385b2a9a7f" />

Success Modal:
<img width="1917" height="1001" alt="Screenshot 2026-09-09 135504" src="https://github.com/user-attachments/assets/d62093d8-b2ef-443a-9e7b-e74a6bb072a2" />

# Tech Stack
React Native
Expo (managed workflow)
TypeScript
Core React Native components: TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView, KeyboardAvoidingView

# Roadmap
Planned for the Final PoE submission:
Edit existing menu items 
Delete menu items
Search the menu
Filter menu items by course
Menu statistics (e.g. average price per course)

 # Author
 Relebohile Thato Phalatsi Student Number: ST10508029 MAST5112 — Mobile Application Scripting




