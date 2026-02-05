# liry24

Personal CLI tool for Liry24

## Installation

```bash
# Using npx (no installation required)
npx liry24 --help

# Or install globally
npm install -g liry24
```

## Usage

```bash
# Basic usage (downloads PNG by default)
npx liry24 avatar

# Specify format
npx liry24 avatar --png | --jpg | --webp

# Specify size
npx liry24 avatar --size 64
npx liry24 avatar -s 128

# Combine options
npx liry24 avatar --jpg --size 256
```

### Options

- `--png` - Download PNG format
- `--jpg` - Download JPG format
- `--webp` - Download WebP format
- `--size, -s <size>` - Specify image size (e.g., 64, 128, 256)

### Download Location

Images are downloaded to your default Downloads folder:

- Windows: `C:\Users\USERNAME\Downloads`
- macOS: `/Users/USERNAME/Downloads`
- Linux: `~/Downloads` or `$XDG_DOWNLOAD_DIR`

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (watch)
npm run dev

# Run tests
npm test

# Lint
npm run lint

# Format
npm run fmt
```

## License

MIT
