import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { createTransport, Transporter } from 'nodemailer'

export class MailService {
    private static transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
        host: 'smtp.yandex.ru',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    public static async sendActivationMail(to: string, hex: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: `Активация аккаунта на ${process.env.CLIENT_URL}`,
            text: '',
            html: `
                    <div>
                        <h1>Для активации аккаунта нажмите кнопку ниже</h1>
                        <a href='${process.env.API_URL}/users/activate/${hex}'>Активировать</a>
                    </div>
                  `,
        })
    }
}
