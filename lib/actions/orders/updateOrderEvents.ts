"use server";

import db from "@/lib/db";
import { orderEvent } from "@/types/common.types";

async function updateOrderEvents(
  orderId: string,
  orderEvent: orderEvent[0],
  updateStatus?: boolean,
  updateStatusTo?: string,
) {
  try {
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw new Error("ORDER_NOT_FOUND");
    }
    const events = JSON.parse(order.events) as orderEvent;

    events.push(orderEvent);
    if (updateStatus) {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: updateStatusTo,
          events: JSON.stringify(events),
        },
      });
    } else {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          events: JSON.stringify(events),
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    throw new Error("ORDER_UPDATE_ERROR: " + error.message);
  }
}

export default updateOrderEvents;
