"use server";
import db from "@/lib/db";
import getCurrentUser from "@/lib/actions/getCurrentUser";

export const getBuyerOrders = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const buyerOrders = await db.order.findMany({
      where: {
        buyerId: user.id,
      },
      include: {
        gig: true,
        users: true,
      },
    });

    return buyerOrders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSellerOrders = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const sellerOrders = await db.order.findMany({
      where: {
        sellerId: user.id,
      },
      include: {
        gig: true,
        users: true,
      },
    });

    return sellerOrders;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
