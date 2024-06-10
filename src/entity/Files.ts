
export interface Files  {
    id: string
    name: string
    extension: string
    created_at: number | null
    updated_at: number | null
}

export interface FilesCreateInput {
    name: string
    extension: string
    created_at: number | null
    updated_at: number | null
}