import axios from 'axios'

const BASE_URL = 'https://t4e-testserver.onrender.com/api'

export const getToken = async (studentId, password, set) => {
  try {
    console.log('🔐 Fetching token with:', { studentId, password, set })
    const { data } = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password,
      set,
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log('✅ Token received:', data.token?.substring(0, 20) + '...')
    console.log('📍 DataUrl:', data.dataUrl)
    return data
  } catch (error) {
    console.error('❌ Token error response:', error.response?.data)
    console.error('❌ Full error:', error)
    throw error
  }
}

export const getDataset = async (token, dataUrl) => {
  try {
    console.log('📦 Fetching dataset from:', dataUrl)
    const response = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    // Log the full response as JSON for visibility
    console.log('📋 Full API response (JSON):', JSON.stringify(response.data, null, 2))
    
    // Extract orders from nested structure: response.data.data.orders
    const ordersArray = response.data.data?.orders || response.data.data?.items || response.data.orders || response.data.items || []
    
    console.log('✅ Orders extracted, count:', Array.isArray(ordersArray) ? ordersArray.length : 'not array')
    console.log('📊 First item sample:', Array.isArray(ordersArray) && ordersArray.length > 0 ? ordersArray[0] : 'no data')
    
    return Array.isArray(ordersArray) ? ordersArray : []
  } catch (error) {
    console.error('❌ Dataset error:', error.response?.data)
    console.error('❌ Full error:', error)
    throw error
  }
}
const FIELD_ALIASES = {
 
  order_id:      'orderId',
  orderID:       'orderId',
  OrderID:       'orderId',
  id:            'orderId',
  
  
  customer:      'customerName',
  customer_name: 'customerName',
  customerName:  'customerName',
  name:          'customerName',
  
  
  restaurant:    'restaurant',
  restaurantName:'restaurant',
  restaurant_name: 'restaurant',
  vendor:        'restaurant',
  
  
  total:         'totalAmount',
  total_amount:  'totalAmount',
  amount:        'totalAmount',
  price:         'totalAmount',
  

  orderStatus:   'status',
  order_status:  'status',
  status:        'status',
  state:         'status',
  
  
  delivery_time: 'deliveryTime',
  deliveryTime:  'deliveryTime',
  time:          'deliveryTime',
  
 
  rate:          'rating',
  rating:        'rating',
  stars:         'rating',
  score:         'rating',
}


export const isValidOrder = (order) => {

  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    return false
  }

  const hasValidItems = order.items.every(
    (item) => item.quantity !== undefined && Number(item.quantity) > 0
  )
  if (!hasValidItems) return false


  const amt = parseFloat(order.totalAmount)
  if (isNaN(amt) || amt <= 0) return false


  if (!order.orderId) return false

  return true
}

// ── Clean each item ───────────────────────────────────────────
export const cleanOrder = (item, index) => {
  const cleaned = {}

  Object.entries(item).forEach(([key, value]) => {
    const normalizedKey = FIELD_ALIASES[key] ?? key
    cleaned[normalizedKey] =
      value === null || value === undefined || value === ''
        ? 'Not Found'
        : value
  })

  // ensure id always exists - try multiple variations
  cleaned.orderId = 
    item.orderId ?? 
    item.order_id ?? 
    item.orderID ?? 
    item.OrderID ?? 
    item.id ?? 
    `order-${index}`

  // convert orderId to number if it's a string number
  if (typeof cleaned.orderId === 'string' && !isNaN(cleaned.orderId)) {
    cleaned.orderId = parseInt(cleaned.orderId)
  }

  // clean items array - handle both direct array and nested structure
  if (Array.isArray(cleaned.items)) {
    cleaned.items = cleaned.items.map((it) => ({
      name:     it.name     ?? it.itemName ?? 'Unknown Item',
      price:    Number(it.price)    || Number(it.itemPrice) || 0,
      quantity: Number(it.quantity) || Number(it.qty) || 0,
    }))
  } else if (typeof cleaned.items === 'object' && cleaned.items !== null) {
    // Handle nested object structure
    cleaned.items = Object.values(cleaned.items).filter(it => typeof it === 'object').map((it) => ({
      name:     it.name     ?? it.itemName ?? 'Unknown Item',
      price:    Number(it.price)    || Number(it.itemPrice) || 0,
      quantity: Number(it.quantity) || Number(it.qty) || 0,
    }))
  } else {
    cleaned.items = []
  }

  // totalAmount as number
  cleaned.totalAmount = parseFloat(cleaned.totalAmount) || 0

  // rating as number or 'Not Found'
  const rat = parseFloat(cleaned.rating)
  cleaned.rating = isNaN(rat) ? 'Not Found' : rat

  // customerName fallback
  if (!cleaned.customerName || cleaned.customerName === 'Not Found') {
    cleaned.customerName = 'Unknown'
  }

  // restaurant fallback
  if (!cleaned.restaurant || cleaned.restaurant === 'Not Found') {
    cleaned.restaurant = 'Unknown Restaurant'
  }

  // status fallback and formatting
  if (!cleaned.status || cleaned.status === 'Not Found') {
    cleaned.status = 'Unknown'
  } else {
    cleaned.status = String(cleaned.status).trim()
  }

  // deliveryTime fallback
  if (!cleaned.deliveryTime || cleaned.deliveryTime === 'Not Found') {
    cleaned.deliveryTime = 'N/A'
  }

  return cleaned
}


