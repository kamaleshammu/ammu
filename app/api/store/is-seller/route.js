import prisma from "@/lib/prisma";
import authSeller from "@/middleware/authSeller";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// Auth Seller
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if(!isSeller) {
            return NextResponse.json({ error: 'not authorized' }, { status: 401 });
        }

        const storeInfo = await prisma.store.findFirst({
            where: {userId}
        })

        return NextResponse.json({isSeller, storeInfo})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}