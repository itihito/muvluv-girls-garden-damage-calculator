# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a game damage calculation web application currently in the planning phase. The project aims to create a single-page application where users can select game characters, configure their skills and gear, then calculate damage output using the "Alterios Formula."

## Current Status

⚠️ **Project is in planning phase** - no implementation code exists yet. The repository contains only documentation and planning materials.

## Technology Stack (Planned)

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **State Management:** React Context API or Zustand/Jotai
- **Internationalization:** i18next (Japanese, English, Chinese)
- **Styling:** CSS Modules, Styled Components, or Tailwind CSS
- **Deployment:** Static hosting (GitHub Pages, Netlify, or Vercel)

## Development Commands

Once the project is initialized, these commands will be available:

```bash
# Project initialization (first step needed)
npm create vite@latest . --template react-ts
npm install

# Development workflow
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Code linting
npm run test         # Run tests
```

## Key Architecture Details

### Core Features to Implement
1. **Character Selection System** - Visual character picker with icon-based interface
2. **Dynamic Skill Selection** - Skills populate based on selected character
3. **Damage Calculation Engine** - Implements the "Alterios Formula":
   - Base damage = Attack Power - Defense Power
   - Critical multiplier: 1.5x + gear customization
   - Advantageous attribute multiplier: 1.25x + gear customization
4. **Multi-language Support** - Japanese/English/Chinese switching
5. **Responsive Design** - Mobile and desktop compatibility

### UI/UX Requirements
- **Highly visual interface** - Minimize text, maximize graphical elements
- **Single-page application** with component-based architecture
- **Responsive design** for mobile and desktop
- **Intuitive user flow** for character → skills → gear → calculation

### Data Structure
- Character and skill data will be stored in JSON files or frontend code
- No backend database required (client-side calculations only)

## Important Files

- `PLAN.md` - Complete project specifications and requirements
- `.specstory/` - SpecStory extension artifacts (ignore for development)

## Development Notes

When starting development:
1. **Read PLAN.md first** - Contains detailed specifications and calculation formulas
2. **Initialize the project** using Vite + React + TypeScript template
3. **Focus on component architecture** - Plan for character, skill, and calculation components
4. **Implement i18next early** - Multi-language support is a core requirement
5. **Create responsive layouts** - Mobile-first design approach recommended

## Testing Strategy

- Unit tests for damage calculation engine
- Component testing for UI interactions
- Integration tests for complete user workflows
- Testing framework to be determined during setup (likely Vitest with React Testing Library)

## Communication Guidelines

- **Language:** All communication with users must be conducted in Japanese
- Respond to user requests and provide explanations in Japanese only