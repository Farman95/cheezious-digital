import { supabase } from './supabase';

export interface Order {
  id?: string;
  order_id?: string;
  order_number?: string;
  user_id: string;
  user_email: string;
  user_name: string;
  user_phone?: string;
  items: any[];
  subtotal?: number;
  total_amount: number;
  delivery_fee?: number;
  tax_amount?: number;
  discount_amount?: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  branch_id?: string;
  branch_name?: string;
  delivery_address: string;
  delivery_instructions?: string;
  phone: string;
  payment_method: string;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  preparation_time_minutes?: number;
  coupon_code?: string;
  loyalty_points_used?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id?: string;
  user_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_delivery';
  value: number;
  maximum_discount_amount?: number;
  minimum_order_amount?: number;
  usage_limit?: number;
  used_count?: number;
  valid_from: string;
  valid_until: string;
  active: boolean;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  location_lat: number;
  location_lng: number;
}

export async function upsertUserProfile(user: { email: string; name: string; image?: string }) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.email,
        email: user.email,
        name: user.name,
        avatar_url: user.image,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error upserting user profile:', error);
    throw error;
  }
}

export async function createEnterpriseOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrderByOrderId(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

export async function getOrdersByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

export async function getNearestBranches(lat: number, lng: number, limit: number = 5) {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .limit(limit);

    if (error) throw error;
    
    // Calculate distances and sort
    const branchesWithDistance = (data as Branch[]).map(branch => ({
      ...branch,
      distance: Math.sqrt(
        Math.pow(lat - branch.location_lat, 2) +
        Math.pow(lng - branch.location_lng, 2)
      ),
    }));
    
    return branchesWithDistance.sort((a, b) => a.distance - b.distance);
  } catch (error) {
    console.error('Error fetching nearest branches:', error);
    throw error;
  }
}

export async function checkDeliveryCoverage(lat: number, lng: number) {
  try {
    // Check if delivery is available in this area
    const nearestBranches = await getNearestBranches(lat, lng, 1);
    return nearestBranches.length > 0;
  } catch (error) {
    console.error('Error checking delivery coverage:', error);
    return false;
  }
}

export async function validateCoupon(code: string, orderAmount: number, userEmail?: string): Promise<Coupon> {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (error) throw new Error('Coupon not found or invalid');
    
    const coupon = data as Coupon;
    
    // Validate coupon date range
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = new Date(coupon.valid_until);
    
    if (now < validFrom || now > validUntil) {
      throw new Error('Coupon has expired');
    }
    
    // Validate minimum order amount
    if (coupon.minimum_order_amount && orderAmount < coupon.minimum_order_amount) {
      throw new Error(`Minimum order amount of Rs. ${coupon.minimum_order_amount} required`);
    }
    
    // Check usage limit
    if (coupon.usage_limit && coupon.used_count && coupon.used_count >= coupon.usage_limit) {
      throw new Error('Coupon usage limit reached');
    }
    
    return coupon;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Invalid coupon');
  }
}

export async function applyCoupon(couponId: string, orderId: string, discountAmount: number) {
  try {
    // Update coupon usage
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('used_count')
      .eq('id', couponId)
      .single();

    if (couponError) throw couponError;

    const newUsedCount = (coupon?.used_count || 0) + 1;
    
    const { error: updateError } = await supabase
      .from('coupons')
      .update({ used_count: newUsedCount })
      .eq('id', couponId);

    if (updateError) throw updateError;

    // Record coupon usage
    const { error: recordError } = await supabase
      .from('coupon_usage')
      .insert([
        {
          coupon_id: couponId,
          order_id: orderId,
          discount_amount: discountAmount,
          created_at: new Date().toISOString(),
        },
      ]);

    if (recordError) throw recordError;
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
}

export async function trackAnalyticsEvent(eventName: string, eventData: any, userId?: string) {
  try {
    const { error } = await supabase
      .from('analytics_events')
      .insert([
        {
          event_name: eventName,
          event_data: eventData,
          user_id: userId,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking analytics:', error);
    // Don't throw - analytics should not break the order flow
  }
}

export async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  metadata?: any
) {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert([
        {
          user_id: userId,
          type,
          title,
          message,
          metadata,
          read: false,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating notification:', error);
    // Don't throw - notifications should not break the order flow
  }
}
