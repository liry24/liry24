import consola from 'consola'
import { homedir } from 'node:os'
import { join } from 'pathe'

import { downloadFile } from '../utils/download.js'

interface AvatarOptions {
    png?: boolean
    jpg?: boolean
    webp?: boolean
    size?: number
}

export const avatarCommand = async (options: AvatarOptions) => {
    // Determine file extension based on priority: png > jpg > webp
    const extension = options.png ? 'png' : options.jpg ? 'jpg' : options.webp ? 'webp' : 'png'

    // Get download directory
    const downloadDir = getDownloadDirectory()
    const filePath = join(downloadDir, `avatar.${extension}`)

    // Download URL
    const url = `https://liry24.com/avatar.${extension}${options.size ? `?s=${options.size}` : ''}`

    consola.info(`Downloading avatar image (${extension})...`)
    consola.box(`URL: ${url}\nDestination: ${filePath}`)

    try {
        await downloadFile(url, filePath)
        consola.success(`Downloaded to: ${filePath}`)
    } catch (error) {
        consola.error('Download failed:', error instanceof Error ? error.message : String(error))
        process.exit(1)
    }
}

const getDownloadDirectory = () => {
    const home = homedir()

    switch (process.platform) {
        case 'win32':
        case 'darwin':
            return join(home, 'Downloads')
        case 'linux':
            return process.env.XDG_DOWNLOAD_DIR || join(home, 'Downloads')
        default:
            return join(home, 'Downloads')
    }
}
