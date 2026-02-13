import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TextField,
  Alert
} from '@mui/material';

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

export interface CompetitorPrice {
  competitor: string;
  price: number;
}

export interface ComparisonPair {
  id: string;
  groupName: string;
  itemA: MaterialItem;
  itemB: MaterialItem;
  competitorPrices?: CompetitorPrice[];
}

interface ComparisonCardProps {
  pair: ComparisonPair;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ItemType = 'COMPARISON_CARD';

const exampleImage = 'https://images.unsplash.com/photo-1550985616-10810253b84d?w=200&h=200&fit=crop';

export function ComparisonCard({ pair, index, moveCard }: ComparisonCardProps) {
  const [isCompetitiveOpen, setIsCompetitiveOpen] = useState(false);
  const [editingPrices, setEditingPrices] = useState<{
    [key: string]: { value: string; edited: boolean };
  }>({});
  const [showPendingAlert, setShowPendingAlert] = useState(false);
  
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
        moveCard(draggedItem.index, index);
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
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Perm':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Disco':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handlePriceEdit = (itemId: string, field: 'price' | 'cost' | 'r12Sales', value: string) => {
    const key = `${itemId}-${field}`;
    setEditingPrices({ ...editingPrices, [key]: { value, edited: true } });
    setShowPendingAlert(true);
  };

  const getPriceValue = (itemId: string, field: 'price' | 'cost' | 'r12Sales', originalValue: number) => {
    const key = `${itemId}-${field}`;
    return editingPrices[key]?.value ?? originalValue.toFixed(2);
  };

  const isPriceEdited = (itemId: string, field: 'price' | 'cost' | 'r12Sales') => {
    const key = `${itemId}-${field}`;
    return editingPrices[key]?.edited ?? false;
  };

  const renderPriceField = (
    itemId: string,
    field: 'price' | 'cost' | 'r12Sales',
    label: string,
    originalValue: number,
    readonly: boolean = false
  ) => {
    const isEdited = isPriceEdited(itemId, field);
    const value = getPriceValue(itemId, field, originalValue);
    
    // Calculate tight width based on value length (8px per character)
    const inputWidth = Math.max(50, value.toString().length * 8.5);

    return (
      <div className="space-y-0.5">
        <div className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
        {readonly ? (
          <div className="text-sm font-semibold text-gray-900">
            ${originalValue.toFixed(2)}
          </div>
        ) : (
          <TextField
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => handlePriceEdit(itemId, field, e.target.value)}
            size="small"
            sx={{
              width: `${inputWidth}px`,
              '& .MuiInputBase-root': {
                backgroundColor: isEdited ? '#ffebee' : 'white',
                borderColor: isEdited ? '#d32f2f' : 'rgba(0,0,0,0.23)',
                '&:hover': {
                  borderColor: isEdited ? '#c62828' : 'rgba(0,0,0,0.87)',
                },
                '&.Mui-focused': {
                  borderColor: isEdited ? '#d32f2f' : '#1976d2',
                  boxShadow: isEdited ? '0 0 0 2px rgba(211,47,47,0.2)' : '0 0 0 2px rgba(25,118,210,0.2)',
                }
              },
              '& input': {
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isEdited ? '#d32f2f' : '#111827',
                padding: '4px 8px',
              }
            }}
            InputProps={{
              startAdornment: (
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600, 
                  color: isEdited ? '#d32f2f' : '#111827',
                  marginRight: '2px'
                }}>$</span>
              ),
            }}
          />
        )}
      </div>
    );
  };

  const renderItem = (item: MaterialItem, side: 'left' | 'right') => (
    <div 
      className="flex-1 px-4 pt-4 space-y-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      {/* Side Label */}
      <div 
        className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider inline-block px-2 py-1 rounded"
        style={{ backgroundColor: side === 'left' ? '#FDCF46' : '#F96302', color: side === 'left' ? '#000000' : '#FFFFFF' }}
      >
        {side === 'left' ? 'HD Supply Material' : 'Home Depot Pro'}
      </div>

      {/* Material UI Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
              <TableCell 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  borderRight: '1px solid #e5e7eb',
                  width: '96px',
                  padding: '12px 16px'
                }}
              >
                Image
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  borderRight: '1px solid #e5e7eb',
                  width: '128px',
                  padding: '12px 16px'
                }}
              >
                SKU
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  borderRight: '1px solid #e5e7eb',
                  padding: '12px 16px'
                }}
              >
                Description
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  borderRight: '1px solid #e5e7eb',
                  width: '224px',
                  padding: '12px 16px'
                }}
              >
                Vendor
              </TableCell>
              <TableCell 
                sx={{ 
                  fontSize: '10px', 
                  fontWeight: 600, 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  width: '160px',
                  padding: '12px 16px'
                }}
              >
                Fulfillment Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ verticalAlign: 'top', borderRight: '1px solid #e5e7eb', padding: '16px' }}>
                <img
                  src={exampleImage}
                  alt="Product"
                  className="size-20 object-cover rounded-md border border-gray-200 shadow-sm"
                />
              </TableCell>
              <TableCell sx={{ verticalAlign: 'top', borderRight: '1px solid #e5e7eb', padding: '16px' }}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center justify-center bg-black text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                    UQ
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{item.sku}</span>
                </div>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'top', borderRight: '1px solid #e5e7eb', padding: '16px' }}>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'top', borderRight: '1px solid #e5e7eb', padding: '16px' }}>
                <span className="text-sm text-gray-700">
                  {item.vendor}
                </span>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'top', padding: '16px' }}>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getFulfillmentColor(item.fulfillmentType)}`}>
                  {item.fulfillmentType === 'Perm' ? 'Reinstatement' : item.fulfillmentType}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pricing Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 pb-3 px-3 -mx-4 border-t border-gray-200"
        style={{ backgroundColor: side === 'left' ? '#FFF8D7' : '#FDD8C0' }}
      >
        {renderPriceField(item.id, 'price', 'Price', item.price)}
        {renderPriceField(item.id, 'cost', 'Cost', item.cost, true)}
        {renderPriceField(item.id, 'r12Sales', 'R12 Sales', item.r12Sales, true)}
      </div>
    </div>
  );

  return (
    <div
      ref={(node) => preview(drop(node))}
      className={`
        bg-white rounded-lg border-2 transition-all
        ${isDragging ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}
        ${isOver ? 'border-blue-400 shadow-lg' : 'border-gray-200 shadow-sm'}
      `}
    >
      {/* Pending Approval Alert */}
      {showPendingAlert && (
        <div className="p-2">
          <Alert severity="warning" onClose={() => setShowPendingAlert(false)}>
            Pending Approval
          </Alert>
        </div>
      )}
      
      {/* Drag Handle Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <div ref={drag} className="cursor-grab active:cursor-grabbing hover:bg-gray-200 p-1 rounded transition-colors">
          <GripVertical className="size-4 text-gray-400" />
        </div>
        <div className="text-xs font-semibold text-gray-800 truncate">{pair.groupName}</div>
      </div>

      {/* Comparison Content */}
      <div className="flex flex-col md:flex-row">
        {renderItem(pair.itemA, 'left')}
        {/* Visual separator between HD Supply and Home Depot Pro */}
        <div
          role="separator"
          aria-label="Comparison between HD Supply Material and Home Depot Pro Material"
          className="hidden md:block flex-shrink-0 w-3 self-stretch bg-gray-200 border-l-2 border-r-2 border-gray-400 min-h-[320px]"
        />
        {renderItem(pair.itemB, 'right')}
      </div>

      {/* Competitive Pricing Accordion */}
      <div className="border-t border-gray-200">
        <button
          onClick={() => setIsCompetitiveOpen(!isCompetitiveOpen)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium transition-all ${
            isCompetitiveOpen
              ? 'bg-blue-100 text-blue-700 border-b border-blue-200'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="size-3.5" />
          Competitive Pricing
          {isCompetitiveOpen ? (
            <ChevronUp className="size-3.5 ml-auto" />
          ) : (
            <ChevronDown className="size-3.5 ml-auto" />
          )}
        </button>

        {isCompetitiveOpen && pair.competitorPrices && (
          <div className="px-4 py-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="size-3.5 text-blue-700" />
              <h3 className="text-[10px] font-semibold text-blue-900 uppercase tracking-wider">Competitor Price Comparison</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {pair.competitorPrices.map((comp) => (
                <div key={comp.competitor} className="bg-white rounded-md p-3 border border-blue-200 shadow-sm">
                  <div className="text-[11px] font-semibold text-gray-900 mb-1">{comp.competitor}</div>
                  <div className="text-base font-bold text-gray-900">${comp.price.toFixed(2)}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">Per unit</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
