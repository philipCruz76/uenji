import GigWizardStep from "@/components/gigs/GigWizardStep";
import getCurrentUser from "@/lib/actions/getCurrentUser";

type newGigLayoutProps = {
  children: React.ReactNode;
};

const gigSteps = [
  {
    name: "Overview",
    href: "/%5Busername%5D/manage_gigs/new/overview",
    step: 1,
    current: true,
  },
  {
    name: "Pricing",
    href: "/%5Busername%5D/manage_gigs/new/pricing",
    step: 2,
    current: false,
  },
  {
    name: "Description & FAQ",
    href: "/%5Busername%5D/manage_gigs/new/description",
    step: 3,
    current: false,
  },
  {
    name: "Gallery",
    href: "/%5Busername%5D/manage_gigs/new/gallery",
    step: 4,
    current: false,
  },
  {
    name: "Publish",
    href: "/%5Busername%5D/manage_gigs/new/publish",
    step: 5,
    current: false,
  },
];

async function newGigLayout({ children }: newGigLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }
  const username = user.username;
  const country = user.country;
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
