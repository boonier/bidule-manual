---
sidebar_label: "Basic Audio File Player"
sidebar_position: 1
---

# Basic Audio File Player

## Description:

Audio file player with more flexibility. Useful for samplers and granular stuff.

## Inlets:

| Inlet          | Values              | Comments                           |
| -------------- | ------------------- | ---------------------------------- |
| Play Trigger   | Trigger             | Manually trigger or use clock      |
| Play Gate      | 0, 1                | Gate bidule, or Note Extractor etc |
| Play Position  | 0, (# of samples-1) | drive with Accum/ramp osc/envelope |
| Play Amplitude | 0, 1                |                                    |

## Outlets:

| Outlet                     | Values | Comments |
| -------------------------- | ------ | -------- |
| Audio Output L             | -1, 1  |          |
| Audio Output R             | -1, 1  |          |
| # of samples in audio file |        |          |
| Sample rate of audio file  |        |          |

## Parameters:

- Add file(s) to Media Pool
- Interpolation
