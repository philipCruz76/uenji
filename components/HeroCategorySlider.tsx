import PhotoCaroussel from './ui/PhotoCaroussel'

const images = [
  '/bg-image.jpeg',
  '/deskWork.jpg',
  '/design-stock.jpg',
];

const HeroCategorySlider = () => {
  return (
    <section className="flex container w-full h-[700px] desktop:py-24 tablet:py-14 py-8">
      <div className="flex flex-col gap-6">
        <span className="font-bold text-3xl">
          Serviços em destaque
        </span>

        <div className='tablet:flex hidden'>
          <PhotoCaroussel slidesTOShow={5} />
        </div>


      </div>
    </section>
  )
}

export default HeroCategorySlider