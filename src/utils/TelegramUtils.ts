import TelegramBot, {Message} from "node-telegram-bot-api";

export default class TelegramUtils {

    private token : string = Bun.env.TELEGRAM_TOKEN || "";
    private chatId: string = Bun.env.TELEGRAM_BASE_CHAT_ID || "";
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(this.token, {polling : true});
        this.bot.on("message", ({chat}) => {
            this.bot.sendMessage(chat.id, "-----BATAS BOSKU-----")
        });
    }

    public async saveOneFile(fileBuffer: ArrayBuffer, contentType: string, fileName: string) {
        return await this.send(fileBuffer, contentType, fileName)
            .then(async message => {
                const fileId = message.document?.file_id
                if (fileId) {
                    return await this.reqFileLink(fileId)
                }
                return null
            })
    }

    private async send(arrayBuffer: ArrayBuffer, contentType: string, fileName: string): Promise<Message> {
        return await this.bot.sendDocument(
            this.chatId,
            Buffer.from(arrayBuffer),
            {},
            {
                filename: fileName,
                contentType: contentType
            })
    }

    private async reqFileLink(fileId: string) {
        return await this.bot.getFileLink(fileId)
    }

}