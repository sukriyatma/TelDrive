
export default class BaseResponse <T> {

    data : T | null = null;
    errorCode : String | null = null;
    isSuccess : Boolean = false;
    message : String = "";

    public static success<T>(data: T): BaseResponse<T> {
        const response: BaseResponse<T> = new BaseResponse<>();
        response.data = data;
        response.isSuccess = true
        return response;
    }

    private static toError<T> (data: T, message: String, errorCode: String): BaseResponse<T> {
        const response: BaseResponse<T> = new BaseResponse<>();
        response.message = message;
        response.errorCode = errorCode;
        response.isSuccess = false;
        response.data = data;

        return response;
    }

    public static error<T>(message: String, errorCode: String): BaseResponse<T> {
        return this.toError(null, message, errorCode)
    }

    public static error<T>(data: T,message: String, errorCode: String): BaseResponse<T> {
        return this.toError(data, message, errorCode)
    }
}