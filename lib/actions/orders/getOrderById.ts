"use server";

import db from "@/lib/db";

async function getOrderById( orderId:string) {
    try{
       const order = await db.order.findUniqueOrThrow({
            where: {
                id: orderId
            }
        })
        return order;
    }catch(error:any){
        throw new Error(error.message);
    }
}

export default getOrderById;