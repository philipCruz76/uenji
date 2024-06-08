import db from "@/lib/db";
import { orderEvent } from "@/types/common.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, orderEvent } = body;
    const order = await db.order.findUnique({
        where: {
            id: orderId,
        },
        });
    if (!order) {
       return NextResponse.error();
    }
    const events = JSON.parse(order.events) as orderEvent[];
    const parsedEvent = JSON.parse(orderEvent) as orderEvent;
    events.push(parsedEvent);
    await db.order.update({
        where: {
            id: orderId,
        },
        data: {
            events: JSON.stringify(events),
        },
    });
  } catch (error) {
    console.log("ORDER_UPDATE_ERROR: ", error);
    return NextResponse.error();
  }
}
