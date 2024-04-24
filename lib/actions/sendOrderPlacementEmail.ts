"use server";

import { orderPlacedEmailEN } from "@/constants/email/orderPlacedEmailEN";
import { orderPlacedEmailPT } from "@/constants/email/orderPlacedEmailPT";
import { getLocale } from "next-intl/server";
import { createTransport } from "nodemailer";

export async function sendOrderPlacementEmail(
  email: string,
  gigName: string,
  packageName: string,
  orderDate: string,
  orderPrice: number,
  platformFee: number,
  orderTotal: number,
) {
  try {
    const locale = await getLocale();
    const emailVerification = await createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER_NOREPLY,
        pass: process.env.EMAIL_PASS_NOREPLY,
      },
    }).sendMail({
      from: "Uenji" + "<" + process.env.EMAIL_USER_NOREPLY + ">",
      to: email,
      subject:
        locale === "en"
          ? "Good news: Order Placed!"
          : "Boas notícias: Serviço encomendado!",
      html:
        locale === "pt"
          ? orderPlacedEmailPT(
              gigName,
              packageName,
              orderDate,
              orderPrice,
              platformFee,
              orderTotal,
            )
          : orderPlacedEmailEN(
              gigName,
              packageName,
              orderDate,
              orderPrice,
              platformFee,
              orderTotal,
            ),
    });
    console.log("Message sent: %s", emailVerification.messageId);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
