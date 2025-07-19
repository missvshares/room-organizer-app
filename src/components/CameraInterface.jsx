import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Camera, Square, Circle, Zap, ZapOff } from 'lucide-react'

const CameraInterface = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Simulate camera access (in a real app, this would use getUserMedia)
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false)
            onScanComplete({
              roomData: {
                dimensions: { width: 12, height: 10, length: 15 },
                items: [
                  { name: 'Sofa', category: 'furniture', position: { x: 2, y: 0, z: 3 } },
                  { name: 'Coffee Table', category: 'furniture', position: { x: 4, y: 0, z: 5 } },
                  { name: 'TV Stand', category: 'furniture', position: { x: 8, y: 0, z: 1 } },
                  { name: 'Bookshelf', category: 'storage', position: { x: 10, y: 0, z: 8 } },
                  { name: 'Floor Lamp', category: 'lighting', position: { x: 1, y: 0, z: 7 } }
                ]
              }
            })
            return 0
          }
          return prev + 2
        })
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [isScanning, onScanComplete])

  const startScanning = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  const stopScanning = () => {
    setIsScanning(false)
    setScanProgress(0)
  }

  return (
    <div className="space-y-4">
      {/* Camera Viewfinder */}
      <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ display: 'none' }} // Hidden for demo
        />
        
        {/* Simulated camera view */}
        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Camera className="h-16 w-16 text-white mx-auto" />
            <p className="text-white text-sm">Camera View</p>
            {isScanning && (
              <div className="text-white">
                <p className="text-xs">Scanning... {scanProgress}%</p>
                <div className="w-32 h-2 bg-white/20 rounded-full mx-auto mt-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-100"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AR Overlay Grid */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
            
            {/* Corner markers */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-blue-400"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-blue-400"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-blue-400"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-blue-400"></div>
          </div>
        )}

        {/* Flash toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={() => setFlashEnabled(!flashEnabled)}
        >
          {flashEnabled ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
        </Button>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isScanning ? (
          <Button
            onClick={startScanning}
            className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 p-0"
          >
            <Circle className="h-8 w-8 fill-current" />
          </Button>
        ) : (
          <Button
            onClick={stopScanning}
            variant="outline"
            className="h-16 w-16 rounded-full p-0"
          >
            <Square className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Instructions */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-medium">Scanning Tips:</p>
            <ul className="space-y-1">
              <li>• Start from one corner of the room</li>
              <li>• Move slowly and steadily</li>
              <li>• Ensure good lighting</li>
              <li>• Point camera at walls, furniture, and storage areas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CameraInterface

