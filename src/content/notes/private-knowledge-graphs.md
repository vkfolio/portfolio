---
title: Private knowledge graphs for codebases
dek: A problem class, written carefully without naming any product or employer.
date: '2024-11-18'
dateLabel: Nov 2024
room: oriosearch
words: 880
roomLabel: OrioSearch
---

There is a problem class that recurs in any organisation that ships software at scale: the codebase is the most accurate description of the system, but no human reads it linearly. Engineers read it through tools (search, grep, autocomplete, code review), and each of those tools answers a question of a particular shape. None of them answers the question your new joiner actually has, which is some variant of: where does this idea live.

I have worked on enough of these problems, at enough scales, to have opinions about which approaches survive contact with reality. This essay is about the shape of those opinions, not the specifics of any product I have shipped.

## What does not work

Embedding the whole repo and asking an LLM does not work. The chunks lose structure; the LLM hallucinates module boundaries. The output is plausible English that points at the wrong file. New joiners trust it, then trust the codebase less when it turns out to be wrong, and you are now worse off than before.

Building a hand-curated wiki does not work either. The wiki is accurate on the day it is written and a liability eighteen months later. The problem is not laziness; the problem is that the wiki and the code are two artefacts and only one of them is under continuous integration.

A vector database over docstrings does not work as a primary surface. It works as a secondary one. The semantic vector tells you which functions are *similar*. The thing your new joiner needed was which function is *called from the request handler*.

## What does work

A graph extracted from the code, refreshed on every merge, with one carefully chosen set of edges. The edges that matter are: who calls whom, who owns whom, and which test exercises which surface. Not import graphs. Import graphs have too many nodes and the wrong topology. Call graphs at the function level, owner annotations at the directory level, test-coverage edges at the route level.

Then a thin search layer on top, with one rule: never return a node without showing the edge that got you there.

## The hard part

The hard part is not the extraction. Static analysis at this granularity is well-understood; the tooling exists in every reasonably mature language ecosystem. The hard part is the social contract around what counts as an owner. Directories get reorganised. People leave teams. The graph needs to degrade gracefully: a stale owner edge should be visibly stale, not silently wrong.

The other hard part is the user surface. The graph is right; the search is right; the page that shows them is hard. You want the answer for the question they asked, and you want the *one extra link* that anticipates the question they will ask next. That is a UX problem, and most of these systems get it wrong by being either too sparse or too eager.

## What I would tell you if you were building this

Choose three edge kinds and refuse to add a fourth for a year. The temptation to add will be enormous. Resist it. Three is enough.

Show the edge in the result. Always. The compounding trust comes from the user being able to *verify* the answer without leaving the page. A retrieved snippet without provenance is a guess in nice clothing.

Stale-but-visible beats fresh-but-fragile. If your graph was last updated four hours ago, say so; do not paper over it.

Plan for the day your scoring is wrong. The first time a senior engineer searches for the thing they wrote last week and the system can't find it is the day you lose them as a user for six months. Make it easy to file the failure. Make it easier to use the system as if the failure didn't happen.

If you do these four, the system gets used. If you don't, it gets quietly bypassed and you don't learn why for a year.
