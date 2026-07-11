# Cozanet Device

A robust TypeScript system telemetry, monitoring, and notification tool designed to work on host devices.

## Features
- **Device Registry (`device:registry`)**:
  - `register(device)` - Manages host registration.
  - `getDevice(id)` - Accesses specific hosts.
  - `listDevices()` - Lists metadata on registered hosts.
- **System Monitoring (`device:monitor`)**:
  - Uses `systeminformation` to gather CPU usage, real-time memory availability, and disk statuses.
  - `watch(interval, handler)` - Polling watcher for real-time monitoring and reporting.
- **Notification Engine (`device:notifications`)**:
  - Uses `node-notifier` to dispatch cross-platform native alerts directly to the OS.
  - `sendAlert(msg, severity)` - Easy logging alerts (info, warning, critical).
- **Storage Engine**:
  - `getAvailable()` / `getTotal()` - Quick disk queries.
  - `listMounts()` - Fully resolved paths, sizes, formats, and usage metrics per partition.
- **Stubs**:
  - Sync capabilities (`device:sync`) and local Clipboard manager (`ClipboardManager`).

## Installation

```bash
npm install
```
