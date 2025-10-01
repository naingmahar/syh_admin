
export interface IBook {
  id: string
  price: string
  title: string
  language: string
  genre: string
  description: string
  publishedDate: string
  publisher?: string
  numberOfPages: string
  author: string
  coverImageUrl: string[]
  samplePdfUrl: string[]
}