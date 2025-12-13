import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase"; // pakai lib kamu

export async function GET() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file || !title || !description) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    /* =============================
        UPLOAD FILE → SUPABASE STORAGE
    ==============================*/
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadErr } = await supabaseAdmin.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadErr)
      return NextResponse.json({ error: uploadErr.message }, { status: 500 });

    // Ambil Public URL
    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    /* =============================
        INSERT DATA → SUPABASE TABLE
    ==============================*/
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({
        title,
        description,
        image: imageUrl,
      })
      .select();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      message: "Product Added!",
      product: data[0],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, image, description } = await req.json();

    if (!id)
      return NextResponse.json(
        { error: "Product ID Required!" },
        { status: 400 }
      );

    const { error } = await supabaseAdmin
      .from("products")
      .update({ title, image, description })
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Product Updated!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { error: "Product ID Required" },
        { status: 400 }
      );

    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Product Deleted!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
