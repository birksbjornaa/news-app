"use server"
import { fetchPortals } from "@/actions/news";
import PortalCard from "@/components/portal-card";

export default async function Home() {
  const portals = await fetchPortals();

  return (
    <main className="mt-20">
        <h1 className="text-4xl font-bold">Nyheter fra TV2</h1>
        <text className="text-lg italic mt-4">Bla gjennom kategorier som interesserer deg</text>
        <div className="grid grid-cols-3 gap-3 mt-8">
          {portals.map((portal) => (
            <PortalCard key={portal.id} portalTitle={portal.name} portalId={portal.id} /> 
          ))}
        </div>
    </main>
  );
}
