# ToDo-app-dom-events

GSG Code3Career To-Do app assignment

# 📋 To-Do App – Requirements

## 🎯 Objectives

- Understand and manipulate the DOM using JavaScript.
- Listen to and handle different types of events.
- Dynamically add, update, and remove elements from the page without refreshing.
- Maintain clean, readable, and well-structured code.

---

## 🛠️ Requirements

### 1. **HTML Structure**

- A title for the app (e.g., “My To-Do List”).
- An input field to type a new task.
- A button to add the task.
- A list container (`<ul>` or `<div>`) to display tasks.
- Each task item should have:
  - Task text
  - A "Complete" checkbox
  - A "Delete" button

---

### 2. **JavaScript Functionality**

- **Add Task**

  - When the "Add" button is clicked (or Enter key pressed), the task should be added to the list.
  - Ignore empty inputs.
  - Clear the input after adding.

- **Mark Task as Complete**

  - Clicking the "Complete" checkbox should toggle a "completed" style (e.g., strikethrough).

- **Delete Task**

  - Clicking the "Delete" button should remove that task from the list.

- **Event Handling**
  - Use `addEventListener` (no inline `onclick` attributes).
  - Demonstrate:
    - Click events
    - Keyboard events (Enter key for adding)
    - Event delegation for handling list item actions

---

### 3. **DOM Manipulation**

- Create, append, and remove elements dynamically.
- Use `classList` to toggle styles.
- Avoid direct HTML string concatenation for elements (use `createElement`).

---

### 4. **Styling**

- Completed tasks should have a different style (e.g., grey color + line-through).
- Hover effects for buttons.
- Minimal but neat layout.

---

## 📚 Concepts Practiced

- DOM selection (`getElementById`, `querySelector`, etc.)
- Creating & appending elements
- Removing elements
- Event bubbling and delegation
- Keyboard event handling
- Using `classList` for styling changes

---

## ✅ Deliverables

- `index.html`
- `style.css`
- `script.js`

---
