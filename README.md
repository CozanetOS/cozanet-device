# Cozanet OS: Device Management Engine

[![CozanetOS Core](https://img.shields.io/badge/OS-AI--native-blueviolet.svg)](#)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](#)

A centralized, cryptographically secure registry and execution engine for cross-device synchronization, universal clipboard sharing, remote task execution, and continuous health monitoring.

---

## 🌌 Overview

The `cozanet-device` engine abstracts physical hardware into a unified, secure resource pool. It enables the AI-native OS to seamlessly interact with cameras, sensors, and remote storage layers as if they were a single continuous machine.

Developed specifically for **CozanetOS**—the world's first AI-native operating system—this module runs as an autonomous microservice, continuously communicating with neighboring engines to deliver frictionless operational efficiency.

---

## ✨ Core Capabilities

- **Connected device registry**: tracks all paired devices
- **Device monitoring**: health, battery, connectivity status
- **Remote task execution**: run commands on connected devices
- **File synchronization**: keep files in sync across devices
- **Clipboard sharing**: universal clipboard across devices
- **Notifications**: push notifications to any device
- **Camera access**: stream and capture from device cameras
- **Microphone access**: audio capture from devices
- **Storage management**: view and manage device storage
- **Device health monitoring**: CPU, RAM, disk, temperature
- **Sensor access**: GPS, accelerometer, gyroscope (mobile)
- **Permissions management**: grant/revoke per-device capabilities
- **Device discovery**: automatic detection of nearby devices
- **Secure pairing**: cryptographic device authentication

---

## 🛠️ System Architecture

This engine operates as a decoupled service under the orchestration of CozanetOS. It leverages message queues and secure IPC channels to coordinate operations with low-latency responsiveness.

```
       ┌────────────────────────────────────────────────────────┐
       │                 CozanetOS Core Engine                  │
       └──────────────────────────┬─────────────────────────────┘
                                  │ (Secure IPC / Events)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │             COZANET-DEVICE (This Module)          │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   Capabilities Layer                             State Persistence
   (Core Logic & Routines)                        (Cache / Local DB)
```

---

## 🔗 Integration Ecosystem

`cozanet-device` is deeply integrated with:

- `cozanet-filesystem` (to securely store captured media and sync multi-device storage)
- `cozanet-multimodal` (to analyze camera, microphone, and sensor streams with local AI)
- `cozanet-security` (to govern device pairing, API keys, and device-level permissions)
- `cozanet-monitoring` (for aggregated hardware metrics, CPU/thermal states, and health alerts)

---

## 🚀 Quick-Start Guide

Get up and running with the development environment in just a few steps.

### Prerequisites

- Node.js (v18 or higher)
- Rust Toolchain (if compiling native bindings)
- Docker (optional, for localized testing)

### Installation

Clone and install dependencies within the monorepo context or as a standalone module:

```bash
git clone https://github.com/CozanetOS/cozanet-device.git
cd cozanet-device
npm install
```

### Running Development Server

To boot the module with hot-reloading and development-level logging:

```bash
npm run dev
```

### Running Tests

Execute the unit and integration suite to verify performance standards:

```bash
npm test
```

---

## 📄 License

This repository is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
