import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document"

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
      <Html>
        <Head />
        <body>
          <Main />

          <NextScript />
          <script
            src="https://js.sentry-cdn.com/b19afc30ece64865ab9f82bf940fa34e.min.js"
            crossOrigin="anonymous"
          />
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: sentryInit(process.env.NODE_ENV) }} />
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "2ece74c7bd54443eb949e08561bf65cb"}'
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
