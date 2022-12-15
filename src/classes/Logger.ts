import { getDate } from '@utils'
import { COLOR_TYPES, COLORS } from '@types'

export class Logger {
    public static info(...data: any[]) {
        const [, date] = getDate()

        console.log(
            `${COLORS.CYAN + COLOR_TYPES.BOLD}[INFO]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${date})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }

    public static error(...data: any[]): void {
        const [, date] = getDate()

        console.log(
            `${COLORS.RED + COLOR_TYPES.BOLD}[ERROR]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${date})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }
}
