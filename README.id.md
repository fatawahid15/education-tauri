# TAURI ITU APASIH

Tauri adalah **lightweight desktop app framework** yang biasanya dipakai untuk porting web apps kita ke **multiplatform** (Windows, macOS, Linux).

Frontend Tauri bisa diintegrasikan dengan framework modern seperti **React, Next.js, Nuxt, Leptos (Rust)**, dll.

Tapi sebelum inisialisasi tentu aja ada *prerequisites*-nya dulu.

---

## ✅ Prerequisites

### All Platform
- Node.js 18+
- Rust toolchain via [rustup](https://rustup.rs)
- Cargo (sudah otomatis ada setelah install Rust)

### Windows
- Visual Studio C++ Build Tools (workload *Desktop development with C++* + Windows 10/11 SDK)  
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

### macOS
- Xcode Command Line Tools (`xcode-select --install`)

### Linux
- WebKitGTK + build dependencies (lihat [docs Tauri Linux](https://tauri.app/v2/guides/getting-started/prerequisites/#linux))

---

## 🚀 Mulai Build

Kalau semuanya sudah dicek dan aman, waktunya buat project baru, btw disini yang aku praktekin itu frontnednya React + TypeScript ya

```bash
npm create tauri-app@latest my-app

? Project name (tauri-app) › (Isi aja bebas asal sopan)

? Identifier (com.f.(nama project kamu)) > com.f.(nama project kamu)

? Choose which language to use for your frontend ›
❯ TypeScript / JavaScript  (pnpm, yarn, npm, deno, bun)
  Rust
  .NET

? Choose your package manager ›
❯ npm
  pnpm
  yarn
  deno
  bun

Choose your UI template ›
  Vanilla
  Vue
  Svelte
> React
  Solid 
  Angular
  Preact

? Choose your UI flavor ›
❯ TypeScript
  JavaScript
```

Nah projectnya sudah jadi, nanti muncul notice ini dari Tauri-nya:
```bash
For Desktop development, run:
  npm run tauri dev

For Android development, run:
  npm run tauri android dev
```

Kalian langsung aja coba
```bash
npm run tauri dev
```
setelah itu nanti akan muncul seperti ini: 
![Tauri Window Screenshot]()
![alt text](G1dE6FTbkAAgKtJ.jpg)