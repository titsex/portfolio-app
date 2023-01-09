import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { createTransport, Transporter } from 'nodemailer'

export class MailService {
    private static transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
        host: process.env.EMAIL_SMTP,
        secure: true,
        port: +process.env.EMAIL_PORT!,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    public static async sendConfirmationOfferMail(to: string, hex: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: `Подтвердить отправку предложения`,
            text: '',
            html: `
                    <div>
                        <h1>Для подтверждения отправки предложения, нажмите кнопку ниже</h1>
                        <a href='${process.env.API_URL}/offers/confirm?email=${to}&hex=${hex}'>Отправить</a>
                    </div>
                  `,
        })
    }

    public static async sendActivationMail(to: string, hex: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: `Активация аккаунта`,
            text: '',
            html: `
                    <div>
                        <h1>Для активации аккаунта, нажмите кнопку ниже</h1>
                        <a href='${process.env.API_URL}/users/activate?email=${to}&hex=${hex}'>Активировать</a>
                    </div>
                  `,
        })
    }
}
