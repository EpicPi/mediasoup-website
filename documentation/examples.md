---
title   : Examples
anchors : true
---


# Examples

<div markdown="1" class="note">
Projects below may use different versions of mediasoup. Please check it within each project.
</div>


### versatica/mediasoup-demo

**Project:** [https://github.com/versatica/mediasoup-demo](https://github.com/versatica/mediasoup-demo) (uses mediasoup v3)

This is the "official" mediasoup demo made by mediasoup authors. Said that, we (the authors) don't want this demo to become the "mediasoup reference" and encourage developers to read the API documentation instead.

The **mediasoup-demo** has a client side web application and a server side Node.js application:

* The client side is a [React](https://reactjs.org) application that uses [mediasoup-client](https://github.com/versatica/mediasoup-client) and [protoo-client](https://www.npmjs.com/package/protoo-client) among other libraries.
* The server side is a Node.js application that uses [mediasoup](https://github.com/versatica/mediasoup) and [protoo-server](https://www.npmjs.com/package/protoo-server).
* [protoo](https://protoojs.org) is a JavaScript library for both, client and server sides, that provides an easy way for clients to connect via WebSocket to a shared room. The API offers request/response transactions and notifications in both directions.
  - As an alternative (there are many) readers may be more used to [socket.io](https://socket.io).


### versatica/mediasoup-broadcaster-demo

**Project:** [https://github.com/versatica/mediasoup-broadcaster-demo](https://github.com/versatica/mediasoup-broadcaster-demo) (uses libmediasoupclient v3)

Made by [mediasoup authors](https://github.com/versatica), this project is a
[libmediasoupclient](https://github.com/versatica/libmediasoupclient/) based application that takes the system microphone and webcam and produces the media to the specified room in [mediasoup-demo](https://github.com/versatica/mediasoup-demo/) application.


### mkhahani/mediasoup-sample-app

**Project:** [https://github.com/mkhahani/mediasoup-sample-app](https://github.com/mkhahani/mediasoup-sample-app) (uses mediasoup v3)

A minimal Client/Server app based on Mediasoup and Socket.io made by [@mkhahani](https://github.com/mkhahani).


### footniko/mediasoup-sample

**Project:** [https://github.com/footniko/mediasoup-sample](https://github.com/footniko/mediasoup-sample) (uses mediasoup v2)

Made by [@footniko](https://github.com/footniko), this demo is born in response to the need of many users to have a simpler mediasoup based application example.

Both, the client side and server side, have a single `index.js` that include all the needed mediasoup API. The application uses [socket.io](https://socket.io) as signaling solution.


### michaelfig/mediasoup-broadcast-example

**Project:** [https://github.com/michaelfig/mediasoup-broadcast-example](https://github.com/michaelfig/mediasoup-broadcast-example) (uses mediasoup v2)

Made by [@michaelfig](https://github.com/michaelfig), this project is a vanilla Javascript example of how to use mediasoup to support the specific case of one-to-many broadcast audio/video on individual "channels".


### Others

Other public projects using mediasoup can be found in [GitHub](https://github.com/versatica/mediasoup/network/dependents).

