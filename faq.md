---
title   : F.A.Q.
anchors : true
---


# F.A.Q.

* Will be replaced with the ToC
{: toc}


### Why a Node.js module?
{: #why-a-nodejs-module}

You may wonder "why not a standalone server?". That's a fair question.

Being a [Node.js](https://nodejs.org) module, mediasoup is easily integrable within larger Node.js applications. Consider that mediasoup just handles the media plane (audio/video streams) so the application needs some kind of signaling mechanism. Having both the signaling and the media handlers working together makes the application architecture easier.

All those using others languages/platforms for the signaling plane would need to develop their own communication channel with a standalone Node.js server running mediasoup (or wait for somebody to do it).


### Is mediasoup a native addon?
{: #is-mediasoup-a-native-addon}

Not exactly. [Native addons](https://nodejs.org/api/addons.html) are Node.js extensions written in C/C++ that can be loaded using `require()` as if they were ordinary Node.js modules.

Instead, mediasoup launches a set of C++ child processes (media workers) and communicates with them by means of inter-process communication. This approach leads to a media worker design not tiled to the internals of Node.js or V8 (which change in every new release).


### Which signaling protocol does it use?
{: #which-signaling-protocol-does-it-use}

That's a wrong question. mediasoup does not provide any network signaling protocol to communicate with endpoints/browsers. It just handles the media layer and provides a JavaScript API to set the media parameters.

It's up to the application developer to build his preferred signaling protocol to carry messages with such parameters.


### Is there any example code?
{: #is-there-any-example-code}

Yes, check the [examples](/documentation/examples/).


### Does mediasoup transcode?
{: #does-mediasoup-transcode}

No. All the peers in a room should support a common subset of audio and video codecs. Said that, WebRTC defines a list of MTI ("mandatory to implement") audio/video codecs, so in a world of happy unicorns this topic should not be a problem.


### Does it work with legacy SIP endpoints?
{: #does-it-work-with-legacy-sip-endpoints}

No. If you expected a different response here it means that you have not properly read the mediasoup documentation.

mediasoup is "just" a SFU, it does not implement the SIP protocol nor it does audio mixing. In order to integrate a SIP/PSTN system with mediasoup you need to build a client or gateway that connects to mediasoup as a regular peer and acts as an audio mixer in the other leg (in which it implements the SIP protocol).


### Running mediasoup in hosts with private IP (AWS, Google Cloud, Azure)
{: #running-mediasoup-in-hosts-with-private-ip}

Those environments run virtual hosts with private IP and provide mechanisms to route an external public IP into that private IP. mediasoup implements ICE-Lite meaning that it won't initiate ICE connections but will always act as ICE "server" role.

In order to run mediasoup in those environments (host with private IP and a mapped public IP):

* Let `HOST_PRIVATE_IP` be the internal private IP of the host.
* Let `HOST_PUBLIC_IP` be the external public IP mapped to `HOST_PRIVATE_IP`.
* Redirect the port range given by `rtcMinPort`-`rtcMaxPort` from `HOST_PUBLIC_IP` to `HOST_PRIVATE_IP`.
* Of course, also redirect whichever port your application uses for signaling (HTTP/WebSocket) from `HOST_PUBLIC_IP` to `HOST_PRIVATE_IP`.
* In mediasoup **v2**:
   * Make `rtcIPv4` or `rtcIPv6` (in [ServerSettings](/documentation/v2/mediasoup/api/#Server-ServerSettings)) point to `HOST_PRIVATE_IP`.
   * Make `rtcAnnouncedIPv4` or `rtcAnnouncedIPv6` point to `HOST_PUBLIC_IP`.
* In mediasoup **v3**:
   * Specify the corresponding `announcedIp` (pointing to `HOST_PUBLIC_IP`) when creating a transport.


### When consuming a video in Firefox it does not properly rotate
{: #when-consuming-a-video-in-firefox-it-does-not-properly-rotate}

Check the mediasoup v3 [tricks](/documentation/v3/mediasoup/tricks/#rtp-capabilities-filtering) section.
