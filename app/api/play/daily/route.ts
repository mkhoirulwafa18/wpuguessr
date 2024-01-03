import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(
) {
    try {
        let result = [];
        let dataResult = {}
        const file = await fs.readFile(process.cwd() + '/app/data/daily.json', 'utf8');
        const fileData = await JSON.parse(file)
        const now = Date.now();
        const date = new Date(now).toLocaleString(
            "id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        if (fileData.seed === "" || fileData.seed !== date) {
            const file2 = await fs.readFile(process.cwd() + '/app/data/vids.json', 'utf8');
            const fileData2 = JSON.parse(file2)
            do {
                const index = Math.floor(Math.random() * fileData2.length)
                const video = fileData2[index];
                result.push(video)
            } while (result.filter((val, id, array) => array.indexOf(val) == id).length < 5);
            result = result.filter((val, id, array) => array.indexOf(val) == id);
            dataResult = { seed: date, items: [...result] }
            await fs.writeFile(process.cwd() + '/app/data/daily.json', JSON.stringify(dataResult));
        } else {
            dataResult = fileData
        }
        return NextResponse.json(dataResult);
    } catch (error) {
        console.log('[PLAYDaily_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}