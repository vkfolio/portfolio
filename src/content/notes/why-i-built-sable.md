---
title: Why I built Sable
dek: Eight components. The eight I keep reaching for. The rest is restraint.
date: '2025-02-14'
dateLabel: Feb 2025
room: sable
words: 740
roomLabel: Sable
---

Every component library I have ever adopted has felt slightly too generous. There is always a tab strip I do not use, a popover variant for the case I do not have, a colour-system abstraction that solves a problem I was not yet old enough to know about. I started Sable because I wanted to find out what was left if I only built the parts I had reached for three times in production.

Three times is a lot. It rules out anything I built once and rationalised, and it rules out anything I copied from a Figma deck and never put under load. It leaves a surprisingly small list.

## The eight

Button, Input, Select, Stack, Card, Dialog, Tabs, and Table. There is no Accordion because I have never shipped one I was proud of. There is no Toast because the only honest toast is the one your application already renders for itself. There is no DataGrid because a DataGrid is a product, not a primitive, and pretending otherwise is how libraries get to forty thousand stars and zero clarity.

## The shape of restraint

Sable's first design decision was to refuse to ship a theme system. Themes are how component libraries die: every new product wants one more knob, every knob couples one more pair of components together, and three years later you have a system that knows everything about your buttons and nothing about your interfaces. Sable has CSS variables. That is the theme system. If you want dark mode, set the variables differently when the user prefers dark. If you want a brand colour, set `--accent`. That is the entire surface.

The second decision was to refuse storybook-driven documentation. Storybooks make a component look like the most important thing on the page, which is the opposite of what a component is for. Every Sable primitive has one documentation page. It shows the props that matter, the props I considered and rejected, and an honest paragraph about what the component cannot do. The page is shorter than this essay.

## What I learned

The first thing I learned was that I had been carrying a phantom limb for years. I kept reaching for a `FormField` wrapper that does label + input + error in one motion, and I kept being mildly annoyed when none of the libraries I used had one. Sable has one. I built it the morning after I noticed I had written it inline in three projects.

The second thing I learned was that the parts of a library you most want to add are usually the parts you should most refuse to add. Every contributor has a Modal-with-confirmation pattern they want as a first-class primitive. Every contributor's pattern is slightly different. The right answer is almost always: here is Dialog; compose.

## What it costs

Nine kilobytes gzipped, no dependencies. Twelve months of nobody adopting it because it does not have a Tabs variant with a vertical indicator. I am at peace with both numbers.

If you build interfaces for a living, you have an eight. They are probably not the same eight as mine. The exercise of figuring out which eight is what I would recommend; the library is what came out the other side.
