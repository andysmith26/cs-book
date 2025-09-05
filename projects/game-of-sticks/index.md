---
title: "Game of Sticks: Build an AI That Learns"
layout: project
courseFit:
  - { course: "ai", unit: "02-reinforcement-learning" }
  - { course: "csp", unit: "03-algorithms-programming" }
  - { course: "math", unit: "discrete-probability" }
skillsRequired:
  - { id: "programming/iteration", level: 1 }
  - { id: "programming/conditionals", level: 1 }
skillsSuggested:
  - { id: "programming/arrays", level: 1 }
  - { id: "tooling/debugging", level: 1 }
status: "current"
tags: ["ai", "game", "interactive", "learning"]
lastUpdated: "2025-01-14"
---

<script>
  import GameBoard from './components/GameBoard.svelte';
</script>

## Brief

Build an interactive game where you play against an AI that learns and improves its strategy over time. The Game of Sticks is a simple two-player game that's perfect for exploring concepts in artificial intelligence, pattern recognition, and reinforcement learning.

## Game Rules

- Start with 21 sticks
- Players take turns removing 1, 2, or 3 sticks
- The player forced to take the last stick loses
- Can you find the winning strategy?

## Interactive Demo

Try playing the game below. You can switch between different AI modes to see how the computer's strategy changes:

<GameBoard />

## Learning Objectives

By completing this project, you will:

1. **Understand Game Theory**: Discover optimal strategies through play and analysis
2. **Implement AI Logic**: Build different AI personalities from random to strategic
3. **Explore Machine Learning**: Create an AI that learns from experience
4. **Practice Problem Solving**: Find patterns and prove mathematical strategies

## Build Steps

### Day 1: Play and Understand
- Play the game manually (pencil and paper)
- Record game outcomes and look for patterns
- Develop hypotheses about winning strategies

### Day 2: Code the Game
- Implement basic game rules and validation
- Create a simple user interface
- Add a random AI opponent

### Day 3: Smart Strategy
- Research optimal strategy (hint: think about multiples of 4)
- Implement a "smart" AI that plays optimally
- Test your implementation against the smart AI

### Day 4: Learning AI
- Design a learning system that tracks move outcomes
- Implement probability-based decision making
- Train your AI through repeated games

### Day 5: Analysis and Extension
- Visualize the AI's learning progress
- Write mathematical proof of optimal strategy
- Extend to other similar games (e.g., different starting numbers)

## Assessment Rubric

- **Game Implementation (25%)**: Correctly implements rules and user interface
- **Strategic Analysis (25%)**: Discovers and explains optimal strategy
- **AI Development (30%)**: Implements effective learning algorithm
- **Mathematical Proof (20%)**: Provides rigorous proof of strategy

## Extensions

Once you've mastered the basic game, try these challenges:

- **Variable Starting Numbers**: How does strategy change with different starting stick counts?
- **Multi-Player**: Adapt the game for 3+ players
- **Network Play**: Allow players to compete online
- **Tournament Mode**: Run AI vs AI tournaments to test different strategies
- **Visualization**: Create graphs showing AI learning curves

## Submit

- **Code Repository**: Well-documented GitHub repo with your implementation
- **Strategy Analysis**: Written explanation of optimal strategy with mathematical proof
- **AI Performance Report**: Data showing your learning AI's improvement over time
- **Demo Video**: 3-minute video demonstrating your game and AI capabilities

## Resources

- [Game Theory Basics](https://example.com) (placeholder link)
- [Reinforcement Learning Introduction](https://example.com) (placeholder link)
- [Mathematical Proof Techniques](https://example.com) (placeholder link)