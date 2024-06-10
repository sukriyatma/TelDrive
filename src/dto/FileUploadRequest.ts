import { t, EphemeralType } from "elysia";
export default t.Object({
    files : t.Files()
})

export interface UploadBody {
    files: Blob[]
}
