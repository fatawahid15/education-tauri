# TAURI ITU APASIH

Tauri itu framework untuk membuat aplikasi desktop & mobile **native multiplatform** ringan.
Tauri bisa di-integrate dengan framework frontend apa saja asal framework-nya nge-compile **(HTML, CSS, JS)** dan disaat yang sama juga memaksimalkan bahasa seperti **Rust, Swift, Kotlin** untuk backend-nya.

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

**Disclaimer**: Tauri yang digunakan disini **Tauri V2** ya. untuk v1 kalian bisa langsung lihat [Tauri V1](https://v1.tauri.app/)

## 🚀 Mulai Build

Kalau semuanya sudah dicek dan aman, waktunya buat project baru. Btw disini yang aku praktekin itu frontend-nya React + TypeScript ya:

```bash
npm create tauri-app@latest my-app
```

Nanti akan muncul prompt seperti ini:

```bash
? Project name (tauri-app) › (Isi aja bebas asal sopan)

? Identifier (com.f.(nama project kamu)) › com.f.(nama project kamu)

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

? Choose your UI template ›
  Vanilla
  Vue
  Svelte
❯ React
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

**Disclaimer 2**: di project ini package manager-nya kita pake npm ya, jadi kalau kalian semisal pakai pnpm, yarn, bun, dll bisa disesuaikan saja.

Nah project-nya iya memang sudah ada, tapi coba kalian buka file `App.tsx` di `/src`.
Kalau masih banyak error biasanya karena *dependencies* belum ter-install, tapi buat jaga-jaga coba cek ada error TS/import, siapa tau miss (tapi ga mungkin sih kan belum ganti apa-apa di codenya hehe).

```bash
npm install
```

*^ didalem folder projectnya ya*

Nah setelah itu kalau module sudah terinstall semua nanti error-nya hilang semua tuh, langsung aja kita:

```bash
npm run tauri dev
```

Nanti di layar kalian akan muncul window seperti ini ya:

![Tauri Desktop SS](doc_img_src/tauri_dekstop.png)

Kalian juga biasanya bisa langsung akses websitenya:

![Tauri Web SS](doc_img_src/tauri_web.png)

URL-nya dikasih tau di terminal ya, bisa kalian lihat di terminal:

```bash
npm run tauri dev

VITE v7.1.7  ready in 345 ms

  ➜  Local:   http://localhost:1420/

*rest of the message*
```

Nah karena ini baru perkenalan jadi ga banyak yang harus di-notice. Kalau sudah terbiasa dengan React harusnya aman saja.

Tapi mungkin ada yang baru aja masuk Rust seperti saya, langsung saja buka folder `/src-tauri`.

Nanti didalamnya strukturnya itu biasanya seperti ini:

```
/capabilities
/gen/
/icons
/src/lib.rs
/src/main.rs
/target
build.rs
Cargo.lock
Cargo.toml
tauri.conf.json
```

Untuk kode yang bisa di-notice ada di `/src/lib.rs`:

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

Dan di `main.rs`:

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_app_lib::run()
}
```

### 🔄 Struktur Code: Dua Pilihan

**Pilihan 1: Struktur Default (Recommended untuk Mobile)**

Ini struktur yang direkomendasikan, terutama kalau kamu berencana build untuk Android/iOS:

**`lib.rs`** - Berisi semua logic & commands:
```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

**`main.rs`** - Minimal, cuma entry point:
```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_app_lib::run()
}
```

**Kenapa struktur ini?**
- Attribute `#[cfg_attr(mobile, tauri::mobile_entry_point)]` penting untuk mobile builds
- Kode lebih modular dan reusable
- Standar Tauri V2 untuk cross-platform

---

**Pilihan 2: All-in di main.rs (Desktop Only)**

Kalau kamu **cuma mau build desktop** dan ga peduli mobile, bisa semua di `main.rs`:

**`lib.rs`** - Cuma command aja:
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

**`main.rs`** - Semua logic ada disini:
```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

**Catatan:** Dengan struktur ini, mobile support jadi lebih ribet. Jadi **tetap disarankan pakai Pilihan 1**.

Selesai deh!

---

## 📁 Penjelasan Struktur Folder & File

Btw kalo kalian penasaran folder-folder dan file itu gunanya apa, aku jelasin ya:

- **`/src`**: Tempat kode Rust (entry point `lib.rs` & `main.rs`). Di sini kamu bisa bikin command Rust, setup, plugin, dll.

- **`/capabilities`**: Folder konfigurasi permission (ngatur command boleh akses sampai level apa, misal filesystem, network, dsb). Biar lebih aman dan ketahuan aja gitu.

- **`/gen`**: Dari framework Tauri, jadi abaikan saja dulu.

- **`/icons`**: Ikon aplikasi yang bakal dipake pas bundling buat Windows, Linux, dan macOS.

- **`/target`**: Build output Rust (otomatis dibuat oleh Cargo).

- **`Cargo.toml`**: File config Rust project. Mirip `package.json` Node.js.

- **`Cargo.lock`**: File lock dependency Rust, jangan disentuh ya.

- **`build.rs`**: Script build opsional. Biasa dipakai Tauri buat bundle icon, resource, dll.

- **`tauri.conf.json`**: File config utama Tauri: nama app, identifier, window default, bundling, updater, dsb.

**Singkatnya**: 
- Rust side diatur lewat `Cargo.toml`, `lib.rs`, `main.rs`.
- Tauri side diatur lewat `tauri.conf.json` + `/capabilities`.
- Assets side ada di `/icons`.
- Sisanya kayak (`/gen`, `/target`, `Cargo.lock`) lebih ke teknis build system.

---

## 🦀 Apa itu Cargo?

Cargo ini itu kayak package manager & build tool tapi untuk Rust, mirip kaya `npm` di JS atau `pip` di Python. Fungsinya buat install dependency, compile project, dan run/test app.

Kalian juga bisa coba-coba command Cargo di `/src-tauri`:

```bash
cd src-tauri/

# terus

cargo build   # compile project
cargo run     # jalanin project
cargo check   # cek error tanpa build penuh
cargo clean   # hapus folder build (target/)
```