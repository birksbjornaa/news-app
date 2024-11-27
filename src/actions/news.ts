"use server"
const BASE_URL = 'https://breaking-api.alpha.tv2.no/v1/public/portals?page=1';
const NEWS_API = `https://breaking-api.alpha.tv2.no/v1/public/posts`;

/**
 * Fetch the list of portals.
 * @returns Array of portals (e.g., { id: string, name: string })
 */
export async function fetchPortals(): Promise<Portal[]> {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch portals');
  }
  const data = await response.json();
  
  const portals : Portal[] = data.docs.map((portal: any) => ({
      id: portal.id,
      name: portal.name,
      slug: portal.slug,
      description: portal.description,
      category: portal.category,
      coverImage: portal.cover?.url || null,
    } as Portal));
    
      //sjekke om riktige portal id hentes
    // const portals = await fetchPortals();
    // console.log('Portals fetched:', portals);
    return portals;
}

/**
 * Fetch news for a specific portal.
 * @param portalId The ID of the portal for which news should be fetched.
 * @returns Array of news articles for the given portal.
 */
export async function fetchNewsByPortal(portalId: string): Promise<NewsArticle[]> {
    // if (!portalId || !/^[a-zA-Z0-9]+$/.test(portalId)) {
    //     throw new Error('Invalid portalId. Must be alphanumeric.');
    //   }
    const response = await fetch(`${NEWS_API}?page=1&limit=10&portalId=${portalId}`);
  if (!response.ok) {
    const errorDetails = await response.json();
    console.error('Error fetching news:', errorDetails);
    throw new Error(`Failed to fetch news for portalId: ${portalId}`);
  }

  const data = await response.json();

  if (!data.docs || !Array.isArray(data.docs)) {
    throw new Error('Invalid response: docs field is missing or not an array');
  }


  const news : NewsArticle[]  = data.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    description: doc.description,
    url: '/news/$doc.url',
    publishedAt: doc.publishedAt,
    content: doc.content.filter((content: any) => content.type === 'MARKUP' || content.type === 'PICTURES'),
  } as NewsArticle));

  return news
//   return response.json(); // Assuming the response is an array of news articles
}