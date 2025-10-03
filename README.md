# WHAT IS TAURI

Tauri is a framework for building **native multiplatform** lightweight desktop & mobile applications.
Tauri can be integrated with any frontend framework as long as it compiles to **(HTML, CSS, JS)** while also leveraging languages like **Rust, Swift, Kotlin** for the backend.

But before initialization, there are some *prerequisites* to complete first.

---

## ✅ Prerequisites

### All Platforms

- Node.js 18+
- Rust toolchain via [rustup](https://rustup.rs)
- Cargo (automatically installed with Rust)

### Windows

- Visual Studio C++ Build Tools (workload *Desktop development with C++* + Windows 10/11 SDK)
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

### macOS

- Xcode Command Line Tools (`xcode-select --install`)

### Linux

- WebKitGTK + build dependencies (see [Tauri Linux docs](https://tauri.app/v2/guides/getting-started/prerequisites/#linux))

---

**Disclaimer**: This guide uses **Tauri V2**. For v1, you can check out [Tauri V1](https://v1.tauri.app/)

## 🚀 Start Building

Once everything is checked and ready, it's time to create a new project. By the way, in this example I'm using React + TypeScript for the frontend:

```bash
npm create tauri-app@latest my-app
```

You'll see prompts like this:

```bash
? Project name (tauri-app) › (Enter any name you want)

? Identifier (com.f.(your project name)) › com.f.(your project name)

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

Once the project is created, you'll see this notice from Tauri:

```bash
For Desktop development, run:
  npm run tauri dev

For Android development, run:
  npm run tauri android dev
```

**Disclaimer 2**: In this project we're using npm as the package manager, so if you're using pnpm, yarn, bun, etc., just adjust accordingly.

Now the project exists, but try opening the `App.tsx` file in `/src`.
If there are still errors, it's usually because the *dependencies* haven't been installed yet. But just to be safe, check for any TS/import errors, just in case (though it shouldn't happen since we haven't changed anything in the code yet hehe).

```bash
npm install
```

*^ inside the project folder*

After all modules are installed, the errors should disappear. Now let's run:

```bash
npm run tauri dev
```

A window like this will appear on your screen:

![Tauri Desktop SS](doc_img_src/tauri_dekstop.png)

You can usually also access it via web:

![Tauri Web SS](doc_img_src/tauri_web.png)

The URL is shown in the terminal:

```bash
npm run tauri dev

VITE v7.1.7  ready in 345 ms

  ➜  Local:   http://localhost:1420/

*rest of the message*
```

Since this is just an introduction, there's not much to notice. If you're already familiar with React, you should be fine.

But for those who are new to Rust like me, let's go ahead and open the `/src-tauri` folder.

Inside, the structure usually looks like this:

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

The code you should notice is in `/src/lib.rs`:

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

And in `main.rs`:

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_app_lib::run()
}
```

### 🔄 Code Structure: Two Options

**Option 1: Default Structure (Recommended for Mobile)**

This is the recommended structure, especially if you plan to build for Android/iOS:

**`lib.rs`** - Contains all logic & commands:
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

**`main.rs`** - Minimal, just the entry point:
```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_app_lib::run()
}
```

**Why this structure?**
- The `#[cfg_attr(mobile, tauri::mobile_entry_point)]` attribute is essential for mobile builds
- Code is more modular and reusable
- Standard Tauri V2 approach for cross-platform

---

**Option 2: All-in main.rs (Desktop Only)**

If you're **only building for desktop** and don't care about mobile, you can put everything in `main.rs`:

**`lib.rs`** - Just the command:
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

**`main.rs`** - All logic goes here:
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

**Note:** With this structure, mobile support becomes more complicated. So **Option 1 is still recommended**.

Done!

---

## 📁 Folder & File Structure Explained

If you're curious about what these folders and files are for, here's the breakdown:

- **`/src`**: Where Rust code lives (entry points `lib.rs` & `main.rs`). Here you can create Rust commands, setup, plugins, etc.

- **`/capabilities`**: Permission configuration folder (controls what commands can access, like filesystem, network, etc.). For better security and transparency.

- **`/gen`**: Auto-generated by Tauri framework, so just ignore it for now.

- **`/icons`**: Application icons that will be used during bundling for Windows, Linux, and macOS.

- **`/target`**: Rust build output (automatically created by Cargo).

- **`Cargo.toml`**: Rust project config file. Similar to `package.json` in Node.js.

- **`Cargo.lock`**: Rust dependency lock file, don't touch this.

- **`build.rs`**: Optional build script. Usually used by Tauri to bundle icons, resources, etc.

- **`tauri.conf.json`**: Main Tauri config file: app name, identifier, default window settings, bundling, updater, etc.

**In short**: 
- Rust side is managed through `Cargo.toml`, `lib.rs`, `main.rs`.
- Tauri side is managed through `tauri.conf.json` + `/capabilities`.
- Assets are in `/icons`.
- The rest like (`/gen`, `/target`, `Cargo.lock`) are more about the build system.

---

## 🦀 What is Cargo?

Cargo is like a package manager & build tool but for Rust, similar to `npm` in JS or `pip` in Python. It's used to install dependencies, compile projects, and run/test apps.

You can also try Cargo commands in `/src-tauri`:

```bash
cd src-tauri/

# then

cargo build   # compile project
cargo run     # run project
cargo check   # check for errors without full build
cargo clean   # delete build folder (target/)
```