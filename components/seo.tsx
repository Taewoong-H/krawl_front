import Head from 'next/head';

type SeoType = {
  title: string;
};

const Seo: any = ({ title }: SeoType) => {
  return (
    <Head>
      <title>{title} | Krawl</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
