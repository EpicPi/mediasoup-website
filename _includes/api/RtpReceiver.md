## RtpReceiver
{: #RtpReceiver}

A `rtpReceiver` describes a media stream (track) sent by a remote media endpoint and received by the corresponding [Peer](#Peer) instance in **mediasoup**.

The `RtpReceiver` instance is created by means of [`peer.RtpReceiver()`](#peer-RtpReceiver).

<div markdown="1" class="note">
In the context of WebRTC 1.0, a `RTCPeerConnection` calling `addStream()` with an audio+video `MediaStream` will require two `rtpReceivers` in its associated [Peer](#Peer) instance in **mediasoup**.
</div>


### Properties
{: #RtpReceiver-properties}

<section markdown="1">

#### rtpReceiver.closed
{: #rtpReceiver-closed .code}

* Read only

A boolean indicating whether the `rtpReceiver` has been closed.

#### rtpReceiver.rtpParameters
{: #rtpReceiver-rtpParameters .code}

* Read only

The [RtpParameters](#RtpReceiver-RtpParameters) of the `rtpReceiver`. It is filled once [`rtpReceiver.receive()`](#rtpReceiver-receive) is called and its Promise resolved.

#### rtpReceiver.transport
{: #rtpReceiver-transport .code}

* Read only

The [Transport](#Transport) associated to the `rtpReceiver`.

#### rtpReceiver.listenForRtp
{: #rtpReceiver-listenForRtp .code}

* Read/Write

A boolean indicating whether RTP packets received by this `rtpReceiver` should reach JavaScript land via the [`rtp`](#rtpReceiver-on-rtp) event.

```javascript
rtpReceiver.listenForRtp = true;
```

</section>


### Methods
{: #RtpReceiver-methods}

<section markdown="1">

#### rtpReceiver.close()
{: #rtpReceiver-close .code}

Closes the `rtpReceiver` and triggers a [`close`](#rtpReceiver-on-close) event.

#### rtpReceiver.dump()
{: #rtpReceiver-dump .code}

For debugging purposes. Returns a Promise that resolves to an Object containing the current status and details of the `rtpReceiver`.

*TBD:* Document it.

#### rtpReceiver.isRtpReceiver()
{: #rtpReceiver-isRtpReceiver .code}

Returns `true`.

#### rtpReceiver.isRtpSender()
{: #rtpReceiver-isRtpSender .code}

Returns `false`.

#### rtpReceiver.receive(rtpParameters)
{: #rtpReceiver-receive .code}

Set remote RTP parameters. Returns a Promise that resolves to this `rtpReceiver`. If something goes wrong the Promise is rejected with the corresponding `Error` object.

<div markdown="1" class="table-wrapper">

Argument        | Type    | Required  | Description  
--------------- | ------- | --------- | -------------
`rtpParameters` | [RtpParameters](#RtpParameters) | Yes | Remote RTP parameters.

</div>

</section>


### Events
{: #RtpReceiver-events}

The `RtpReceiver` class inherits from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

<section markdown="1">

#### rtpReceiver.on("close", fn(error))
{: #rtpReceiver-on-close .code}

Emitted when the `rtpReceiver` is closed. In case of error, the callback is called with the corresponding `Error` object.

#### rtpReceiver.on("rtp", fn(packet))
{: #rtpReceiver-on-rtp .code}

Emitted for each received RTP packet if [`listenForRtp`](#rtpReceiver-listenForRtp) is set to `true`.

<div markdown="1" class="table-wrapper">

Callback argument | Type    | Description   
----------------- | ------- | ----------------
`packet`          | [Buffer](https://nodejs.org/api/buffer.html) | Binary data containing the full RTP packet.

</div>

</section>
