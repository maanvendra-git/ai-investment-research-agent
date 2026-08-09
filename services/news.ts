export async function getCompanyNews(company: string) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("NEWS_API_KEY is missing");
  }

  const url = new URL("https://newsapi.org/v2/everything");

  url.searchParams.set("q", company);
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "5");

  const response = await fetch(url.toString(), {
    headers: {
      "X-Api-Key": apiKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`News API error: ${error}`);
  }

  const data = await response.json();

  return data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    source: article.source?.name,
    url: article.url,
    publishedAt: article.publishedAt,
  }));
}