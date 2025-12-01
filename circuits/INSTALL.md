# Installing Circom 2.0

The circuit compiler (circom) needs to be installed separately. Circom 2.0 is not available as a standard npm package, so you need to install it using one of these methods:

## Option 1: Homebrew (macOS - Recommended)

```bash
brew install circom
```

Then verify installation:
```bash
circom --version
```

## Option 2: Download Pre-built Binary

1. Go to: https://github.com/iden3/circom/releases
2. Download the latest release for your platform (e.g., `circom-macos-amd64` for macOS)
3. Extract and rename to `circom`
4. Make it executable: `chmod +x circom`
5. Move to a directory in your PATH (e.g., `/usr/local/bin/`):
   ```bash
   sudo mv circom /usr/local/bin/
   ```

## Option 3: Build from Source (Requires Rust)

```bash
# Install Rust if you don't have it
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clone and build circom
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release

# The binary will be in target/release/circom
# Copy it to your PATH
sudo cp target/release/circom /usr/local/bin/
```

## After Installation

Once circom is installed, verify it works:

```bash
circom --version
# Should show: circom compiler version 2.x.x
```

Then compile the circuit:

```bash
npm run compile
```

## Troubleshooting

**"circom not found" error:**
1. Check if circom is in your PATH: `which circom`
2. Verify installation: `circom --version`
3. Make sure you installed circom 2.0 (not the old 0.5.x version)
4. Restart your terminal after installation

**Wrong version error:**
- Make sure you have circom 2.0+, not the old 0.5.x version
- Old versions don't support `pragma circom 2.0.0;` syntax

