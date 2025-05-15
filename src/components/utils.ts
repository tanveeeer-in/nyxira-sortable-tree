import { type MenuItem } from "../types/index";

// export const generateId = () => Math.random().toString(36).substr(2, 9);

// export function addItem(tree: MenuItem[], parentId: string | null): MenuItem[] {
//   const newItem: MenuItem = {
//     id: generateId(),
//     title: "New Item",
//     url: "",
//     children: [],
//   };

//   if (!parentId) return [...tree, newItem];

//   return tree.map((item) =>
//     item.id === parentId
//       ? { ...item, children: [...(item.children || []), newItem] }
//       : {
//           ...item,
//           children: item.children ? addItem(item.children, parentId) : [],
//         }
//   );
// }

// export function deleteItem(tree: MenuItem[], id: string): MenuItem[] {
//   return tree
//     .filter((item) => item.id !== id)
//     .map((item) => ({
//       ...item,
//       children: item.children ? deleteItem(item.children, id) : [],
//     }));
// }

// export function updateItem(
//   tree: MenuItem[],
//   id: string,
//   key: keyof MenuItem,
//   value: string
// ): MenuItem[] {
//   return tree.map((item) =>
//     item.id === id
//       ? { ...item, [key]: value }
//       : {
//           ...item,
//           children: item.children
//             ? updateItem(item.children, id, key, value)
//             : [],
//         }
//   );
// }
// utils.ts
export const generateId = () => Math.random().toString(36).substr(2, 9);

export function addItem(
  tree: MenuItem[],
  parentId: string | undefined,
  title: string
): MenuItem[] {
  const newItem: MenuItem = {
    id: generateId(),
    title: title || "New Item",
    url: "",
    children: [],
  };

  if (!parentId) return [...tree, newItem];

  return tree.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), newItem] };
    }
    return item.children
      ? { ...item, children: addItem(item.children, parentId, title) }
      : item;
  });
}

export function deleteItem(tree: MenuItem[], idToDelete: string): MenuItem[] {
  return tree
    .filter((item) => item.id !== idToDelete)
    .map((item) => ({
      ...item,
      children: item.children ? deleteItem(item.children, idToDelete) : [],
    }));
}

export function updateItem(
  tree: MenuItem[],
  idToUpdate: string,
  key: keyof MenuItem,
  value: string
): MenuItem[] {
  return tree.map((item) => {
    if (item.id === idToUpdate) return { ...item, [key]: value };
    return item.children
      ? { ...item, children: updateItem(item.children, idToUpdate, key, value) }
      : item;
  });
}

export function flattenTree(
  tree: MenuItem[],
  parentId: string | null = null,
  depth: number = 0
) {
  return tree.flatMap((item: any) => [
    { id: item.id, item, parentId, depth },
    ...flattenTree(item.children || [], item.id, depth + 1),
  ]);
}

function getMaxDepth(item: MenuItem): number {
  if (!item.children || item.children.length === 0) return 1;
  return 1 + Math.max(...item.children.map(getMaxDepth));
}

export function moveItem(
  tree: MenuItem[],
  fromId: string,
  toId: string,
  maxDepth?: number
): MenuItem[] {
  const flat = flattenTree(tree);
  const from = flat.find((f) => f.id === fromId);
  const to = flat.find((t) => t.id === toId);
  if (!from || !to || fromId === toId) return tree;

  const toDepth = to.depth;
  const fromDepth = getMaxDepth(from.item);
  if (typeof maxDepth === "number" && toDepth + fromDepth >= maxDepth) {
    alert("❌ Cannot move. Nesting exceeds the allowed maxDepth.");
    return tree;
  }

  const newTree = deleteItem(tree, fromId);
  return insertItem(newTree, to.parentId, from.item, toId);
}

export function insertItem(
  tree: MenuItem[],
  parentId: string | null,
  itemToInsert: MenuItem,
  beforeId: string
): MenuItem[] {
  const insertAt = (items: MenuItem[]): MenuItem[] => {
    const index = items.findIndex((i) => i.id === beforeId);
    if (index !== -1) {
      const newItems = [...items];
      newItems.splice(index, 0, itemToInsert);
      return newItems;
    }
    return items.map((i) =>
      i.children ? { ...i, children: insertAt(i.children) } : i
    );
  };

  if (!parentId) return insertAt(tree);

  return tree.map((i) => {
    if (i.id === parentId)
      return { ...i, children: insertAt(i.children || []) };
    return i.children
      ? {
          ...i,
          children: insertItem(i.children, parentId, itemToInsert, beforeId),
        }
      : i;
  });
}
