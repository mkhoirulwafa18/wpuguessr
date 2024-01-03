import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(
) {
    try {
        const file = await fs.readFile(process.cwd() + '/app/data/leaderboard.json', 'utf8');
        const result = JSON.parse(file)
        return NextResponse.json(result);
    } catch (error) {
        console.log('[LEADERBOARD_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}