import cliProgress from 'cli-progress'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { ofetch } from 'ofetch'

export const downloadFile = async (url: string, destination: string) => {
    const response = await ofetch.raw(url, { responseType: 'stream' })

    const contentLength = response.headers.get('content-length')
    const totalSize = contentLength ? parseInt(contentLength, 10) : 0

    // Create progress bar
    const progressBar = new cliProgress.SingleBar({
        format: 'Progress |{bar}| {percentage}% | {value}/{total} bytes',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
    })

    if (totalSize > 0) progressBar.start(totalSize, 0)

    let downloadedSize = 0
    const writeStream = createWriteStream(destination)

    // Convert Web ReadableStream to Node.js Readable
    const nodeStream = Readable.fromWeb(response._data as any)

    // Track progress
    nodeStream.on('data', (chunk: Buffer) => {
        downloadedSize += chunk.length
        if (totalSize > 0) progressBar.update(downloadedSize)
    })

    try {
        await pipeline(nodeStream, writeStream)
        if (totalSize > 0) progressBar.stop()
    } catch (error) {
        if (totalSize > 0) progressBar.stop()
        throw error
    }
}
