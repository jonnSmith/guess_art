/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "guess_art",
  titleTemplate: "%s | guess_art",
  defaultTitle: "guess_art",
  description: "Next.js + chakra-ui + TypeScript template",
  canonical: "https://vercel.com/jonnSmith/guess_art",
  openGraph: {
    url: "https://vercel.com/jonnSmith/guess_art",
    title: "guess_art",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "vercel.com/jonnSmith/guess_art og-image",
      },
    ],
    site_name: "nextarter-chakra",
  },
  twitter: {
    handle: "@jonnSmith",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
