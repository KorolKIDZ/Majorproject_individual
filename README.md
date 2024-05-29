# Majorproject_individual
Project for final assignment

Instructions：

Each time the page is refreshed and loaded, the animation will change.
The animation changes with the seasons: spring, summer, autumn, and winter.
Birds and the boat move across the screen based on the season.
Autumn includes a rainy scene, and winter includes a snowy scene.

Individual Approach：

Time-based animation to change seasons and move elements.
Position of birds and the boat, background color, and weather effects (rain and snow).
I adjusted the positions of the birds, bird group, and boat based on different seasons. This creates the effect of birds moving away as the weather gets colder to find warmer places to stay until the seasons warm up again, at which point they will return.

Inspiration：

The animation was inspired by natural seasonal changes and how they affect the environment.

Technical Explanation:

The animation uses p5.js to create and animate the elements.
Weather effects are created using functions to generate rain and snow graphics.
Seasonal changes are managed using localStorage to persist the state across page reloads.
I have additionally studied and used localStorage to manage the current season state of the animation. On each page refresh or reload, the next season is set based on the current season information and stored in localStorage for use during the next refresh.

References：

https://www.javascripttutorial.net/web-apis/javascript-localstorage/

https://blog.logrocket.com/localstorage-javascript-complete-guide/

[p5.js Documentation](https://p5js.org/zh-Hans/reference/)

Comments：

The code includes comments explaining each function and significant code blocks.
External techniques and inspirations are documented with references and explanations.
