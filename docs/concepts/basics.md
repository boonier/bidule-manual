---
sidebar_label: "What is Discrete Processing?"
sidebar_position: 1
---

# Discrete Processing

Discrete processing is an event-driven approach to signal processing.

Normally audio rate processing is done sample by sample, but with discrete processing, the signal is sampled at a discrete rate. So with a buffers worth of samples (1024 or 4096 for example), a single value will be picked meaning that no extra processing is done.

Ultimately this helps reduce CPU usage and can improve performance considerably.

However there are caveats, and sometimes the workaround can make things even slower.
