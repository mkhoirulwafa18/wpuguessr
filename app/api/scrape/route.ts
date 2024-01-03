import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

// Nextjs route segment config
export const dynamic = 'force-dynamic' // Force dynamic (server) route instead of static page

export async function GET(
    req: Request
) {
    try {
        if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ status: 401, message: "You are not authorized" });
        } else {
            const getAll = await getAllVideos()
            const allVids = [...getAll];

            await fs.writeFile(process.cwd() + '/app/data/vids.json', JSON.stringify(allVids));

            return NextResponse.json(allVids);
        }
    } catch (error) {
        console.log('[SCRAPE_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

async function getAllVideos() {
    let allVids: any[] = []
    let pageToken: string | null = null

    do {
        const API_KEY = process.env.YT_API_KEY;
        const youtubePlaylistId = process.env.YT_PLAYLIST_ID;

        const URL = pageToken === null ?
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${youtubePlaylistId}&key=${API_KEY}` :
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${youtubePlaylistId}&key=${API_KEY}&pageToken=${pageToken}`
        const data: any = await fetch(URL);
        const result = await data.json();

        result.items.map((item: any, index: any) => {
            const thumb = item.snippet.thumbnails.standard?.url ? item.snippet.thumbnails.standard.url : item.snippet.thumbnails.high.url
            allVids = [...allVids, { videoId: item.snippet.resourceId.videoId, publishedAt: item.snippet.publishedAt, title: item.snippet.title, thumbnail: thumb }]
        })
        pageToken = result.nextPageToken;
    } while (pageToken != null);
    return allVids;
}