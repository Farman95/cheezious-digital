import { supabase } from './supabase'

export interface Order {
  id?: string
  order_id: string
  user_id: string
  user_email: string
  user_name: string
  items: any[]
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
  branch_id: string
  branch_name: string
  delivery_address: string
  phone: string
  payment_method: string
  created_at?: string
  updated_at?: string
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export async function getOrderByOrderId(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching order:', error)
    throw error
  }
}

export async function getOrdersByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching user orders:', error)
    throw error
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('order_id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}
