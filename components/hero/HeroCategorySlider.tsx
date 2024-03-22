"use client";
import { catCards } from "@/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const HeroCategorySlider = () => {
  const [mouseDownAt, setMouseDownAt] = useState<number>(0);
  const [prevPercentage, setPrevPercentage] = useState<number>(0);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);

  useEffect(() => {
    const track = document.getElementById("imageSlider");

    if (!track) {
      toast.error("Erro ao carregar o carrossel de categorias");
      return;
    }
    track.onmousedown = async (e: MouseEvent) => {
      setMouseDownAt(e.clientX);
    };

    track.onmouseup = async () => {
      setMouseDownAt(0);
      setPrevPercentage(currentPercentage);
    };

    track.onmousemove = async (e) => {
      if (mouseDownAt === 0) return;

      const mouseDelta = mouseDownAt - e.clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = prevPercentage + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100,
      );
      setCurrentPercentage(nextPercentage);

      if (track) {
        track.animate(
          {
            transform: `translate(${percentage}%, 0%)`,
          },
          { duration: 1200, fill: "forwards" },
        );
      }
      catCards.forEach((card) => {
        const slide = document.getElementById(`${card.title}-slide`);
        if (slide) {
          slide.animate(
            {
              transform: `translate(${percentage}%, 0%)`,
            },
            { duration: 1200, fill: "forwards" },
          );
        }
      });
    };
  }, [mouseDownAt]);

  useEffect(() => {
    const track = document.getElementById("imageSlider");

    if (!track) {
      toast.error("Erro ao carregar o carrossel de categorias");
      return;
    }
    track.ontouchstart = async (e: TouchEvent) => {
      setMouseDownAt(e.touches[0].clientX);
    };

    track.ontouchend = async () => {
      setMouseDownAt(0);
      setPrevPercentage(currentPercentage);
    };

    track.ontouchmove = async (e: TouchEvent) => {
      if (mouseDownAt === 0) return;

      const mouseDelta = mouseDownAt - e.touches[0].clientX;
      const maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = prevPercentage + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100,
      );
      setCurrentPercentage(nextPercentage);

      if (track) {
        track.animate(
          {
            transform: `translate(${percentage}%, 0%)`,
          },
          { duration: 1200, fill: "forwards" },
        );
      }
      catCards.forEach((card) => {
        const slide = document.getElementById(`${card.title}-slide`);
        if (slide) {
          slide.animate(
            {
              transform: `translate(${percentage}%, 0%)`,
            },
            { duration: 1200, fill: "forwards" },
          );
        }
      });
    };
  }, [mouseDownAt]);
  return (
    <section className=" min-h[500px] flex max-h-[500px] min-w-[100dvw] max-w-[100dvw] flex-col  overflow-hidden px-[24px] py-8 tablet:h-[700px] tablet:py-14 desktop:py-24">
      <span className="flex max-w-[100dvw] px-2 text-3xl font-bold">
        Categorias em destaque
      </span>
      <div
        id="imageSlider"
        className=" flex max-w-[80%] select-none flex-row gap-[4vmin] py-8 "
      >
        {catCards.map((card) => (
          <img
            id={`${card.title}-slide`}
            src={card.image}
            key={card.title}
            draggable={false}
            className={`object-cover,50%] h-[40vmin] w-[40vmin]  transition-transform `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCategorySlider;
