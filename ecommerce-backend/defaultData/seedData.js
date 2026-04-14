import { CartItem } from '../models/CartItem.js';
import { DeliveryOption } from '../models/DeliveryOption.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { defaultCart } from './defaultCart.js';
import { defaultDeliveryOptions } from './defaultDeliveryOptions.js';
import { defaultOrders } from './defaultOrders.js';
import { defaultProducts } from './defaultProducts.js';

function applyTimestamps(items, timestamp) {
  return items.map((item, index) => ({
    ...item,
    createdAt: new Date(timestamp + index),
    updatedAt: new Date(timestamp + index)
  }));
}

export async function seedDefaultData() {
  const timestamp = Date.now();

  await Product.bulkCreate(applyTimestamps(defaultProducts, timestamp));
  await DeliveryOption.bulkCreate(applyTimestamps(defaultDeliveryOptions, timestamp));
  await CartItem.bulkCreate(applyTimestamps(defaultCart, timestamp));
  await Order.bulkCreate(applyTimestamps(defaultOrders, timestamp));
}