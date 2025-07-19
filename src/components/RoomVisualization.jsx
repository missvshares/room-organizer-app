import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Home, Move, RotateCcw, Maximize2 } from 'lucide-react'

const RoomVisualization = ({ roomData, onItemSelect }) => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewMode, setViewMode] = useState('3d') // '3d' or '2d'

  const handleItemClick = (item) => {
    setSelectedItem(item)
    onItemSelect?.(item)
  }

  const Room3DView = () => (
    <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
      {/* 3D Room representation */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-inner">
        {/* Floor */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="floor-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#d97706" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#floor-grid)" />
            </svg>
          </div>
        </div>

        {/* Items positioned in the room */}
        {roomData?.items?.map((item, index) => {
          const x = (item.position.x / roomData.dimensions.width) * 100
          const z = (item.position.z / roomData.dimensions.length) * 100
          
          return (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                selectedItem?.name === item.name ? 'scale-110 z-10' : 'hover:scale-105'
              }`}
              style={{ left: `${x}%`, top: `${z}%` }}
              onClick={() => handleItemClick(item)}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${
                item.category === 'furniture' ? 'bg-blue-500 text-white' :
                item.category === 'storage' ? 'bg-green-500 text-white' :
                item.category === 'lighting' ? 'bg-yellow-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {item.name.charAt(0)}
              </div>
              {selectedItem?.name === item.name && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Room dimensions */}
      <div className="absolute top-2 left-2 text-xs text-slate-600 bg-white/80 px-2 py-1 rounded">
        {roomData?.dimensions?.width}' × {roomData?.dimensions?.length}'
      </div>
    </div>
  )

  const Room2DView = () => (
    <div className="aspect-square bg-white border-2 border-slate-200 rounded-lg p-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Room outline */}
        <rect x="5" y="5" width="90" height="90" fill="none" stroke="#64748b" strokeWidth="2"/>
        
        {/* Items as rectangles */}
        {roomData?.items?.map((item, index) => {
          const x = (item.position.x / roomData.dimensions.width) * 90 + 5
          const z = (item.position.z / roomData.dimensions.length) * 90 + 5
          
          return (
            <g key={index}>
              <rect
                x={x - 3}
                y={z - 3}
                width="6"
                height="6"
                fill={
                  item.category === 'furniture' ? '#3b82f6' :
                  item.category === 'storage' ? '#10b981' :
                  item.category === 'lighting' ? '#f59e0b' :
                  '#6b7280'
                }
                className="cursor-pointer hover:opacity-80"
                onClick={() => handleItemClick(item)}
              />
              <text
                x={x}
                y={z + 10}
                textAnchor="middle"
                fontSize="3"
                fill="#374151"
                className="pointer-events-none"
              >
                {item.name.split(' ')[0]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* View controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === '3d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('3d')}
          >
            <Home className="h-4 w-4 mr-1" />
            3D
          </Button>
          <Button
            variant={viewMode === '2d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('2d')}
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            2D
          </Button>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm">
            <Move className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Room visualization */}
      {viewMode === '3d' ? <Room3DView /> : <Room2DView />}

      {/* Item details */}
      {selectedItem && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              {selectedItem.name}
              <Badge variant="secondary">{selectedItem.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Position:</span> ({selectedItem.position.x}, {selectedItem.position.z})</p>
              <p><span className="font-medium">Category:</span> {selectedItem.category}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Room Items ({roomData?.items?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {roomData?.items?.map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border cursor-pointer transition-colors ${
                  selectedItem?.name === item.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleItemClick(item)}
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-slate-600">{item.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoomVisualization

