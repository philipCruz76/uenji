
import GigWizardStep from "@/components/gigs/wizard/GigWizardStep";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

type newGigLayoutProps = {
  params:{
    username: string;
  }
  children: React.ReactNode;
};

const gigSteps = [
  {
    name: "Overview",
    href: `/%5Busername%5D/manage_gigs/new?step=1`,
    step: 1,
    current: true,
  },
  {
    name: "Pricing",
    href: "/%5Busername%5D/manage_gigs/new/new?step=2",
    step: 2,
    current: false,
  },
  {
    name: "Description & FAQ",
    href: "/%5Busername%5D/manage_gigs/new/new?step=3",
    step: 3,
    current: false,
  },
  {
    name: "Gallery",
    href: "/%5Busername%5D/manage_gigs/new?step=4",
    step: 4,
    current: false,
  },
  {
    name: "Publish",
    href: "/%5Busername%5D/manage_gigs/newnew?step=5",
    step: 5,
    current: false,
  },
];

async function newGigLayout({ children ,params }: newGigLayoutProps) {
  const user = await getCurrentUser();
  const { username } = params;
  if (!user ||user?.isSeller === false || user.username !== username ) {
    redirect("/");
  } 
  
  
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw]">
      <div className="w-full h-full">
        <nav className="h-[60px] w-full border-b">
          <ul className="flex flex-row w-full  h-full  justify-center  gap-2">
            {gigSteps.map((step) => (
              <GigWizardStep key={step.name} currentStep={step} />
            ))}
          </ul>
          <div className="bg-white  w-full border-b border-gray-200" />
        </nav>
        {children}
      </div>
      
    </section>
  );
}

export default newGigLayout;
