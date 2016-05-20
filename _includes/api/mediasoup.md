## mediasoup
{: #mediasoup}

The top-level module exported by the **mediasoup** module.

```javascript
var mediasoup = require("mediasoup");
```


### Properties
{: #mediasoup-properties}

<section markdown="1">

#### mediasoup.errors
{: #mediasoup-errors .code}

Provides access to the [errors](#errors) module.

#### mediasoup.extra
{: #mediasoup-extra .code}

Provides access to the [extra](#extra) module.

</section>


### Methods
{: #mediasoup-methods}

<section markdown="1">

#### mediasoup.Server(settings)
{: #mediasoup-Server .code}

Returns a new [Server](#Server) instance.

<div markdown="1" class="table-wrapper L3">

Argument   | Type    | Description | Required | Default 
---------- | ------- | ----------- | -------- | ----------
`settings` | [ServerSettings](#Server-ServerSettings) | Server settings. | No |

</div>

Usage example:

```javascript
var server = mediasoup.Server({
    logLevel            : "warn",
    rtcListenIPv4       : "1.2.3.4",
    rtcListenIPv6       : false,
    dtlsCertificateFile : "/home/foo/dtls-cert.pem",
    dtlsPrivateKeyFile  : "/home/foo/dtls-key.pem"
  });
```

</section>
