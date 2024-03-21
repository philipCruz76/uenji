import PhotoCaroussel from "@/components/ui/PhotoCaroussel";

const HeroCategorySlider = () => {
  return (
    <section className="container box-border flex h-[500px] max-w-[100dvw] flex-col py-8 tablet:h-[700px] tablet:py-14 desktop:py-24">
      <span className="flex max-w-[100dvw] px-2 text-3xl font-bold">
        Categorias em destaque
      </span>

      <PhotoCaroussel slidesTOShow={5} />
    </section>
  );
};

export default HeroCategorySlider;
