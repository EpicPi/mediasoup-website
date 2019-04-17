---
title   : RTP Parameters and Capabilities
anchors : true
---


# RTP Parameters and Capabilities

The RTP parameters describe the media that an endpoint sends to mediasoup and the media that mediasoup forwards to an endpoint. The RTP capabilities, instead, define what mediasoup or an endpoint can receive.

Thus, when an endpoint wishes to send media to mediasoup (by means of a [Producer](/documentation/v3/mediasoup/api/#Producer)) it needs to check first the [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) in order to know what can be sent. In the same way, when mediasoup wants to forward media to an endpoint (by means of a [Consumer](/documentation/v3/mediasoup/api/#Consumer)) the application needs to know the remote endpoint's RTP capabilities so the consumer can compute the resulting RTP parameters.


## RTP Negotiation Overview

When a mediasoup [Router](/documentation/v3/mediasoup/api/#Router) is created it's provided with a set of [RouterMediaCodec](/documentation/v3/mediasoup/api/#RouterMediaCodec) that define the audio and video codecs enabled in that router. The application then retrieves the computed [router.rtpCapabilities](/documentation/v3/mediasoup/api/#router-rtpCapabilities) (which include the router codecs enhanced with retransmission and RTCP capabilities, and the list of RTP header extensions supported by mediasoup) and provides the endpoints with those RTP capabilities.

The endpoint wishing to send media to mediasoup uses the router's RTP capabilities and its own ones to compute its sending RTP parameters and transmits them to the router (assuming it has already created a WebRTC or plain RTP transport to send media). The application then creates a producer in the router by using the [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) API.

<div markdown="1" class="note">
mediasoup is flexible in what it receives from endpoints, meaning that the producer's RTP parameters can have codec `payloadType` values and RTP header extension `id` values that differ from the preferred ones in the router's RTP capabilities. However, the producer's RTP parameters **MUST NOT** include codecs not present in the router's capabilities.
</div>

When an endpoint wishes to receive media from the router associated to a specific producer (assuming it has already created a WebRTC or plain RTP transport to receive media) the application takes the endpoint's RTP capabilities and calls the [transport.consume()](/documentation/v3/mediasoup/api/#transport-consume) indicating those capabilities and the `producerId` to be consumed, thus generating a consumer instance. The application can then signals the resulting [consumer.rtpParameters](/documentation/v3/mediasoup/api/#consumer-rtpParameters) to the endpoint.

<div markdown="1" class="note">
mediasoup is strict in what it sends to endpoints, meaning that the codec `preferredPayloadType` values and RTP header extension `preferredId` values in the endpoint's RTP capabilities **MUST** match those in the router's RTP capabilities. At the end, the rule is simple:

* The entity sending RTP (mediasoup or an endpoint) decides the sending ids.
* The entity receiving RTP (mediasoup or an endpoint) must honor those ids.
</div>
