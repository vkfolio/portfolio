---
title: Visual debug for LangGraph agents
dek: The friction VizLang Studio answers, in one annotated screenshot.
date: '2026-04-02'
dateLabel: Apr 2026
room: vizlang-studio
words: 620
roomLabel: VizLang Studio
---

A LangGraph trace is JSON-Lines. Each line is one node-traversal. If you have ever stepped through one in a terminal you have spent a small but meaningful part of your life reconstructing the graph from the messages, which is exactly the part of agent debugging you do not want to do by hand.

The friction is not the trace format. JSON-Lines is fine. The friction is that the trace is positional in time and the graph is positional in space, and your brain is being asked to do the rotation between them on every breakpoint.

## What VizLang shows

A left-to-right node graph, drawn from the trace, with the active edge animated and tool calls expanded inline. The cursor moves through the trace; the view does not. If the run loops, the loop renders as a loop. If a node retries, the retries stack.

<figure>
  Annotated screenshot: agent loop with planner, executor, validator nodes. Tool-call panel docked to the right.<br/>
  <figcaption>fig. 01: placeholder; final figures stamped at publish time.</figcaption>
</figure>

The one decision that mattered was deciding the view would not autoscroll. Every other LangGraph viewer I have tried treats the trace as a log. It is not a log. It is a flight plan.

## What I keep refusing to add

A live mode that pulls traces over a websocket and re-renders. The mode I want to be the default (read a finished trace file) is what makes the tool calm. Live mode would be a different product. I keep it in my head; I do not keep it in the repo.

A node-detail panel that shows full message history for every edge. Half the value of the visualisation is the compression. Putting the full message back into the UI is a regression, not a feature.

## What the next version does

It indexes node identity by content-hash, so reruns of the same agent on different inputs sit on top of each other in the same visual frame. You see drift before you see the failure.

It exports the active subgraph as an SVG. People in pull requests want to look at one of these. They do not want to install a VS Code extension.

If you spend any time at all debugging agent loops, this is the tool I would recommend to my past self.
