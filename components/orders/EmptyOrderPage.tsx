type EmptyOrderPageProps = {};

const EmptyOrderPage = ({}: EmptyOrderPageProps) => {
  return (
    <div className="flex h-full w-full flex-col p-[24px] font-mono">
      <h1 className="text-2xl font-bold ">Pedidos</h1>
      <h3 className=" pb-[20px] font-mono text-xl font-semibold">
        Gerencie os seus pedidos
      </h3>

      <div className="w-full  h-[60dvh] py-[30px] border rounded-md flex items-center justify-center">
        <h3 className="text-lg font-semibold">
            Você ainda não tem nenhum pedido
        </h3>
      </div>
    </div>
  );
};

export default EmptyOrderPage;
