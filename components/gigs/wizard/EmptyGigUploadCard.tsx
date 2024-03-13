type EmptyGigUploadCardProps = {
  type: "photo" | "document";
};

const EmptyGigUploadCard = ({ type }: EmptyGigUploadCardProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      {type === "photo" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="#cccccc"
          viewBox="0 0 256 256"
        >
          <path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"></path>
        </svg>
      ) : null}
      {type === "document" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="#cccccc"
          viewBox="0 0 256 256"
        >
          <path d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"></path>
        </svg>
      ) : null}
      <span className="text-sm text-sky-500 underline">
        Selecionar {type === "photo" ? "imagem" : "documento"}
      </span>
    </div>
  );
};

export default EmptyGigUploadCard;
