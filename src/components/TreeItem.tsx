// import { useSortable } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities";
// import { type MenuItem } from "../types/index";
// // import { useState } from "react";

// type Props = {
//   item: MenuItem;
//   depth: number;
//   onEdit: (id: string, key: keyof MenuItem, value: string) => void;
//   onAdd: (parentId: string) => void;
//   onDelete: (id: string) => void;
//   children?: React.ReactNode;
// };

// export default function TreeItem({
//   item,
//   depth,
//   onEdit,
//   onAdd,
//   onDelete,
//   children,
// }: Props) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: item.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     marginLeft: depth * 20,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="bg-white border rounded-md p-2 mb-2 shadow-sm"
//     >
//       <div className="flex gap-2 items-center">
//         <input
//           className="border px-1 py-0.5 text-sm w-40"
//           value={item.title}
//           onChange={(e) => onEdit(item.id, "title", e.target.value)}
//           placeholder="Title"
//         />
//         <input
//           className="border px-1 py-0.5 text-sm w-40"
//           value={item.url || ""}
//           onChange={(e) => onEdit(item.id, "url", e.target.value)}
//           placeholder="URL"
//         />
//         <button onClick={() => onAdd(item.id)}>➕</button>
//         <button onClick={() => onDelete(item.id)}>🗑️</button>
//       </div>
//       {children}
//     </div>
//   );
// }
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type MenuItem } from "../types";
import { useState } from "react";
import { GripVertical, Trash2, Plus, Pencil } from "lucide-react";

interface Props {
  item: MenuItem;
  depth: number;
  onEdit: (id: string, key: keyof MenuItem, value: string) => void;
  onAdd: (parentId: string) => void;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
}

export default function TreeItem({
  item,
  depth,
  onEdit,
  onAdd,
  onDelete,
  children,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginLeft: depth * 20,
    background: isDragging ? "#f0f0f0" : "#6e6144",
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2" {...listeners}>
          <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
        </div>

        <div className="flex-1">
          {isEditing ? (
            <input
              value={item.title}
              onChange={(e) => onEdit(item.id, "title", e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="text-sm px-1 py-0.5 border border-gray-300 rounded"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className="text-sm cursor-pointer"
            >
              {item.title}
            </span>
          )}

          <input
            value={item.url || ""}
            onChange={(e) => onEdit(item.id, "url", e.target.value)}
            placeholder="URL"
            className="text-xs text-gray-500 px-1 py-0.5 w-full border border-gray-200 rounded mt-1"
          />
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onAdd(item.id)}
            className="text-green-500 hover:text-green-700"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="ml-4">{children}</div>
    </div>
  );
}

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { type MenuItem } from "../types";
// import { useState } from "react";

// interface TreeItemProps {
//   item: MenuItem;
//   depth: number;
//   onEdit: (id: string, key: keyof MenuItem, value: string) => void;
//   onAdd: (parentId: string) => void;
//   onDelete: (id: string) => void;
//   children?: React.ReactNode;
// }

// export default function TreeItem({
//   item,
//   depth,
//   onEdit,
//   onAdd,
//   onDelete,
//   children,
// }: TreeItemProps) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: item.id });

//   const [editing, setEditing] = useState(false);

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     opacity: isDragging ? 0.5 : 1,
//     marginLeft: depth * 20,
//     background: isDragging ? "#f3f4f6" : "#fff",
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 4,
//     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//   } as React.CSSProperties;

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <div className="flex items-center gap-2">
//         {editing ? (
//           <input
//             value={item.title}
//             onChange={(e) => onEdit(item.id, "title", e.target.value)}
//             onBlur={() => setEditing(false)}
//             className="border px-1 text-sm"
//           />
//         ) : (
//           <span
//             className="text-sm font-medium cursor-pointer"
//             onClick={() => setEditing(true)}
//           >
//             {item.title || "(untitled)"}
//           </span>
//         )}

//         <input
//           value={item.url || ""}
//           onChange={(e) => onEdit(item.id, "url", e.target.value)}
//           placeholder="URL"
//           className="border px-1 text-sm"
//         />

//         <button onClick={() => onAdd(item.id)}>
//           <Plus className="w-4 h-4" />
//         </button>
//         <button onClick={() => onDelete(item.id)}>
//           <Trash2 className="w-4 h-4" />
//         </button>
//       </div>
//       <div className="pl-4">{children}</div>
//     </div>
//   );
// }
