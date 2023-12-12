import PhotoCaroussel from "../ui/PhotoCaroussel";

const HeroCategorySlider = () => {
  return (
    <section className="flex flex-col container w-full tablet:h-[700px] h-[500px] box-border desktop:py-24 tablet:py-14 py-8">
      <span className="flex w-[100dvw] px-2 font-bold text-3xl">
        Serviços em destaque
      </span>

      <PhotoCaroussel slidesTOShow={5} />
    </section>
  );
};

export default HeroCategorySlider;
