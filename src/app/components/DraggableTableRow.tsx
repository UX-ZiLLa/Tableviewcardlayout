import { useDrag, useDrop } from 'react-dnd';
import { GripVertical } from 'lucide-react';
import exampleImage from 'figma:asset/deccc548e82211e4e6b97dfa6cf90249b0cc2794.png';

export interface MaterialItem {
  id: string;
  itemNumber: string;
  sku: string;
  description: string;
  vendor: string;
  fulfillmentType: 'Stock' | 'Perm' | 'Disco';
  price: number;
  cost: number;
  r12Sales: number;
  materialFound: boolean;
}

interface DraggableTableRowProps {
  item: MaterialItem;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const ItemType = 'TABLE_ROW';

export function DraggableTableRow({ item, index, moveRow }: DraggableTableRowProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getFulfillmentColor = (type: string) => {
    switch (type) {
      case 'Stock':
        return 'bg-green-100 text-green-800';
      case 'Perm':
        return 'bg-orange-100 text-orange-800';
      case 'Disco':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr
      ref={(node) => preview(drop(node))}
      className={`
        border-b border-gray-200 hover:bg-gray-50 transition-colors
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isOver ? 'bg-blue-50' : ''}
      `}
    >
      <td className="px-4 py-4">
        <div ref={drag} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="size-5 text-gray-400" />
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <img
            src={exampleImage}
            alt="Product"
            className="size-12 object-cover rounded"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{item.itemNumber}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span className="inline-flex items-center justify-center bg-black text-white text-[10px] px-1.5 py-0.5 rounded">
                UQ
              </span>
              {item.sku}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="max-w-xs">
          <p className="text-sm text-gray-900">{item.description}</p>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="text-sm text-gray-900">{item.vendor}</div>
      </td>
      <td className="px-4 py-4">
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getFulfillmentColor(item.fulfillmentType)}`}>
          {item.fulfillmentType}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          {!item.materialFound && (
            <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
              <span className="inline-flex items-center justify-center bg-orange-600 text-white text-[10px] px-1 rounded">
                P
              </span>
              Pro
            </span>
          )}
          {!item.materialFound && (
            <span className="text-xs text-red-600">No Material Found</span>
          )}
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">${item.price.toFixed(2)}</td>
      <td className="px-4 py-4 text-sm text-gray-900">${item.cost.toFixed(2)}</td>
      <td className="px-4 py-4 text-sm text-gray-900">${item.r12Sales.toFixed(2)}</td>
    </tr>
  );
}
