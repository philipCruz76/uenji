type EmptyOrderPageProps = {};

const EmptyOrderPage = ({}: EmptyOrderPageProps) => {
  return (
    <div className="flex h-full w-full flex-col p-[24px] font-mono">
      <h1 className="text-2xl font-bold ">Pedidos</h1>
      <h3 className=" pb-[20px] font-mono text-xl font-semibold">
        Gere os teus pedidos
      </h3>

      <div className="flex  h-[60dvh] w-full items-center justify-center rounded-md border py-[30px]">
        <h3 className="text-lg font-semibold">Ainda não tem nenhum pedido</h3>
      </div>
    </div>
  );
};

export default EmptyOrderPage;
