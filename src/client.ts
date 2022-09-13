const API_KEY = "17827e53fb4a495990de57fff210949c";

interface ArticleResponse {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface FetchAllResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: ArticleResponse[];
}

const url = (query: string) => `https://newsapi.org/v2/everything?q=${query}&from=2022-09-01&sortBy=popularity&apiKey=${API_KEY}`;

export const fetchAll = async (): Promise<FetchAllResponse> => {
    const response = await fetch(url('apple'));

    if (response.ok) {
        const data: FetchAllResponse = await response.json();
        if (data.status === 'ok') {
            return data;
        }
    }
    return {
        status: 'error',
        totalResults: 0,
        articles: []
    };
}
