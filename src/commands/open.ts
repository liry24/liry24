import consola from 'consola'
import open, { apps } from 'open'

const LIRY24_URL = 'https://liry24.com'

export const openCommand = async () => {
    try {
        consola.info(`Opening ${LIRY24_URL} in your browser...`)
        await open(LIRY24_URL, { app: { name: apps.browser } })
        consola.success('Browser opened successfully!')
    } catch (error) {
        consola.error(
            'Failed to open browser:',
            error instanceof Error ? error.message : String(error)
        )
        process.exit(1)
    }
}
