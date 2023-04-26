/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Guest the Artist",
  titleTemplate: "%s | Guest the Artist",
  defaultTitle: "Guest the Artist",
  description: "",
  canonical: "https://vercel.com/jonnSmith/guess_art",
  openGraph: {
    url: "https://vercel.com/jonnSmith/guess_art",
    title: "Guess the Artist",
    description: "",
    images: [
      {
        url: "",
        alt: "https://vercel.com/jonnSmith/guess_art og-image",
      },
    ],
    site_name: "guess_art",
  },
  twitter: {
    handle: "@jonnSmith",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
