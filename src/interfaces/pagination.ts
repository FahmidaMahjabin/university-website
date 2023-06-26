import { SortOrder } from 'mongoose'

export type Ipagination = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

export type IResponseForPagination<T> = {
  meta: {
    page?: number
    limit?: number
    total?: number
  }
  data: T
}
