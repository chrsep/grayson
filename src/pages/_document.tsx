import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

const lazyLoadSentry = `
(function(c,u,v,n,p,e,z,A,w){function k(a){if(!x){x=!0;var l=u.getElementsByTagName(v)[0],d=u.createElement(v);d.src=A;d.crossorigin="anonymous";d.addEventListener("load",function(){try{c[n]=r;c[p]=t;var b=c[e],d=b.init;b.init=function(a){for(var b in a)Object.prototype.hasOwnProperty.call(a,b)&&(w[b]=a[b]);d(w)};B(a,b)}catch(g){console.error(g)}});l.parentNode.insertBefore(d,l)}}function B(a,l){try{for(var d=m.data,b=0;b<a.length;b++)if("function"===typeof a[b])a[b]();var e=!1,g=c.__SENTRY__;"undefined"!==
typeof g&&g.hub&&g.hub.getClient()&&(e=!0);g=!1;for(b=0;b<d.length;b++)if(d[b].f){g=!0;var f=d[b];!1===e&&"init"!==f.f&&l.init();e=!0;l[f.f].apply(l,f.a)}!1===e&&!1===g&&l.init();var h=c[n],k=c[p];for(b=0;b<d.length;b++)d[b].e&&h?h.apply(c,d[b].e):d[b].p&&k&&k.apply(c,[d[b].p])}catch(C){console.error(C)}}for(var f=!0,y=!1,q=0;q<document.scripts.length;q++)if(-1<document.scripts[q].src.indexOf(z)){f="no"!==document.scripts[q].getAttribute("data-lazy");break}var x=!1,h=[],m=function(a){(a.e||a.p||a.f&&
-1<a.f.indexOf("capture")||a.f&&-1<a.f.indexOf("showReportDialog"))&&f&&k(h);m.data.push(a)};m.data=[];c[e]=c[e]||{};c[e].onLoad=function(a){h.push(a);f&&!y||k(h)};c[e].forceLoad=function(){y=!0;f&&setTimeout(function(){k(h)})};"init addBreadcrumb captureMessage captureException captureEvent configureScope withScope showReportDialog".split(" ").forEach(function(a){c[e][a]=function(){m({f:a,a:arguments})}});var r=c[n];c[n]=function(a,e,d,b,f){m({e:[].slice.call(arguments)});r&&r.apply(c,arguments)};
var t=c[p];c[p]=function(a){m({p:a.reason});t&&t.apply(c,arguments)};f||setTimeout(function(){k(h)})})(window,document,"script","onerror","onunhandledrejection","Sentry","b19afc30ece64865ab9f82bf940fa34e","https://browser.sentry-cdn.com/6.10.0/bundle.min.js",{"dsn":"https://b19afc30ece64865ab9f82bf940fa34e@o827330.ingest.sentry.io/5811378"});
`

const sentryInit = (env: string) => `Sentry.onLoad(function () {
  Sentry.init({
    dsn: "https://b19afc30ece64865ab9f82bf940fa34e@o827330.ingest.sentry.io/5811378",
    // Note: if you want to override the automatic release value, do not set a
    // \`release\` value here - use the environment variable \`SENTRY_RELEASE\`, so
    // that it will also get attached to your source maps
    enabled: ${env === "production"}
  });
});
`

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          {/* <-- PWA tags --> */}
          <meta name="application-name" content="Sekitarmu" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="description" content="Eksplor UMKM di sekitar-mu" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#1d4ed8" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' /> */}
          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
          {/* <-- PWA tags ends --> */}
        </Head>
        <body>
          <Main />

          <NextScript />
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: lazyLoadSentry }} />
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: sentryInit(process.env.NODE_ENV) }} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
