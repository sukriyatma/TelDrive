import FileService from "../FileService";
import TelegramUtils from "../../utils/TelegramUtils";
import {Files} from "../../entity/Files";
import {UploadBody} from "../../dto/FileUploadRequest";
import FilesMapper from "../../mapper/FilesMapper";
import {FilesUrlsCreateInput} from "../../entity/FilesUrls";
import FilesUrlsMapper from "../../mapper/FilesUrlsMapper";
import * as Bun from "bun";
import * as console from "console";


export default class FileServiceImpl implements FileService {

    private filesMapper: FilesMapper;
    private filesUrlsMapper: FilesUrlsMapper;
    private telegramUtils: TelegramUtils;
    private readonly fileSize = Number(Bun.env.FILE_PART_SIZE_MB || 10);

    constructor() {
        this.fileSize = this.fileSize * 1024 * 1024; // to MB
        this.telegramUtils = new TelegramUtils();
        this.filesMapper = new FilesMapper();
        this.filesUrlsMapper = new FilesUrlsMapper();
    }

    public upload(body: UploadBody) : void {

        const files = body.files
        files.forEach( async (file) => {

            const fileNameAndExt = file.name.split(".");
            const fileName = fileNameAndExt.at(0) + "";
            const fileExt = fileNameAndExt.at(1) + "";

            try {
                const links: string[] = await this.sendAsParts(file);
                const now = new Date().getTime();

                const fileResponse: Files = await this.filesMapper.insertOne({
                    name: fileName,
                    extension: fileExt,
                    created_at: now,
                    updated_at: now
                })

                const fileUrls: FilesUrlsCreateInput[] = [];
                links.forEach((link, index) => fileUrls.push({
                    id_files: fileResponse.id,
                    url: link,
                    part: index + 1,
                    created_at: now,
                    updated_at: now
                }))
                await this.filesUrlsMapper.insertMany(fileUrls)

            } catch (ex) {
                console.error("Error on process sending file :", ex)
            }

        })

    }

    private async sendAsParts(file: Blob): Promise<Array<string>> {
        const linkUrls: string[] = [];

        const buffer = await file.arrayBuffer()

        const fileNameAndExt = file.name.split(".");
        const fileName = fileNameAndExt.at(0) + "";
        const fileExt = fileNameAndExt.at(1) + "" || null;

        let offSet = 0;
        let fileCounter = 1;

        while (offSet <= buffer.byteLength) {
            const filePartsAsArrayBuffer = buffer.slice(offSet, offSet + this.fileSize)

            const linkResult: string = await this.telegramUtils.saveOneFile(filePartsAsArrayBuffer, file.type, `${fileName}--Part-${fileCounter}.${fileExt}`) ?? ""
            linkUrls.push(linkResult)

            offSet += this.fileSize;
            fileCounter += 1
        }

        return linkUrls;
    }

    public async list(): Promise<Array<Files>> {
        return await this.filesMapper.getList({skip: 0, take: 10});
    }



}