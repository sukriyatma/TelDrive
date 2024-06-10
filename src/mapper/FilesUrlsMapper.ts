import {prismaClient} from "../config/PrismaClient";
import {FilesUrls, FilesUrlsCreateInput} from "../entity/FilesUrls";

export default class FilesUrlsMapper {

    private filesUrls;

    constructor() {
        this.filesUrls = prismaClient.files_urls;
    }

    public async insertOne (data : FilesUrlsCreateInput): Promise<FilesUrls> {
        return this.filesUrls.create({
            data: data
        });
    }

    public async insertMany (arrayData: FilesUrlsCreateInput[]) {
        return this.filesUrls.createMany({
            data: arrayData
        })
    }

    public async getList(idFiles: string): Promise<Array<FilesUrls>> {
        return await this.filesUrls.findMany({
            where : {
                id_files : idFiles
            },
            orderBy: {
                part: 'asc'
            }
        })
    }
}