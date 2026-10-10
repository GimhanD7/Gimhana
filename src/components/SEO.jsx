import React from 'react';

export const SITE_URL = 'https://www.gimhan.me';
const DEFAULT_IMAGE = `${SITE_URL}/profile.png`;

const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Gimhana Deshapriya',
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  jobTitle: 'Full-Stack Web Developer and UI/UX Designer',
  description: 'Sri Lankan full-stack web developer specializing in React, PHP, Node.js, MySQL, responsive systems, admin portals, and UI/UX design.',
  email: 'mailto:gimhandeshapriya567@gmail.com',
  telephone: '+94768582057',
  address: { '@type': 'PostalAddress', addressLocality: 'Dompe', addressCountry: 'LK' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sri Lanka Institute of Information Technology' },
  knowsAbout: ['Full-stack web development', 'React', 'PHP', 'Node.js', 'MySQL', 'MongoDB', 'UI/UX design', 'Admin systems', 'Responsive web design'],
  sameAs: ['https://github.com/GimhanD7'],
};

const SEO = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
  schema,
}) => {
  const pageTitle = title.includes('Gimhana') ? title : `${title} | Gimhana Deshapriya`;
  const canonical = new URL(path, SITE_URL).toString();
  const imageUrl = image.startsWith('http') ? image : new URL(image, SITE_URL).toString();
  const graph = [personSchema];
  if (schema) graph.push(schema);
  const structuredData = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Gimhana Deshapriya" />
      <meta name="keywords" content="Gimhana Deshapriya, full-stack web developer Sri Lanka, React developer, PHP developer, MySQL developer, UI UX designer, web development portfolio, admin panel development, responsive web applications" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Gimhana Deshapriya Portfolio" />
      <meta property="og:locale" content="en_LK" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${pageTitle} preview`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {!noIndex && <script type="application/ld+json">{structuredData}</script>}
    </>
  );
};

export default SEO;
