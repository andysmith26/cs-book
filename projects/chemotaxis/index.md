---
title: "Chemotaxis"
courseFit:
  - { course: "csa", unit: "06-arrays" }
skillsRequired:
  - { id: "programming/arrays", level: 2 }
  - { id: "programming/iteration", level: 2 }
  - { id: "oop/classes-objects", level: 1 }
skillsSuggested:
  - { id: "programming/methods", level: 1 }
  - { id: "tooling/git-basics", level: 1 }
status: "current"
tags: ["java","processing","simulation","arrays"]
legacySource: "instructions/Chemotaxis/"
lastUpdated: "2025-09-05"
---

## Brief
Simulate bacteria movement toward/away from a stimulus using arrays of agents and iterative updates.

## Build Steps
1. Define a `Bacteria` class with state and `update()`.
2. Create an array of bacteria; iterate to update and draw.
3. Add stimulus logic (attract/repel) and parameters.

## Rubric (skill-linked)
- Correct array traversal and updates (`programming/arrays` L2)
- Loop structure avoids off-by-one errors (`programming/iteration` L2)
- Object encapsulation (`oop/classes-objects` L1)

## Submit
- GitHub repo link; short write-up of parameters tested.
