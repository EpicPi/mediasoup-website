## Transport
{: #Transport}

<section markdown="1">

A transport makes it possible to inject RTP into a router and forward RTP to endpoints.

mediasoup implements the following transport types:

* [WebRtcTransport](#WebRtcTransport)
* [PlainRtpTransport](#PlainRtpTransport)
* [PipeTransport](#PipeTransport)

</section>


### Dictionaries
{: #Transport-dictionaries}

<section markdown="1">

#### TransportListenIp
{: #TransportListenIp .code}

<div markdown="1" class="table-wrapper L3">

Field         | Type    | Description   | Required | Default
------------- | ------- | ------------- | -------- | ---------
`ip`          | String  | Listening IPv4 or IPv6. | Yes      |
`announcedIp` | String  | Announced IPv4 or IPv6 (useful when running mediasoup behind NAT with private IP). | No      |

</div>

#### TransportTuple
{: #TransportTuple .code}

<div markdown="1" class="table-wrapper L3">

Field              | Type    | Description   | Required | Default
------------------ | ------- | ------------- | -------- | ---------
`localIP`          | String  | Local IP address. | Yes |
`localPort`        | Number  | Local port. | Yes |
`remoteIP`         | String  | Remote IP address. | Yes |
`remotePort`       | Number  | Remote port. | Yes |
`protocol`         | String  | Protocol ("udp" / "tcp"). | Yes |

</div>

</section>


### Properties
{: #Transport-properties}

<section markdown="1">

#### transport.id
{: #transport-id .code}

Transport identifier.

> `@type` String, read only

#### transport.closed
{: #transport-closed .code}

Whether the transport is closed.

> `@type` Boolean, read only

#### transport.appData
{: #transport-appData .code}

Custom data Object provided by the application in the transport factory method. The app can modify its content at any time.

> `@type` Object, read only

```javascript
transport.appData.foo = 'bar';
```

</section>


### Methods
{: #Transport-methods}

<section markdown="1">

#### transport.close()
{: #transport-close .code}

Closes the transport, including all its producers and consumers.

#### transport.getStats()
{: #transport-getStats .code}

Returns current RTC statistics of the transport. Each transport type produces a different set of statistics. Check the `getStats()` method in each one of them.

> `@async`
> 
> `@abstract`
> 
> `@returns` Array&lt;[RTCStats](https://www.w3.org/TR/webrtc/#dom-rtcstats)&gt;

#### transport.connect()
{: #transport-connect .code}

Provides the transport with the remote endpoint's transport parameters. Each transport type requires specific arguments in this method. Check the `connect()` method in each one of them.

> `@async`
> 
> `@abstract`

#### transport.produce(options)
{: #transport-produce .code}

Instructs the transport to receive an audio or video source via RTP (or SRTP depending on the transport type). This is the way to inject media into mediasoup.

<div markdown="1" class="table-wrapper L3">

Argument    | Type    | Description | Required | Default 
----------- | ------- | ----------- | -------- | ----------
`options`   | [ProducerOptions](#ProducerOptions) | Producer options. | Yes |

</div>

> `@async`
> 
> `@returns` [Producer](#Producer)

```javascript
const producer = await transport.produce(
  {
    kind          : "video",
    rtpParameters :
    {
      mid    : "1",
      codecs :
      [
        {
          mimeType    : "video/VP8",
          payloadType : 101,
          clockRate   : 90000,
          rtcpFeedback :
          [
            { type: "nack" },
            { type: "nack", parameter: "pli" },
            { type: "ccm", parameter: "fir" },
            { type: "goog-remb" }
          ]
        },
        {
          mimeType    : "video/rtx",
          payloadType : 102,
          clockRate   : 90000,
          parameters  : { apt: 101 }
        }
      ],
      headerExtensions :
      [
        { id: 2, uri: "urn:ietf:params:rtp-hdrext:sdes:mid" },
        { id: 3, uri: "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id" },
        { id: 5, uri: "urn:3gpp:video-orientation" }
      ],
      encodings :
      [
        { rid: "r0", active: true, maxBitrate: 100000 },
        { rid: "r1", active: true, maxBitrate: 300000 }
        { rid: "r2", active: true, maxBitrate: 900000 }
      ],
      rtcp :
      {
        cname : 'Zjhd656aqfoo'
      }
    }
  });
```

</section>
