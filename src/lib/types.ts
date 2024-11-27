type Portal = {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    coverImage: string | null;
}

type NewsContent = {
    type: 'MARKUP' | 'PICTURES';
    data: any;
    files?: any;
}

type NewsArticle = {
    id: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    content: NewsContent[];
}