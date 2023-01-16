/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}
export type BaseResponse<T> = {
  success: boolean
  data: T[]
}
export type Messages = {
  tenant_id: string
  tenant_name: string
  landlord_name: string
  landlord_id: string
  message: string
  property_id: string
  sentAt: string
  __v: number
  _id: string
}
export type Conversations = {
  tenant_id: string
  landlord_id: string
  message: string
  message_id: string
  sender: string
  sentAt: string
  __v: number
  _id: string
}

export type ChatMessage = {
  _id: string
  text: string
  createdAt: Date
  user: {
    _id: string
  }
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
