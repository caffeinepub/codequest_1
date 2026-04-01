# CodeQuest - Game-Based Programming Learning Platform

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Landing/onboarding page with story intro ("Become a Code Hero")
- Language selection screen: C, Python, Java
- Level map / world map showing progression (Beginner → Intermediate → Advanced → Expert)
- Gameplay screen with drag-and-drop code blocks mechanic
- Fix-the-bug mini game
- Multiple choice / logic path selection game
- Player dashboard: XP points, badges, daily streak, level progress
- Badges & achievements system (Loop Master, Bug Hunter, etc.)
- Leaderboard screen
- Profile/avatar selection screen
- Backend: user progress, XP, badges, streak tracking per player

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend actor: store player profiles (name, avatar, XP, streak, badges, completed levels per language)
2. Backend: query/update level completion, award badges, leaderboard query
3. Frontend pages:
   - `/` Hero landing with arcade style CTA
   - `/onboarding` Avatar + name selection
   - `/select` Language selection (C / Python / Java)
   - `/map/:lang` World map with level nodes
   - `/play/:lang/:level` Gameplay screen (drag-drop / multiple choice / fix-bug)
   - `/dashboard` Player stats, badges, streak
   - `/leaderboard` Top players
4. Gamification: XP on level complete, badge unlock popups, daily streak counter
5. Cartoon/arcade visual style: dark background, neon colors, pixel-style fonts, animated characters
