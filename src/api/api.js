import axios from 'axios'

const BASE_URL = 'https://t4e-testserver.onrender.com/api'

export const getToken = async () => {
  const res = await axios.post(`${BASE_URL}/public/token`, {
    studentId: 'ARJUN V',
    password: '351727',
  })
  return res.data.token
}
const FIELD_ALIASES = {
  order_id:      'orderId',
  orderID:       'orderId',
  customer:      'customerName',
  customer_name: 'customerName',
  restaurantName:'restaurant',
  total:         'totalAmount',
  total_amount:  'totalAmount',
  orderStatus:   'status',
  order_status:  'status',
  delivery_time: 'deliveryTime',
  rate:          'rating',
  stars:         'rating',
}


export const isValidOrder = (order) => {

  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) return false

  // every item must have quantity > 0
  const hasValidItems = order.items.every(
    (item) => item.quantity !== undefined && Number(item.quantity) > 0
  )
  if (!hasValidItems) return false

  // totalAmount must be a valid positive number
  const amt = parseFloat(order.totalAmount)
  if (isNaN(amt) || amt <= 0) return false

  return true
}

// ── Clean each item ───────────────────────────────────────────
const cleanOrder = (item, index) => {
  const cleaned = {}

  Object.entries(item).forEach(([key, value]) => {
    const normalizedKey = FIELD_ALIASES[key] ?? key
    cleaned[normalizedKey] =
      value === null || value === undefined || value === ''
        ? 'Not Found'
        : value
  })

  // ensure id always exists
  cleaned.orderId =
    item.orderId ?? item.order_id ?? item.orderID ?? item.id ?? `order-${index}`

  // clean items array
  if (Array.isArray(cleaned.items)) {
    cleaned.items = cleaned.items.map((it) => ({
      name:     it.name     ?? 'Unknown Item',
      price:    Number(it.price)    || 0,
      quantity: Number(it.quantity) || 0,
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

  // status fallback
  if (!cleaned.status || cleaned.status === 'Not Found') {
    cleaned.status = 'Unknown'
  } else {
    cleaned.status = String(cleaned.status).trim()
  }

  return cleaned
}

export const getData = async (token) => {
  const res = await axios.get(`${BASE_URL}/private/data`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const raw = Array.isArray(res.data)
    ? res.data
    : res.data.data    ?? res.data.orders  ?? res.data.items
   ?? res.data.results ?? Object.values(res.data)

  // clean first, then filter valid orders only (Q1 rule)
  return raw
    .map((item, index) => cleanOrder(item, index))
    .filter(isValidOrder)
}
