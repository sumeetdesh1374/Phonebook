import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";
import { get, post, put } from "@/lib/restserverutils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.formData();
    const payLoad = Object.fromEntries(body.entries());
    const accessToken = session?.tokenSet?.accessToken;


    const response = await post("/api/home", JSON.stringify(payLoad), accessToken,true);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(request: NextRequest) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await request.formData();
    const payLoad = Object.fromEntries(body.entries());
    const accessToken = session?.tokenSet?.accessToken;


    const response = await put("/api/home", JSON.stringify(payLoad), accessToken,true);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating contact:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {

  }
  catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

