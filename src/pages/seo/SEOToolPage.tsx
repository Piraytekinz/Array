// src/pages/seo/[slug].tsx
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "../home";
import keywords from '../../data/keywords.json';


export default function SEOToolPage() {
  const { slug } = useParams();
  const page = keywords.find((p: any) => p.slug === slug);

  if (!page) return <h1 style={{color: 'rgb(57, 255, 31);'}}>404 - Not Found</h1>;

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Helmet>

      <Home />
    </>
  );
}
