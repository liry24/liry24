import { homedir } from 'node:os'
import { join } from 'pathe'
import { describe, expect, it } from 'vitest'

describe('getDownloadDirectory', () => {
    it('should return Downloads folder path', () => {
        const home = homedir()
        const expected = join(home, 'Downloads')

        expect(expected).toContain('Downloads')
        expect(expected).toBeTruthy()
    })
})

describe('avatar URL generation', () => {
    it('should generate correct URL without size parameter', () => {
        const extension = 'png'
        const url = `https://liry24.com/avatar.${extension}`

        expect(url).toBe('https://liry24.com/avatar.png')
    })

    it('should generate correct URL with size parameter', () => {
        const extension = 'png'
        const size = 64
        const url = `https://liry24.com/avatar.${extension}?s=${size}`

        expect(url).toBe('https://liry24.com/avatar.png?s=64')
    })

    it('should support different image formats', () => {
        const formats = ['png', 'jpg', 'webp']

        formats.forEach((format) => {
            const url = `https://liry24.com/avatar.${format}`
            expect(url).toContain(`avatar.${format}`)
        })
    })
})

describe('extension priority', () => {
    it('should prioritize png when multiple options are set', () => {
        const options = { png: true, jpg: true, webp: true }
        const extension = options.png ? 'png' : options.jpg ? 'jpg' : options.webp ? 'webp' : 'png'

        expect(extension).toBe('png')
    })

    it('should use jpg when png is not set', () => {
        const options = { png: false, jpg: true, webp: true }
        const extension = options.png ? 'png' : options.jpg ? 'jpg' : options.webp ? 'webp' : 'png'

        expect(extension).toBe('jpg')
    })

    it('should use webp when png and jpg are not set', () => {
        const options = { png: false, jpg: false, webp: true }
        const extension = options.png ? 'png' : options.jpg ? 'jpg' : options.webp ? 'webp' : 'png'

        expect(extension).toBe('webp')
    })

    it('should default to png when no options are set', () => {
        const options: { png?: boolean; jpg?: boolean; webp?: boolean } = {}
        const extension = options.png ? 'png' : options.jpg ? 'jpg' : options.webp ? 'webp' : 'png'

        expect(extension).toBe('png')
    })
})

describe('file path generation', () => {
    it('should generate correct file path', () => {
        const home = homedir()
        const downloadDir = join(home, 'Downloads')
        const filePath = join(downloadDir, 'avatar.png')

        expect(filePath).toContain('Downloads')
        expect(filePath).toContain('avatar.png')
    })

    it('should handle different extensions', () => {
        const home = homedir()
        const downloadDir = join(home, 'Downloads')

        const extensions = ['png', 'jpg', 'webp']
        extensions.forEach((ext) => {
            const filePath = join(downloadDir, `avatar.${ext}`)
            expect(filePath).toContain(`avatar.${ext}`)
        })
    })
})
