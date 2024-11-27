"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface NewsArticleCardProps {
    article : NewsArticle;
}

export default function NewsArticleCard({ article }: NewsArticleCardProps) {
    return <>
        <Card className="flex flex-col justify-between">
            <CardHeader className="text-2xl font-medium">
                {article.title}
            </CardHeader>
            <CardFooter>
                <Dialog>
                    <Button variant={"outline"} asChild>
                        <DialogTrigger>
                            Les mer
                        </DialogTrigger>
                    </Button>
                    <DialogContent className="flex flex-col gap-2 max-w-5xl max-h-[700px] overflow-scroll">
                    <h1 className="text-5xl font-medium ">{article.title}</h1>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="col-span-1 flex flex-col">
                        {article.content.filter(e => e.type === "MARKUP").map((content: NewsContent, idx: number) => (
                            content.data && (
                                <div key={idx} className="gap-4 w-full" dangerouslySetInnerHTML={{ __html: content.data }} />
                            )
                        ))}
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
                        {article.content.filter(e => e.type === "PICTURES").map((content: NewsContent, idx: number) => (
                            content.files[0].url && (
                                <img
                                key={idx}
                                src={content.files[0].url}
                                alt={'Image'}
                                className="w-full h-auto rounded-lg"
                                />
                            )
                        ))}
                        </div>
                    </div>

                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    </>;
}