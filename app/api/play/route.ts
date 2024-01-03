import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(
) {
    try {
        let result = [];
        const file = await fs.readFile(process.cwd() + '/app/data/vids.json', 'utf8');
        const fileData = JSON.parse(file)
        do {
            const index = Math.floor(Math.random() * fileData.length)
            const video = fileData[index];
            result.push(video)
        } while (result.filter((val, id, array) => array.indexOf(val) == id).length < 5);
        result = result.filter((val, id, array) => array.indexOf(val) == id);
        return NextResponse.json(result);
    } catch (error) {
        console.log('[PLAY_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}