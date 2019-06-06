## Producer
{: #Producer}

<section markdown="1">

A producer represents an audio or video source that will be transmitted to the mediasoup router through a WebRTC transport.

</section>


### Dictionaries
{: #Producer-dictionaries}

<section markdown="1">

#### ProducerOptions
{: #ProducerOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`track`         | [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) | An audio or video track. | Yes |
`encodings`     | Array&lt;[RTCRtpEncodingParameters](https://w3c.github.io/webrtc-pc/#rtcrtpencodingparameters)&gt; | Encoding settings. | No |
`codecOptions`  | [ProducerCodecOptions](#ProducerCodecOptions) | Per codec specific options. | No | `[ ]`
`appData`       | Object  | Custom application data. | No | `{ }`

</div>

<div markdown="1" class="note">
**Simulcast**

If video simulcast is desired, `encodings` array must be filled with more than one encodings. Each encoding represents a simulcast RTP stream:
* The order of the encodings is important. The entry with index 0 represents the simulcast stream with lowest bitrate. The entry with index N-1 (being N the number of entries) represents the simulcast stream with highest bitrate. Take this into account when writting per encoding settings such as `maxBitrate`, `maxFramerate` or `scaleResolutionDownBy`.
* `rid` field must not be set. The library will internally add it if the underlying browser supports RID.
* `active` field must not be set. The library will internally set it to `true`.

Check the mediasoup [Simulcast](/documentation/v3/mediasoup/rtp-parameters-and-capabilities#Simulcast) documentation for for information.

**SVC**

If video SVC is desired, `encodings` array must contain a single entry with `active: true` and `scalabilityMode` indicating the number of spatial and temporal layers.

Check the mediasoup [SVC](/documentation/v3/mediasoup/rtp-parameters-and-capabilities#SVC) documentation for for information.
</div>

<div markdown="1" class="note warn">
The given track will be internally handled by mediasoup-client from now on, meaning that mediasoup-client will call `stop()` on it when the producer is closed or when [producer.replaceTrack()](/documentation/v3/mediasoup-client/api/#producer-replaceTrack) is called.

So, if your application needs to use the track after that, it should clone the original track and pass the cloned one to `transport.produce()`.

```javascript
const clonedTrack = track.clone();
const producer = await transport.produce(clonedTrack, ...);
```
</div>

#### ProducerCodecOptions
{: #ProducerCodecOptions .code}

<div markdown="1" class="table-wrapper L3">

Field           | Type    | Description   | Required | Default
--------------- | ------- | ------------- | -------- | ---------
`opusStereo`    | Boolean | Enable OPUS stereo (if the audio source is stereo). | No | Browser specific.
`opusFec`       | Boolean | Enable OPUS in band FEC. | No | Browser specific.
`opusDtx`       | Boolean | Enable OPUS discontinuous transmission. | No | Browser specific.
`opusMaxPlaybackRate` | Number | Set OPUS maximum playbak rate. | No | Browser specific.
`videoGoogleStartBitrate` | Number | Just for libwebrtc based browsers. Set video initial bitrate. | No |
`videoGoogleMaxBitrate` | Number | Just for libwebrtc based browsers. Set video maximum bitrate. | No |
`videoGoogleMinBitrate` | Number | Just for libwebrtc based browsers. Set video minimum bitrate. | No |

</div>

</section>


### Properties
{: #Producer-properties}

<section markdown="1">

#### producer.id
{: #producer-id .code}

Producer identifier.

> `@type` String, read only

#### producer.closed
{: #producer-closed .code}

Whether the producer is closed.

> `@type` Boolean, read only

#### producer.kind
{: #producer-kind .code}

The media kind ("audio" or "video").

> `@type` String, read only

#### producer.track
{: #producer-track .code}

The audio or video track being transmitted.

> `@type` [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack), read only

#### producer.rtpParameters
{: #producer-rtpParameters .code}

Producer RTP parameters. These parameters are internally built by the library and conform to the syntax and requirements of mediasoup, thus they can be transmitted to the server to invoke [transport.produce()](/documentation/v3/mediasoup/api/#transport-produce) with them.

> `@type` [RtpSendParameters](/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpSendParameters), read only

<div markdown="1" class="note">
Check the [Communication Between Client and Server](/documentation/v3/communication-between-client-and-server/) section for more details.
</div>

#### producer.paused
{: #producer-paused .code}

Whether the producer is paused.

> `@type` Boolean, read only

#### producer.maxSpatialLayer
{: #producer-maxSpatialLayer .code}

In case of simulcast, this value determines the highest stream (from 0 to N-1) being transmitted. See the [setMaxSpatialLayer()](#producer-setMaxSpatialLayer) method for more about this.

> `@type` Number, read only

#### producer.appData
{: #producer-appData .code}

Custom data Object provided by the application in the producer factory method. The app can modify its content at any time.

> `@type` Object, read only

</section>


### Methods
{: #Producer-methods}

<section markdown="1">

#### producer.close()
{: #producer-close .code}

Closes the producer. No more media is transmitted.

<div markdown="1" class="note">
This method should be called when the server side producer has been closed (and vice-versa).
</div>

#### producer.getStats()
{: #producer-getStats .code}

Gets the local RTP sender statistics by calling `getStats()` in the underlying `RTCRtpSender` instance.

> `@async`
> 
> `@returns` [RTCStatsReport](https://w3c.github.io/webrtc-pc/#dom-rtcstatsreport)

#### producer.pause()
{: #producer-pause .code}

Pauses the producer (no RTP is sent to the server).

<div markdown="1" class="note">
This method should be called when the server side producer has been paused (and vice-versa).
</div>

#### producer.resume()
{: #producer-resume .code}

Resumes the producer (RTP is sent again to the server).

<div markdown="1" class="note">
This method should be called when the server side producer has been resumed (and vice-versa).
</div>

#### producer.replaceTrack({ track })
{: #producer-replaceTrack .code}

Replaces the audio or video track being transmitted. No negotiation with the server is needed.

> `@async`

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`track`         | [MediaStreamTrack](https://www.w3.org/TR/mediacapture-streams/#mediastreamtrack) | An audio or video track. | Yes |

</div>

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const newVideoTrack = stream.getVideoTracks()[0];

await producer.replaceTrack({ track: newVideoTrack });
```

#### producer.setMaxSpatialLayer(spatialLayer)
{: #producer-setMaxSpatialLayer .code}

In case of simulcast, this method limits the highest RTP stream being transmitted to the server.

> `@async`

<div markdown="1" class="table-wrapper L3">

Argument        | Type    | Description | Required | Default 
--------------- | ------- | ----------- | -------- | ----------
`spatialLayer`  | Number  | The index of the entry in `encodings` representing the highest RTP stream that will be transmitted. | Yes |

</div>

```javascript
// Assuming `encodings` array has 3 entries, let's enable just the first and
// second streams (indexes 0 and 1).
await producer.setMaxSpatialLayer(1);
```

</section>


### Events
{: #Producer-events}

<section markdown="1">

#### producer.on("transportclose", fn())
{: #producer-on-transportclose .code}

Emitted when the transport this producer belongs to is closed for whatever reason. The producer itself is also closed.

```javascript
producer.on("transportclose", () =>
{
  console.log("transport closed so producer closed");
});
```

#### producer.on("trackended", fn())
{: #producer-on-trackended .code}

Emitted when the audio/video track being transmitted is externally stopped. This may happen, for instance, if the associated microphone or webcam source is disconnected. This is a good chance for the application to close/pause the producer or replace its track.

```javascript
producer.on("trackended", () =>
{
  console.log("track ended");
});
```

</section>
