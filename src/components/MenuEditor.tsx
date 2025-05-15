// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import TreeItem from "./TreeItem";
// import type { MenuItem } from "../types";
// import {
//   addItem,
//   deleteItem,
//   updateItem,
//   flattenTree,
//   moveItem,
// } from "./utils";

// const initialData: MenuItem[] = [
//   {
//     id: "1",
//     title: "Home",
//     url: "/home",
//     children: [],
//   },
//   {
//     id: "2",
//     title: "About",
//     url: "/about",
//     children: [
//       {
//         id: "3",
//         title: "Team",
//         url: "/about/team",
//         children: [],
//       },
//     ],
//   },
// ];

// export default function MenuEditor() {
//   const [tree, setTree] = useState<MenuItem[]>(initialData);
//   const sensors = useSensors(useSensor(PointerSensor));

//   const flat = flattenTree(tree);

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;
//     const newTree = moveItem(tree, active.id, over.id, 3);
//     setTree(newTree);
//   };

//   const handleEdit = (id: string, key: keyof MenuItem, value: string) => {
//     setTree(updateItem(tree, id, key, value));
//   };

//   const handleAdd = (parentId: string) => {
//     setTree(addItem(tree, parentId, "New Item"));
//   };

//   const handleDelete = (id: string) => {
//     setTree(deleteItem(tree, id));
//   };

//   const renderTree = (nodes: MenuItem[], depth = 0): React.ReactNode => {
//     return nodes.map((node) => (
//       <TreeItem
//         key={node.id}
//         item={node}
//         depth={depth}
//         onEdit={handleEdit}
//         onAdd={handleAdd}
//         onDelete={handleDelete}
//       >
//         {node.children && renderTree(node.children, depth + 1)}
//       </TreeItem>
//     ));
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-lg font-bold mb-4">🛠️ Menu Editor</h2>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={flat.map((n: any) => n.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {renderTree(tree)}
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// }

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type MenuItem } from "../types";
import TreeItem from "./TreeItem";
import {
  addItem,
  deleteItem,
  updateItem,
  moveItem,
  flattenTree,
} from "./utils";

export default function MenuEditor() {
  const [tree, setTree] = useState<MenuItem[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleAdd = (parentId: string) => {
    setTree((prev) => addItem(prev, parentId, "New Item"));
  };

  const handleDelete = (id: string) => {
    setTree((prev) => deleteItem(prev, id));
  };

  const handleEdit = (id: string, key: keyof MenuItem, value: string) => {
    setTree((prev) => updateItem(prev, id, key, value));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTree((prev) => moveItem(prev, active.id, over.id));
  };

  const renderTree = (items: MenuItem[], depth = 0) => {
    return items.map((item) => (
      <TreeItem
        key={item.id}
        item={item}
        depth={depth}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
      >
        {item.children && renderTree(item.children, depth + 1)}
      </TreeItem>
    ));
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={() => setTree((prev) => addItem(prev, undefined, "New Item"))}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        ➕ Add Top-Level Item
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={flattenTree(tree).map((node: any) => node.id)}
          strategy={verticalListSortingStrategy}
        >
          {renderTree(tree)}
        </SortableContext>
      </DndContext>

      <pre className="bg-gray-600 p-4 rounded">
        {JSON.stringify(tree, null, 2)}
      </pre>
    </div>
  );
}
