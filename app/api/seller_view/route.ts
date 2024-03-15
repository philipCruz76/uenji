import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.error();
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        sellerView: !user.sellerView,
      },
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return Response.error();
  }
}
