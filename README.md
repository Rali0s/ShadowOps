# ShadowOps Offline Toolkit

This repository now ships with a Python 3 command line interface that mirrors the demo user experience of the ShadowOps web client. The CLI exposes the core feature set without relying on the database or authentication flows.

## Requirements
- Python 3.9+
- Optional: [`simpleaudio`](https://pypi.org/project/simpleaudio/) for inline WAV playback (otherwise files are rendered for manual listening)

Install dependencies with:

```bash
python -m pip install .
```

## Running the CLI

Launch the toolkit from the project root:

```bash
python -m cli
```

You can also execute all modules sequentially via the "Run all modules" menu entry.

### Modules
- **Operations Manual** – renders Markdown-based training doctrine stored in `content/` for reuse by future clients.
- **Research Archive** – browsable gamma-tier documents with search, category filters, and tag cloud analytics.
- **Audio Frequency Lab** – generate single or binaural tones from presets or custom frequencies, save WAVs, and trigger optional playback.
- **Remote Viewing Training** – start guided sessions, log perceptions across stages, compute accuracy, and persist history in `~/.shadowops/cli/`.

### Content Pipeline
Long-form text lives under `content/` to keep the CLI and web surfaces in sync. Additional documents can be added as Markdown files and will automatically be available to the operations manual module.

## Python Package Layout
```
cli/
  audio/          # Tone synthesis, presets, and visualisation helpers
  data/           # Demo datasets ported from the TypeScript backend
  research/       # Research archive filters and CLI orchestration
  rv/             # Remote viewing session engine and history tools
  utils/          # Formatting and IO utilities shared across modules
content/           # Markdown sources for manuals and future pages
```
