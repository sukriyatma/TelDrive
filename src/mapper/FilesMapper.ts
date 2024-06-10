import {prismaClient} from "../config/PrismaClient";
import {Files, FilesCreateInput} from "../entity/Files"

// const files = prismaClient.files

export default class FilesMapper {

    private files;

    constructor() {
        this.files = prismaClient.files;
    }

    public async insertOne (data : FilesCreateInput): Promise<Files> {
        return await this.files.create({
            data: data
        });
    }

    public async getOne(id: string): Promise<Files> {
        return await this.files.findUnique({
            where: {
                id: id
            }
        })
    }

    public async getList({skip, take}): Promise<Array<Files>> {
        return await this.files.findMany({
            skip: skip,
            take: take,
            orderBy: {
                created_at: 'desc'
            }
        })
    }
}

