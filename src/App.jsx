import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Camera, Plus, CheckCircle, ArrowLeft, ShoppingCart, Home, Settings, Lightbulb } from 'lucide-react'
import CameraInterface from './components/CameraInterface.jsx'
import RoomVisualization from './components/RoomVisualization.jsx'
import ProductRecommendations from './components/ProductRecommendations.jsx'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [scannedRoom, setScannedRoom] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const HomeScreen = () => (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">RoomScan</h1>
        <p className="text-slate-600">Smart Room Organization</p>
      </div>
      
      <div className="space-y-4">
        <Button 
          onClick={() => setCurrentScreen('scan')}
          className="w-full h-14 text-lg bg-blue-500 hover:bg-blue-600"
        >
          <Camera className="mr-2 h-5 w-5" />
          Scan New Room
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setCurrentScreen('rooms')}
          className="w-full h-12"
        >
          <Home className="mr-2 h-4 w-4" />
          My Rooms
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Point your camera at room corners for best results</li>
            <li>• Ensure good lighting for accurate scanning</li>
            <li>• Move slowly for better object detection</li>
          </ul>
        </CardContent>
      </Card>

      {/* Feature highlights */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center p-4">
          <Camera className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <p className="text-sm font-medium">3D Scanning</p>
        </Card>
        <Card className="text-center p-4">
          <Lightbulb className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm font-medium">Smart Suggestions</p>
        </Card>
      </div>
    </div>
  )

  const ScanScreen = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentScreen('home')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Scan Room</h2>
      </div>
      
      <CameraInterface 
        onScanComplete={(data) => {
          setScannedRoom(data.roomData)
          setCurrentScreen('organize')
        }}
      />
    </div>
  )

  const OrganizeScreen = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentScreen('scan')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Room Organization</h2>
      </div>
      
      <RoomVisualization 
        roomData={scannedRoom}
        onItemSelect={setSelectedItem}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
            Organization Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">Add storage bins for loose items</p>
            <p className="text-xs text-green-600 mt-1">This will help reduce clutter and make items easier to find</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Consider a bookshelf for better organization</p>
            <p className="text-xs text-blue-600 mt-1">Vertical storage maximizes space efficiency</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-800">Use drawer organizers for small items</p>
            <p className="text-xs text-purple-600 mt-1">Keep frequently used items easily accessible</p>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={() => setCurrentScreen('products')}
        className="w-full h-12 bg-purple-500 hover:bg-purple-600"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        View Recommended Products
      </Button>
    </div>
  )

  const ProductsScreen = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentScreen('organize')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Product Recommendations</h2>
      </div>
      
      <ProductRecommendations 
        roomData={scannedRoom}
        selectedItem={selectedItem}
      />
    </div>
  )

  const RoomsScreen = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentScreen('home')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">My Rooms</h2>
      </div>
      
      <div className="space-y-4">
        {scannedRoom ? (
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentScreen('organize')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Living Room</h3>
                  <p className="text-sm text-slate-600">{scannedRoom.items?.length || 0} items detected</p>
                  <p className="text-xs text-slate-500">
                    {scannedRoom.dimensions?.width}' × {scannedRoom.dimensions?.length}'
                  </p>
                </div>
                <Badge variant="secondary">Scanned</Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center p-8">
            <Home className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="font-semibold mb-2">No rooms scanned yet</h3>
            <p className="text-sm text-slate-600 mb-4">Start by scanning your first room to get organization suggestions</p>
            <Button onClick={() => setCurrentScreen('scan')}>
              <Camera className="mr-2 h-4 w-4" />
              Scan Your First Room
            </Button>
          </Card>
        )}
      </div>
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen />
      case 'scan': return <ScanScreen />
      case 'organize': return <OrganizeScreen />
      case 'products': return <ProductsScreen />
      case 'rooms': return <RoomsScreen />
      default: return <HomeScreen />
    }
  }

  return (
    <div className="mobile-container">
      {renderScreen()}
    </div>
  )
}

export default App

