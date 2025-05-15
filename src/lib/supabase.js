import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('✅ Supabase URL:', supabaseUrl)
console.log('✅ Supabase Key (short):', supabaseAnonKey?.slice(0, 10) + '...')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables. Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ Authentication helpers
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  const userId = data?.user?.id
  if (userId) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, role: 'user' }])

    if (profileError) {
      console.error("❌ Error creating user profile:", profileError.message)
    } else {
      console.log("✅ Profile created for user:", userId)
    }
  }

  return data
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ✅ Updated getEvents with optional pagination support
export const getEvents = async (filters = {}, page = 1, limit = 6) => {
  console.log("[supabase.js] getEvents called with filters:", filters, "page:", page, "limit:", limit)

  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
    .range(from, to)

  if (filters.category) query = query.eq('category', filters.category)
  if (filters.search) query = query.ilike('title', `%${filters.search}%`)
  if (filters.date) query = query.gte('date', filters.date)

  const { data, error } = await query

  if (error) {
    console.error("[supabase.js] ❌ getEvents error:", error)
    throw error
  }

  if (!data || data.length === 0) {
    console.warn("[supabase.js] ⚠️ getEvents returned empty array or null.")
  } else {
    console.log("[supabase.js] ✅ getEvents result:", data)
  }

  return data
}

export const getEventById = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createEvent = async (eventData) => {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()

  if (error) throw error
  return data[0]
}

export const updateEvent = async (id, eventData) => {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export const deleteEvent = async (id) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// ✅ User profile helpers
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.warn('getUserProfile error:', error.message)
    return null
  }
  return data
}

export const updateUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()

  if (error) throw error
  return data[0]
}

// ✅ Registrations helpers
export const registerForEvent = async (userId, eventId) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ user_id: userId, event_id: eventId }])
    .select()

  if (error) throw error
  return data[0]
}

export const cancelRegistration = async (userId, eventId) => {
  const { error } = await supabase
    .from('registrations')
    .delete()
    .match({ user_id: userId, event_id: eventId })

  if (error) throw error
  return true
}

export const getUserRegistrations = async (userId) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*, events(*)')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export const getEventRegistrations = async (eventId) => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*, profiles(*)')
    .eq('event_id', eventId)

  if (error) throw error
  return data
}

// ✅ Storage helpers
export const uploadEventImage = async (file, filePath) => {
  const { data, error } = await supabase.storage
    .from('event-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error
  return data
}

export const getPublicImageUrl = async (filePath) => {
  const { data, error } = await supabase.storage
    .from('event-images')
    .getPublicUrl(filePath)

  if (error) {
    console.error('[Storage] ❌ Error getting public URL:', error.message)
    return null
  }

  console.log('[Storage] ✅ Public URL:', data?.publicUrl)
  return data?.publicUrl || null
}
