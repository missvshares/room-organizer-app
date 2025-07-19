import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, ExternalLink, Heart, ShoppingCart } from 'lucide-react'

const ProductRecommendations = ({ roomData, selectedItem }) => {
  const [favorites, setFavorites] = useState(new Set())

  // Mock product data with affiliate links
  const products = [
    {
      id: 1,
      name: 'IKEA ALGOT Storage System',
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.5,
      reviews: 1247,
      image: '🗄️',
      category: 'storage',
      description: 'Modular storage system perfect for organizing any room',
      affiliateLink: 'https://www.ikea.com/us/en/p/algot-shelf-unit-white-s49022093/?affiliate=roomscan',
      merchant: 'IKEA',
      inStock: true,
      features: ['Adjustable shelves', 'Easy assembly', 'Durable metal construction']
    },
    {
      id: 2,
      name: 'Container Store Elfa Shelving',
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 892,
      image: '📚',
      category: 'storage',
      description: 'Premium modular shelving system for maximum organization',
      affiliateLink: 'https://www.containerstore.com/s/elfa/elfa-shelving?affiliate=roomscan',
      merchant: 'The Container Store',
      inStock: true,
      features: ['Lifetime warranty', 'Custom configurations', 'Professional installation']
    },
    {
      id: 3,
      name: 'Wayfair Storage Ottoman',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.3,
      reviews: 2156,
      image: '🪑',
      category: 'furniture',
      description: 'Multi-functional ottoman with hidden storage compartment',
      affiliateLink: 'https://www.wayfair.com/furniture/pdp/storage-ottoman?affiliate=roomscan',
      merchant: 'Wayfair',
      inStock: true,
      features: ['Hidden storage', 'Comfortable seating', 'Multiple colors available']
    },
    {
      id: 4,
      name: 'Amazon Basics Storage Bins',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.2,
      reviews: 5432,
      image: '📦',
      category: 'storage',
      description: 'Set of 6 collapsible fabric storage bins with handles',
      affiliateLink: 'https://amazon.com/dp/B07EXAMPLE?tag=roomscan-20',
      merchant: 'Amazon',
      inStock: true,
      features: ['Collapsible design', 'Reinforced handles', 'Machine washable']
    }
  ]

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const handleAffiliateClick = (product) => {
    // In a real app, this would track the click for analytics
    console.log(`Affiliate click tracked for ${product.name}`)
    // Open affiliate link
    window.open(product.affiliateLink, '_blank')
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />)
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }
    
    return stars
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Recommended Products</h2>
        <p className="text-slate-600">
          {selectedItem 
            ? `Perfect for organizing your ${selectedItem.name.toLowerCase()}`
            : 'Curated products to help organize your space'
          }
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">All</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Storage</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Furniture</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Under $50</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Highly Rated</Badge>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="product-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {product.image}
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                      <p className="text-sm text-slate-600">{product.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(product.id)}
                      className="flex-shrink-0"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          favorites.has(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-slate-600">
                      {product.rating} ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-slate-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-600">at {product.merchant}</span>
                        {product.inStock && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            In Stock
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAffiliateClick(product)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAffiliateClick(product)}
                        className="bg-teal-500 hover:bg-teal-600"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full">
          Load More Products
        </Button>
      </div>

      {/* Affiliate Disclosure */}
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <p className="text-xs text-slate-600">
            <strong>Affiliate Disclosure:</strong> RoomScan may earn a commission from purchases made through our affiliate links. 
            This helps us provide free room scanning and organization features while recommending products we believe will help organize your space.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductRecommendations

