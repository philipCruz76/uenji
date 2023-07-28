import Image from "next/image";

const HeroEyeCatch = () => {
  return (
    <section className=" grid desktop:grid-cols-2 grip-rows-2 container desktop:py-24 tablet:py-14 py-8 h-full  max-w-full bg-slate-200 ">
      <div className=" flex flex-wrap items-center ">
        <div className="flex flex-col">
          {/*Title*/}
          <h2 className="flex font-bold  tablet:text-3xl text-2xl">
            A melhor parte? <br /> Você pode começar agora mesmo!
          </h2>

          {/* Selling Proposition*/}
          <ul className="flex flex-row flex-wrap pr-6 max-w-screen py-6 items-start justify-start text-start gap-4">
            <li>
              <h6 className="flex flex-row tablet:text-lg  text-base font-semibold gap-2">
                <span className="w-[24px] h-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                Cumpra com o seu orçamento
              </h6>
              <span className="text-slate-500 tablet:text-lg text-base">
                Encontre o serviço certo para cada gama de preço. Sem tarifas
                horárias, apenas preços baseados em cada projecto.
              </span>
            </li>

            <li>
              <h6 className="flex flex-row tablet:text-lg  text-base font-semibold gap-2">
                <span className="w-[24px] h-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                Receba trabalho de qualidade rapidamente
              </h6>
              <span className="text-slate-500 tablet:text-lg text-base">
                Entregue o seu projeto a um freelancer em minutos e obtenha
                resultados que irão durar para sempre.
              </span>
            </li>

            <li>
              <h6 className="flex flex-row tablet:text-lg  text-base font-semibold gap-2">
                <span className="w-[24px] h-[24px]" aria-hidden="true">
                  <Image
                    alt="check-icon"
                    src="/icons/check-circle-thin.svg"
                    width={24}
                    height={24}
                  />
                </span>
                Pague quando estiver satisfeito
              </h6>
              <span className="text-slate-500 tablet:text-lg text-base">
                Orçamento antecipado significa que não há surpresas. Os
                pagamentos só são liberados quando estiver satisfeito com o
                serviço.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Demo Video*/}
      <div className="flex min-w-full box-border">
        <video controls muted className="flex min-w-full box-content">
          <source src="./WorkingBg.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default HeroEyeCatch;
