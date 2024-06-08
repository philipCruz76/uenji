type layoutProps = {};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-[100dvh] min-w-[100dvw]">{children}</section>
  );
}
