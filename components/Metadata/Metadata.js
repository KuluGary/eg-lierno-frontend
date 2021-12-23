import Head from "next/head";

export const Metadata = ({ description, image, title }) => (
  <Head>
    {!!description && <meta name="description" content={description} />}

    {/* Twitter */}
    <meta name="twitter:card" content="summary" key="twcard" />

    {/* Open Graph */}
    <meta property="og:url" content={process.env.NEXT_PUBLIC_CLIENT} key="ogurl" />
    {!!image && <meta property="og:image" content={image} key="ogimage" />}
    <meta property="og:site_name" content={"Lierno App"} key="ogsitename" />
    {!!title && <meta property="og:title" content={title} key="ogtitle" />}
    {!!description && <meta property="og:description" content={description} key="ogdesc" />}

    {!!title && <title>{title}</title>}
  </Head>
);
