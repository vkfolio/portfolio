---
title: Why I built VClaw
dek: A personal AI that operates my machines, without handing my data, or my uptime, to anyone else.
date: '2026-06-21'
dateLabel: Jun 2026
room: vclaw
words: 720
roomLabel: VClaw
---

I run several machines: a desktop, a couple of laptops, a home server. I wanted one assistant that could actually *operate* them: not just answer questions, but open apps, move files, run commands, take a screenshot, reboot a box, all from my phone, from anywhere.

OpenClaw showed me the shape of that future: a personal AI wired into your digital life. But the usual way to reach one (a Telegram or WhatsApp bot, or a hosted service) sat wrong with me, for two reasons.

## Privacy
Every message, file, and command would pass through someone else's servers. My machines, my data, routed through a third party I had to trust. For an assistant that can read my files and run my shell, that's the wrong default.

## Dependency
The day their service had downtime, or my bot account got flagged, my assistant would simply vanish. I didn't want a controller I didn't control.

## So I flipped it
VClaw runs on *my* hardware. There's no chat-platform middleman and no provider to depend on: if my machine is on, my assistant is up. I can still reach it from outside my network, privately, over my own Cloudflare WARP mesh, with nothing exposed to the public internet. And every risky action waits for my tap to approve.

What began as "control my own machines" grew into a full control plane: a multi-agent core (LangGraph, multi-provider), an admin console served by each node, an AG-UI-style interactive chat with Ask/Plan/Edit/Auto modes, a skills studio, a Teams-grade WebRTC remote desktop, a built-in terminal and one-tap quick actions, deep memory and MCP tools, and a native iOS app on the same API. A C++/Win32 extension does the low-level system control, gated behind capabilities.

The interesting engineering wasn't any one feature. It was making something this powerful *safe to own*: capability allowlists per device, an approval gate on everything risky, secrets that never touch the model, and a closed-source single-binary install so the whole thing is one line to run and yours to keep.
