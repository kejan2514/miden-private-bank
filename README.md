# Miden Private Bank

A community-built privacy-focused banking prototype inspired by the official [Miden Bank tutorial](https://docs.miden.xyz/builder/tutorials/miden-bank/).

The project starts with a polished browser dashboard that models the tutorial's core concepts: programmable bank account logic, deposit notes, withdrawal request notes, and output notes. The current UI is intentionally a **local simulation** and does not submit real Miden transactions yet.

## What is included

- Private-bank dashboard UI
- Deposit note simulation
- Withdrawal request simulation
- Note lifecycle activity feed
- Bank balance and flow metrics
- Tutorial architecture mapping
- Responsive desktop/mobile layout

## Run locally

No build step is required for the first prototype.

```bash
git clone https://github.com/kejan2514/miden-private-bank.git
cd miden-private-bank
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Architecture roadmap

The next phase is to connect this UI to a real Miden implementation derived from the official tutorial structure:

1. **Bank account component** — programmable storage and account procedures.
2. **Deposit note** — carries assets and invokes the bank deposit flow.
3. **Withdrawal request note** — expresses a withdrawal request against the bank.
4. **Transaction script** — initializes and coordinates the required calls.
5. **Output note** — returns withdrawn assets to the intended recipient.
6. **MockChain tests** — verify deposit and withdrawal end-to-end before any network integration.

The official Miden tutorials repository contains the reference implementation under `examples/miden-bank` and the corresponding documentation under `docs/src/miden-bank`.

## Status

**Phase 1: dashboard prototype — complete**

**Phase 2: Rust/Miden core — next**

> This repository is an independent community project and is not an official Miden product. The current dashboard is a simulation and should not be used for real funds.
