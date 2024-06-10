
export interface FilesUrls  {
    id: string
    id_files: string
    part: number
    url: string
    created_at: number | null
    updated_at: number | null
}

export interface FilesUrlsCreateInput {
    id_files: String
    part: number
    url: string
    created_at: number | null
    updated_at: number | null
}