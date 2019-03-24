## mediasoup
{: #mediasoup}

The top-level module exported by the mediasoup module.

```javascript
const mediasoup = require("mediasoup");
```


### Properties
{: #mediasoup-properties}

<section markdown="1">

#### mediasoup.version
{: #mediasoup-version .code}

* `@type` String, read only

The mediasoup version.

```javascript
console.log(mediasoup.version);
// => "3.0.0"
```

#### mediasoup.observer
{: #mediasoup-observer .code}

* `@type` EventEmitter, read only

An event emitter that emits a "observer:newworker" event when a new [Worker](#Worker) instance is created. See the [Observer Events](#mediasoup-observer-events) section below.

</section>


### Functions
{: #mediasoup-functions}

<section markdown="1">

#### mediasoup.createWorker(settings)
{: #mediasoup-createWorker .code}

* `@async`
* `@returns` [Worker](#Worker)

Creates a new worker with the given settings.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`settings` | [WorkerSettings](#Worker-WorkerSettings) | Worker settings. | No |

</div>

```javascript
const worker = async mediasoup.createWorker(
  {
    logLevel            : "warn",
    dtlsCertificateFile : "/home/foo/dtls-cert.pem",
    dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem"
  });
```

#### mediasoup.getSupportedRtpCapabilities()
{: #mediasoup-getSupportedRtpCapabilities .code}

* `@returns` [RTCRtpCapabilities](https://draft.ortc.org/#rtcrtpcapabilities*)

Returns a cloned copy of the mediasoup supported RTP capabilities, specifically the content of the [mediasoup/lib/supportedRtpCapabilities.js](https://github.com/versatica/mediasoup/blob/v3/lib/supportedRtpCapabilities.js) file.

```javascript
const rtpCapabilities = mediasoup.getSupportedRtpCapabilities();

console.log(rtpCapabilities.codecs);
// => [ { }, { }, ... ]
```

</section>


### Observer Events
{: #mediasoup-observer-events}

The [observer](#mediasoup-observer) is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that emits the following events:

<section markdown="1">

#### observer.on("observer:newworker")
{: #mediasoup-observer-on-observer-newworker .code}

Emitted when a new [Worker](#Worker) instance is created.

<div markdown="1" class="table-wrapper L3">

Argument | Type    | Description   
-------- | ------- | ----------------
`worker` | [Worker](#Worker) | New worker.

</div>

</section>
