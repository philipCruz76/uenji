import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type SortableOrderTaskProps = {
  children: React.ReactNode;
  id: string;
};

const SortableOrderTask = ({ children, id }: SortableOrderTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none" >
      {children}
    </div>
  );
};

export default SortableOrderTask;
