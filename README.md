# PCP CA2 React Assessment - Food Delivery Orders

A React application implementing Context and Reducer architecture for managing Food Delivery Orders with filtering and statistics capabilities.

## Dataset Structure
Each order contains:
- `orderid` - Unique order identifier
- `customerName` - Name of the customer
- `restaurant` - Restaurant name
- `items` - Array of items with `{name, price, quantity}`
- `totalAmount` - Total order amount
- `status` - Order status (Pending, Delivered, Cancelled)
- `deliveryTime` - Delivery time in minutes
- `rating` - Customer rating

## Mandatory Routes

- `/order` - Orders list page (Question 1)
- `/order/:id` - Order detail page (Question 2)
- `/filter` - Filter orders page (Question 3)
- `/stats` - Statistics dashboard (Question 5)

## Question Implementation

### Question 1: Orders List Page
- **Route**: `/order`
- Display all valid orders
- Show: Order ID, Customer Name, Restaurant, Total Amount, Status, Rating
- Each order has `data-testid="order-item"`

### Question 2: Order Detail View
- **Route**: `/order/:id`
- Display complete order details with items list
- **Calculate subtotal dynamically** using `reduce()`
- Validate ID parameter
- Ability to mark order as Delivered (Question 4)

### Question 3: Filter Orders
- **Route**: `/filter`
- Filter by restaurant name (case-insensitive)
- Input uses `data-testid="filter-input"`
- Must use `filter()` method
- Must not refetch data

### Question 5: Orders Analytics Dashboard
- **Route**: `/stats`
- Display three metrics:
  - **Total Valid Orders** (`data-testid="total-orders"`)
  - **Delivered Orders** (`data-testid="delivered-orders"`)
  - **Cancelled Orders** (`data-testid="cancelled-orders"`)
- **Calculate using `reduce()`** - not stored in state

## Testing Requirements

### Mandatory Test IDs
- `data-testid="order-item"` - Order list items
- `data-testid="filter-input"` - Filter input
- `data-testid="total-orders"` - Stats: Total count
- `data-testid="delivered-orders"` - Stats: Delivered count
- `data-testid="cancelled-orders"` - Stats: Cancelled count

### Global State
```javascript
window.appState = {
  totalOrders,
  deliveredOrders,
  cancelledOrders
}
```

## Architecture

- ✅ **Context API + useReducer** - Single source of truth
- ✅ **No Hardcoded Data** - All from API
- ✅ **Derived Values Computed** - Using reduce/filter/map
- ✅ **Inconsistent Data Handling** - Invalid entries excluded
- ✅ **Dynamic Calculations** - Subtotals, stats computed on demand

## Installation & Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## API Endpoint

Base URL: `https://t4e-testserver.onrender.com/api`
- GET `/api/orders`

## Deployment

Deploy to Vercel following standard procedures. The `vercel.json` file handles client-side routing.
