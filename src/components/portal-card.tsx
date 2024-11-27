import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader } from "./ui/card";

interface PortalCardProps {
    portalTitle: string;
    portalId: string;
}

export default function PortalCard({ portalTitle, portalId }: PortalCardProps) {
    return <>
        <Card className="flex flex-col justify-between">
            <CardHeader className="text-2xl font-medium">
                {portalTitle}
            </CardHeader>
            <CardFooter>
                <Button variant={"outline"}>
                    <Link href={`/${portalId}`}>Les mer</Link>
                </Button>
            </CardFooter>
        </Card>
    </>;
}