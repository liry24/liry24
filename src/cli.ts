import cac from 'cac'

import { avatarCommand } from './commands/avatar.js'
import { openCommand } from './commands/open.js'

const cli = cac('liry24')

cli.command('avatar', 'Download avatar image')
    .option('--png', 'Download PNG format')
    .option('--jpg', 'Download JPG format')
    .option('--webp', 'Download WebP format')
    .option('--size, -s <size>', 'Image size (e.g., 64)')
    .action(avatarCommand)

cli.help()
cli.version('1.0.5')

// If no arguments are provided, open the website
if (process.argv.length === 2) {
    openCommand()
} else {
    cli.parse()
}
