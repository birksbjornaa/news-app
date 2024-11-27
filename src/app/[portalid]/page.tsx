"use server"
import { fetchNewsByPortal, fetchPortals } from "@/actions/news";
import NewsArticleCard from "@/components/news-article-card";
import Link from "next/link";

export default async function Portal({ params }: {params: {portalid: string}}) {
      const portalId = params.portalid;
      if(!portalId){
        return <p className="mx-auto">{"Denne portalen finnes ikke :("}</p>
      }

      try {
        const newsArticles : NewsArticle[] = await fetchNewsByPortal(portalId);
        const portalName = (await fetchPortals()).filter(portal => portal.id === portalId)[0].name;

        return <main>
          <Link href={"/"} className="hover:underline font-medium italic">{"< tilbake"}</Link>
          <h1 className="text-4xl font-bold mt-4">{portalName}</h1>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {newsArticles.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        </main>;
      }
      catch (error) {
        console.error('Error fetching news:', error);
        return <p className="mx-auto text-center">{"Fikk ikke hentet artikler :( Er du sikker på at denne portalen finnes?"}</p>
      }

}