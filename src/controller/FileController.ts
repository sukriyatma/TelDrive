import Elysia from "elysia";
import FileService from "../service/FileService";
import FileServiceImpl from "../service/implement/FileServiceImpl";
import BaseResponse from "../dto/BaseResponse";
import FileUploadRequest from "../dto/FileUploadRequest";
import FileUploadResponse from "../dto/FileUploadResponse";
import FilesMapper from "../mapper/FilesMapper";
import {Files} from "../entity/Files";

export default (server: Elysia) => {
    const fileService: FileService = new FileServiceImpl()

    return server.group("/files", (app) =>
        app
            .post("/",
                async ({body}) => {
                    fileService.upload(body)

                    return new Response(
                        JSON.stringify(
                            BaseResponse.success(null)))
                        .json()
                },
                {body: FileUploadRequest, type: "formdata"}
            )
            .get("/list",
                async () => {
                    const files = await fileService.list();

                    return new Response(
                        JSON.stringify(
                            BaseResponse.success(files),
                            (key, value) => (typeof value === 'bigint' ? value.toString() : value))
                    ).json();
                })
            .get("/download/id/:id",
                async ({params: {id}}) => {
                    const file = await fileService.download(id)
                return ;
                })
    )
}