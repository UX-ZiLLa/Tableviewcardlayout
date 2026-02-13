import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComparisonCard, ComparisonPair, MaterialItem } from './components/ComparisonCard';

const sampleItemA: MaterialItem = {
  id: '1a',
  itemNumber: 'ASSORTED ITEM 8899573',
  sku: '908652',
  description: 'LED 2pin Plugin Vrt Type B 16.5w 35k',
  vendor: 'SIGNIFY NORTH AMERICA CORP',
  fulfillmentType: 'Stock',
  price: 360.39,
  cost: 6.56,
  r12Sales: 44.41,
  materialFound: true,
};

const sampleItemB: MaterialItem = {
  id: '1b',
  itemNumber: 'ASSORTED ITEM 8899573',
  sku: '908652',
  description: 'LED 2pin Plugin Vrt Type B 16.5w 35k',
  vendor: 'SIGNIFY NORTH AMERICA CORP',
  fulfillmentType: 'Perm',
  price: 360.39,
  cost: 156.25,
  r12Sales: 306.33,
  materialFound: false,
};

const initialPairs: ComparisonPair[] = [
  {
    id: 'pair-1',
    groupName: 'Assorted Item 8899573',
    itemA: sampleItemA,
    itemB: sampleItemB,
    competitorPrices: [
      { competitor: 'Home Depot', price: 365.99 },
      { competitor: 'Grainger', price: 372.50 },
      { competitor: 'Lowes', price: 358.75 },
    ],
  },
  {
    id: 'pair-2',
    groupName: 'Group 4472891',
    itemA: { ...sampleItemA, id: '2a', sku: '904821', fulfillmentType: 'Stock', price: 245.50, cost: 89.30, r12Sales: 128.65, materialFound: true },
    itemB: { ...sampleItemB, id: '2b', sku: '904822', fulfillmentType: 'Disco', price: 242.00, cost: 88.75, r12Sales: 131.20, materialFound: false },
    competitorPrices: [
      { competitor: 'Home Depot', price: 249.99 },
      { competitor: 'Grainger', price: 255.00 },
      { competitor: 'Lowes', price: 238.50 },
    ],
  },
  {
    id: 'pair-3',
    groupName: 'Assorted Item 5563321',
    itemA: { 
      id: '3a', 
      itemNumber: 'ASSORTED ITEM 5563321',
      sku: '907734', 
      description: 'LED 2pin Plugin Vrt Type B 16.5w 35k',
      vendor: 'SIGNIFY NORTH AMERICA CORP',
      fulfillmentType: 'Perm', 
      price: 189.99, 
      cost: 52.40, 
      r12Sales: 95.30, 
      materialFound: true 
    },
    itemB: { ...sampleItemB, id: '3b', sku: '907735', fulfillmentType: 'Stock', price: 192.50, cost: 53.10, r12Sales: 98.75, materialFound: true },
    competitorPrices: [
      { competitor: 'Home Depot', price: 195.00 },
      { competitor: 'Grainger', price: 201.25 },
      { competitor: 'Lowes', price: 187.99 },
    ],
  },
  {
    id: 'pair-4',
    groupName: 'Group 7821456',
    itemA: { ...sampleItemA, id: '4a', sku: '905123', fulfillmentType: 'Stock', price: 425.00, cost: 125.50, r12Sales: 215.30, materialFound: true },
    itemB: { ...sampleItemB, id: '4b', sku: '905124', fulfillmentType: 'Perm', price: 418.75, cost: 122.00, r12Sales: 210.45, materialFound: true },
    competitorPrices: [
      { competitor: 'Home Depot', price: 430.00 },
      { competitor: 'Grainger', price: 445.50 },
      { competitor: 'Lowes', price: 412.99 },
    ],
  },
];

export default function App() {
  const [pairs, setPairs] = useState<ComparisonPair[]>(initialPairs);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedPair = pairs[dragIndex];
    const newPairs = [...pairs];
    newPairs.splice(dragIndex, 1);
    newPairs.splice(hoverIndex, 0, draggedPair);
    setPairs(newPairs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Material Comparisons</h1>
          </div>

          {/* Comparison Cards - One per row */}
          <div className="space-y-4">
            {pairs.map((pair, index) => (
              <ComparisonCard
                key={pair.id}
                pair={pair}
                index={index}
                moveCard={moveCard}
              />
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-sm text-gray-500">
            Total comparisons: {pairs.length}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}