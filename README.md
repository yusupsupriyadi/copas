# Copas - Code Snippet Manager

![Copas Logo](https://img.shields.io/badge/Copas-Code%20Snippet%20Manager-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)
![Electron](https://img.shields.io/badge/Electron-Framework-9feaf9)

> A lightweight, borderless desktop application for managing code snippets with syntax highlighting and dark mode support.

## ✨ Features

- **🪟 Borderless Design**: Clean 500x350px window without OS frame
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔤 Syntax Highlighting**: Support for 20+ programming languages
- **🔍 Search Functionality**: Real-time search through snippets
- **📋 One-Click Copy**: Click any snippet to copy to clipboard
- **⚡ Auto-Start**: Optional Windows startup integration
- **🗂️ System Tray**: Minimize to tray with context menu
- **📜 Scrollable Cards**: View complete code with vertical scroll
- **💾 Local Storage**: All data stored locally (no cloud dependency)
- **🎯 Context Menu**: Right-click to edit or delete snippets

## 📥 Download

### For End Users

Download the latest release:

- **[📦 Portable EXE](https://github.com/yourusername/copas/releases/latest)** - No installation required
- **[🔧 MSI Installer](https://github.com/yourusername/copas/releases/latest)** - Full Windows installation with shortcuts

### Supported Platforms

- Windows 10/11 (x64)

## 🚀 Quick Start

1. Download the portable EXE or install via MSI
2. Run the application
3. Click **"+ ADD"** to create your first snippet
4. Select language for syntax highlighting
5. Paste your code and save
6. Click any snippet card to copy to clipboard

## 🎨 Screenshots

### Light Mode
*Clean and minimal interface for distraction-free snippet management*

### Dark Mode
*Easy on the eyes with full syntax highlighting support*

## 🛠️ Tech Stack

- **Electron**: Cross-platform desktop framework
- **HTML5/CSS3**: Modern web technologies
- **Vanilla JavaScript**: No framework dependencies
- **Highlight.js**: Syntax highlighting library
- **electron-builder**: Application packaging

## 🔧 Development

### Prerequisites

- Node.js 16+ 
- npm 7+

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/copas.git
cd copas

# Install dependencies
npm install

# Start development mode
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start app with DevTools
npm start           # Start app in production mode

# Building
npm run build       # Build for all platforms
npm run build:win   # Build for Windows only
npm run build:dir   # Build unpacked directory
npm run dist        # Build without publishing
```

## 📝 Supported Languages

JavaScript, TypeScript, HTML, CSS, Python, Java, C++, C#, PHP, Go, Rust, JSON, XML, SQL, Bash, PowerShell, YAML, Markdown, and more.

## ⌨️ Keyboard Shortcuts

- `Escape` - Close modal/dialog
- `Ctrl+F` - Focus search input
- `Right-click` - Context menu (Edit/Delete)

## 🔧 Configuration

### Auto-Start
Enable auto-start from the toggle in the header to launch Copas when Windows starts.

### Data Storage
All snippets are stored locally in your browser's localStorage. No data is sent to external servers.

## 🤝 Contributing

Contributions are welcome! This project follows GitHub's standard contribution workflow with branch protection rules.

📋 **For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)**

### 🔒 Branch Protection Rules

The `master` branch is protected with the following rules:
- **Pull Request Required**: Direct pushes to master are not allowed
- **Review Required**: All PRs need at least 1 approving review
- **Conversation Resolution**: All PR conversations must be resolved
- **Stale Review Dismissal**: Reviews are dismissed when new commits are pushed

### 📝 Contribution Workflow

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/copas.git
   cd copas
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Start development mode
   npm run dev
   ```

3. **Create Feature Branch**
   ```bash
   # Create and switch to feature branch
   git checkout -b feature/amazing-feature
   # or for bug fixes
   git checkout -b fix/bug-description
   ```

4. **Make Your Changes**
   - Follow the existing code style and patterns
   - Test your changes thoroughly
   - Ensure the app builds and runs correctly

5. **Commit Your Changes**
   ```bash
   # Stage your changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: add amazing new feature"
   # or for bug fixes
   git commit -m "fix: resolve issue with snippet saving"
   ```

6. **Push and Create Pull Request**
   ```bash
   # Push to your fork
   git push origin feature/amazing-feature
   
   # Create PR on GitHub
   gh pr create --title "Add amazing new feature" --body "Description of changes"
   ```

7. **PR Review Process**
   - Your PR will be reviewed by maintainers
   - Address any feedback or requested changes
   - Once approved, it will be merged to master

### 🎯 Contribution Guidelines

#### Code Style
- **Language**: Use vanilla JavaScript (no frameworks)
- **Structure**: Follow existing project organization in `src/` folder
- **Consistency**: Match existing code patterns and conventions
- **Performance**: Maintain the lightweight philosophy
- **Compatibility**: Ensure Windows compatibility (primary platform)

#### Commit Messages
Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes  
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code restructuring
- `test:` for adding tests

#### What to Contribute
- 🐛 Bug fixes and improvements
- ✨ New features from the roadmap
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Tests and code quality improvements

#### Before Contributing
- Check existing issues and PRs to avoid duplicates
- For major changes, create an issue first to discuss
- Ensure your changes don't break existing functionality
- Test with both light and dark modes

## 🐛 Bug Reports

Found a bug? Please [create an issue](https://github.com/yourusername/copas/issues) with:

- OS version
- App version
- Steps to reproduce
- Expected vs actual behavior

## 📋 Roadmap

- [ ] macOS support
- [ ] Linux support  
- [ ] Export/Import functionality
- [ ] Categories/Tags system
- [ ] Global hotkey support
- [ ] Multiple snippet collections

## 🏗️ Architecture

Copas uses a simple but effective architecture:

- **Main Process** (`main.js`): Window management, tray, IPC
- **Renderer Process** (`index.html`): UI and application logic  
- **Preload Script** (`preload.js`): Secure IPC bridge
- **Styles** (`styles.css`): Complete styling with dark mode

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💝 Acknowledgments

- [Highlight.js](https://highlightjs.org/) for syntax highlighting
- [Electron](https://electronjs.org/) for the desktop framework
- All contributors who help improve Copas

## 🔗 Links

- [Homepage](https://github.com/yourusername/copas)
- [Releases](https://github.com/yourusername/copas/releases)
- [Issues](https://github.com/yourusername/copas/issues)
- [Discussions](https://github.com/yourusername/copas/discussions)

---

<p align="center">
  <strong>Made with ❤️ for developers who love clean, simple tools</strong>
</p>

<p align="center">
  <a href="#copas---code-snippet-manager">Back to top</a>
</p>