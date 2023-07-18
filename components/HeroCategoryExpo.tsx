import Image from "next/image";

const HeroCategoryExpo = () => {
  return (
    <>
      <section className="container flex flex-col justify-center p-[100px,0px] bg-white">
        <h1 className="flex py-6 text-3xl font-bold">
          You need it, we've got it
        </h1>

        {/* Category Cards */}
        <ul className="flex w-full justify-between flex-wrap">
          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Photography"
                src="./icons/camera-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Photography</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Tutoring"
                src="./icons/graduation-cap-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Tutoring</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Writing"
                src="./icons/article-medium-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Writing</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Music"
                src="./icons/microphone-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Music</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Analytics"
                src="./icons/chart-line-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Analytics</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Programming"
                src="/icons/laptop-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Programming</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Business"
                src="./icons/bank-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Business</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>

          <li>
            <a className="flex flex-col group gap-[10px] w-[250px] h-[150px] cursor-pointer items-center justify-center text-center">
              <Image
                alt="Video Editing"
                src="./icons/video-duotone.svg"
                className=" w-[50px] h-[50px]"
                loading="lazy"
                width={10}
                height={10}
              />
              <p className="flex text-sm font-medium">Video Editing</p>
              <div className="flex transition ease-in-out duration-300 h-[3px] w-12 bg-slate-500 group-hover:bg-sky-600  group-hover:scale-x-150 " />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default HeroCategoryExpo;
