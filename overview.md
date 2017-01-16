---
title   : Overview
anchors : true
---


# Overview

An SFU (Selective Forwarder Unit) receives audio and video streams from every participant in a conference room and relays them to everyone else (endpoints send one and receive many). Compared to a mixer or MCU (Multipoint Control Unit), this design leads to a better performance, higher throughput and less latency. It's highly scalable and requires much less resources given that it does not transcode or mix media.

Since endpoints get the other participants media separately, they can have a personalized layout and choose which streams to render and how to display them.

<div markdown="1" class="note">
Detailed information regarding the architecture of an SFU can be found at RFC 7667 "RTP Topologies" [section 3.7](https://tools.ietf.org/html/rfc7667#section-3.7).
</div>

Unlike other existing SFU implementations, **mediasoup** is not a standalone server but an unopinionated [Node.js](https://nodejs.org) module which can be integrated into a larger application:

```javascript
var mediasoup = require("mediasoup");
```

Thus internally, **mediasoup** can be splitted into two separete components:

* a JavaScript layer exposing a modern ECMAScript 6 [API](/api/) for Node.js, and
* a set of C/C++ subprocesses that handle the media layer (ICE, DTLS, RTP and so on).

Both components communicate to each other by means of inter-process communication. However, from the point of view of the developer, the application should just care about the JavaScript [API](/api/) exposed by **mediasoup**.

It's also noticeable the fact that **mediasoup** does not include or mandate a network signaling protocol (such as SIP or XMPP) but, instead, lets the application developer choose and implement the desired one.


## Installation

Within your Node.js application:

```bash
$ npm install mediasoup --save
```

Prior to that, ensure your host satisfies the following **requirements**:

* Node.js >= `v4.0.0`
* POSIX based operating system (Windows not yet supported)
* Python 2 (`python2` or `python` command must point to the Python 2 executable)
* `make`
* `gcc` and `g++`, or `clang`, with C++11 support

<div markdown="1" class="note">
In Debian and Ubuntu install the `build-essential` package. It includes both `make` and `gcc`/`g++`.
</div>


## Design goals

* Be a Node.js module.
* Be minimalist: just handle the media layer.
* Expose a modern ECMAScript 6 [API](/api/) in sync with [WebRTC 1.0](https://w3c.github.io/webrtc-pc/) and [ORTC](http://ortc.org/).
* Work with current WebRTC client implementations.


## Features

* Multiple conference rooms with multiple participants.
* IPv6 ready.
* ICE / DTLS / RTP / RTCP over UDP and TCP.
* Extremely powerful (media worker subprocess coded in C++ on top of [libuv](http://libuv.org)).
* Can handle RTP packets in JavaScript land.
