import prisma from "@/lib/prisma";
import authSeller from "@/middleware/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


// toggle stock of a product
export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const { productId } = await request.json()

        if(!productId){
            return NextResponse.json({ error: "missing details: productId" }, {
                status: 400
            });
        }

        const storeId = await authSeller(userId)

        if(!storeId) {
            return NextResponse.json({error: 'not authorized' }, { status: 401 })
        }

        // check if product exist 
        const product = await prisma.product.findFirst({
            where: {id: productId, storeId}
        })

        if(!product) {
            return NextResponse.json({ error: 'no product found' }, { status: 404 })
        }

        await prisma.product.update({
            where: { id: productId },
            data: {inStock: !product.inStock}
        })

        return NextResponse.json({Message: "Product stock updated successfully"})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.code || error.message }, { status: 400 })
    }
}