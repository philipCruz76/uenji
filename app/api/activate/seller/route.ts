import getCurrentUser from "@/lib/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    if (!user) {
      throw new Error("You must be logged in to activate your seller profile.");
    }

    console.log("Activating seller with profile: ", user.username);

    console.log(body);

    await db.user.update({
      where: {
        email: user.email!,
      },
      data: {
        name: body.personalInfo.name,
        image: body.personalInfo.profilePicture,
        description: body.personalInfo.description,
        languages: JSON.stringify(body.personalInfo.languages),
        occupation: JSON.stringify(body.professionalInfo.occupation),
        skills: JSON.stringify(body.professionalInfo.skills),
        education: JSON.stringify(body.professionalInfo.education),
        certification: JSON.stringify(body.professionalInfo.certifications),
        personalWebsite: body.professionalInfo.personalWebsite,
        active: true,
        isSeller: true,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("Seller activation error: ", error);
    return NextResponse.error();
  }
}
