import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import {
  SellerPersonalInfo,
  SellerProfessionalInfo,
} from "@/types/sellerProfile.types";
import ProfileContactButton from "./ProfileContactButton";
import getUserGigs from "@/lib/actions/gigs/getUserGigs";
import GigCard from "@/components/gigs/GigCard";

type PublicProfileViewProps = {
  user: User;
};

const PublicProfileView = async ({ user }: PublicProfileViewProps) => {
  const { image, skills, country, username, id, languages } = user;

  const parsedSkills = JSON.parse(skills!) as SellerPersonalInfo["languages"];
  const parsedLanguages = JSON.parse(
    languages!,
  ) as SellerProfessionalInfo["skills"];
  const timeLastSeen = () => {
    if (user.isOnline) {
      return "Online";
    } else {
      const lastSeen = new Date(Date.now() - user.updatedAt.getTime());

      if (lastSeen.getDay() > 1) {
        return `Last seen: ${lastSeen.getUTCDate()} days ago`;
      }
      if (lastSeen.getHours() > 1) {
        return `Last seen: ${lastSeen.getUTCHours()} hours ago`;
      }
      return `Last seen: ${new Date(
        Date.now() - user.updatedAt.getTime(),
      ).getMinutes()} minutes ago`;
    }
  };
  const userGigs = await getUserGigs(id);
  const publishedGigs = userGigs?.filter((gig) => gig.published === true);

  return (
    <section className="flex min-h-[100dvh] w-[100dvw] max-w-[100dvw] flex-col gap-[20px] overflow-hidden  px-6 py-6">
      <div className="flex w-full flex-row ">
        <div className="flex w-full gap-4 ">
          <Image
            width={150}
            height={150}
            src={image! || "./icons/default-user.svg"}
            alt="profile picture"
            referrerPolicy="no-referrer"
            className="h-[150px] w-[150px] rounded-full transition duration-150 ease-in-out"
          />
          <div className="flex flex-col">
            {/* user info */}
            <div className="flex-items-center flex-start p-r-16 flex gap-3">
              <h3
                className="text-2xl font-bold text-gray-800"
                aria-label="Public Name"
              >
                {user.displayName}
              </h3>
              <span
                className="flex items-center text-zinc-600"
                aria-label="Username"
              >
                @{user.username}
              </span>
            </div>
            {/* user rating */}
            {user.isSeller === true ? (
              <div className="flex flex-row items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                </svg>
                <span className="text-sm font-bold text-gray-800">4.9</span>
                <span className="text-sm text-gray-800 hover:cursor-pointer ">
                  (<u>22</u>)
                </span>
                <span className="text-sm font-bold text-gray-800">
                  New Seller
                </span>
              </div>
            ) : null}

            {/* user additional info*/}
            <span className="flex flex-row items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#575b60"
                viewBox="0 0 256 256"
                className="mr-2 h-[16px] w-[16px] items-center justify-center"
              >
                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
              </svg>
              <span className="pr-4 text-center">
                {country ? ` ${country}` : " Unknown"}
              </span>

              {parsedLanguages !== null && parsedLanguages.length > 0 ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#575b60"
                    viewBox="0 0 256 256"
                    className=" mr-2"
                  >
                    <path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path>
                  </svg>
                  {parsedLanguages.map((language) => {
                    return (
                      <span key={language.name} className="pr-1 text-center">
                        {language.name}
                      </span>
                    );
                  })}
                </>
              ) : null}
            </span>
          </div>
        </div>
        {/* Contact Card */}

        <div className="flex h-[200px] w-[600px] flex-col gap-4 rounded-lg border border-gray-200 bg-white px-6 py-6">
          <div className="flex flex-row items-center justify-start gap-2 ">
            <Image
              width={40}
              height={40}
              src={image! || "./icons/default-user.svg"}
              alt="profile picture"
              referrerPolicy="no-referrer"
              className="h-[40px] w-[40px] cursor-pointer rounded-full transition duration-150 ease-in-out hover:opacity-80"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">
                {user.displayName}
              </span>
              <div className="flex flex-row  items-center justify-start gap-2">
                <span className=" text-gray-800">
                  {user.isOnline ? "Online" : "Offline"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill={cn(user.isOnline ? "green" : "gray")}
                  viewBox="0 0 256 256"
                >
                  <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
                </svg>
                {user.isOnline ? null : (
                  <span className="text-gray-800">{timeLastSeen()}</span>
                )}
              </div>
            </div>
          </div>

          <ProfileContactButton username={username!} id={id} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        {user.description !== "" && user.description !== null ? (
          <>
            <h1 className="text-lg font-bold text-gray-800">About Me</h1>
            <span>{user.description}</span>
          </>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2">
        {parsedSkills !== null && parsedSkills.length > 0 ? (
          <>
            <h1 className="text-lg font-bold text-gray-800">Skills</h1>
            <div className="flex flex-row flex-wrap gap-4">
              {parsedSkills.map((skill, index) => {
                if (index < parsedSkills.length - 1) {
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-row items-center justify-center gap-2"
                    >
                      <span
                        key={`SKill ${index}`}
                        className=" text-black hover:cursor-pointer hover:underline"
                      >
                        {skill.name}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        fill="#CCCCCC"
                        viewBox="0 0 256 256"
                        key={`Skill ${index} separator`}
                      >
                        <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
                      </svg>
                    </div>
                  );
                } else {
                  return (
                    <span
                      key={`SKill ${index}`}
                      className=" text-black hover:cursor-pointer hover:underline"
                    >
                      {skill.name}
                    </span>
                  );
                }
              })}{" "}
            </div>
          </>
        ) : null}

        {/* User Gigs Showcase */}
        {user.isSeller === true ? (
          <>
            <div className="flex flex-row gap-4">
              {publishedGigs?.map((gig, index) => (
                <div key={`gig-${index}`} className="hidden gap-4 tablet:block">
                  <GigCard gigToShow={gig} index={index} />
                </div>
              ))}
            </div>
            {/* User Reviews Showcase */}
            <div className="h-[200px] w-[80%] items-center justify-center border bg-white text-center">
              <span className=" text-lg font-bold text-gray-800 ">
                Reviews placeholder
              </span>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default PublicProfileView;
