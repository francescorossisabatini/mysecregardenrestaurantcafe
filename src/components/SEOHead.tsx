import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

const BASE_URL = "https://secretgardenrestaurant.at";
const DEFAULT_IMAGE = `${BASE_URL}/assets/food-detail-real-D-Th9dqL.jpg`;

export const SEOHead = ({
  title,
  description = "Vegetarisches & veganes Restaurant in Wien. Geschmack, der entzückt. Bio, fair, regional & saisonal.",
  path = "/",
  image = DEFAULT_IMAGE,
}: SEOHeadProps) => {
  const fullTitle = title
    ? `${title} | My Secret Garden Wien`
    : "My Secret Garden - Vegetarisches & Veganes Restaurant Wien";
  
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
