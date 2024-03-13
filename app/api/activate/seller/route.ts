import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    if (!user) {
      throw new Error("You must be logged in to activate your seller profile.");
    }

    await db.user.update({
      where: {
        email: user.email!,
      },
      data: {
        name: body.personalInfo.fullName,
        displayName: body.personalInfo.displayName,
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
        sellerView: true,
      },
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.log("Seller activation error: ", error);
    return Response.error();
  }
}
