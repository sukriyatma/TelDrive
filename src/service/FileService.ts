import FileUploadResponse from "../dto/FileUploadResponse";
import {Files} from "../entity/Files";
import {UploadBody} from "../dto/FileUploadRequest";

export default interface FileService {
    upload(body: UploadBody) : void;
    list(): Promise<Array<Files>>;
}
