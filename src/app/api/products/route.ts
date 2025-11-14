import { NextResponse } from "next/server";

let data = [
    { id: 1, image: "/images/ip12.webp", title: "iPhone", description: "A15 Bionic" },
    { id: 2, image: "/images/mac.webp", title: "Mac", description: "M1 Chip" },
    { id: 3, image: "/images/ipad.webp", title: "iPad", description: "A13 Bionic" },
]

export async function GET() {
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();

    const itemNew = {
        id: data.length + 1,
        image: body.image,
        title: body.title,
        description:body.desc,
    }

    data.push(itemNew);

    return NextResponse.json({
        message : "Product Added !",
        itemNew,
    });
};