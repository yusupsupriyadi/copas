# Contributing to Copas

Thank you for your interest in contributing to Copas! This document provides guidelines and information for contributors.

## 🔒 Repository Rules

### Branch Protection

The `master` branch is protected with the following rules:

- **No Direct Pushes**: All changes must go through Pull Requests
- **Review Required**: At least 1 approving review needed
- **Conversation Resolution**: All discussions must be resolved
- **No Force Push**: Force pushes are disabled for safety
- **Stale Reviews**: Reviews are dismissed when new commits are added

### Merge Strategy

- **Squash Merge**: Preferred for clean commit history
- **Rebase Merge**: Allowed for linear history
- **Merge Commits**: Disabled to avoid unnecessary merge commits
- **Auto Delete**: Feature branches are deleted after merge

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 7+
- Git knowledge and GitHub account
- Text editor or IDE (VS Code recommended)

### Development Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/copas.git
cd copas

# 3. Add upstream remote
git remote add upstream https://github.com/yusupsupriyadi/copas.git

# 4. Install dependencies
npm install

# 5. Start development
npm run dev
```

### Project Structure

```
copas/
├── src/
│   ├── main.js                 # Electron main process
│   ├── preload.js             # IPC preload scripts
│   └── renderer/
│       ├── index.html         # UI/HTML
│       └── styles.css         # Styling
├── build/                     # Build output (gitignored)
├── README.md                  # Project documentation
├── package.json              # Dependencies & scripts
└── CLAUDE.md                 # Claude Code configuration (gitignored)
```

## 📝 Development Workflow

### 1. Create Feature Branch

```bash
# Sync with upstream first
git fetch upstream
git checkout master
git merge upstream/master

# Create feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Follow existing code patterns and style
- Test your changes in both light and dark modes
- Ensure compatibility with Windows 10/11
- Keep changes focused and atomic

### 3. Testing

```bash
# Start development mode
npm run dev

# Test building (optional)
npm run build:dir
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat: add new feature description"
git commit -m "fix: resolve issue with specific component"
git commit -m "docs: update contribution guidelines"
```

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request (using gh CLI)
gh pr create --title "Add feature: description" --body "Detailed description of changes"
```

### 6. PR Review Process

- Maintainers will review your PR
- Address feedback promptly
- Push updates to the same branch (they'll appear in the PR)
- Once approved, maintainers will merge

## 📋 Contribution Guidelines

### Code Style

- **Language**: Vanilla JavaScript only (no frameworks)
- **Indentation**: 4 spaces for JavaScript, 2 spaces for HTML/CSS
- **Naming**: camelCase for variables/functions, kebab-case for CSS
- **Comments**: JSDoc style for functions, clear inline comments
- **File Organization**: Keep files in appropriate src/ subdirectories

### Commit Message Format

Use conventional commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style/formatting (no logic changes)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or modifying tests
- `chore:` - Build/tooling changes

Examples:

```bash
git commit -m "feat: add export functionality for snippets"
git commit -m "fix: resolve dark mode syntax highlighting issue"
git commit -m "docs: update README with new feature documentation"
```

### What We're Looking For

- 🐛 **Bug Fixes**: Issues reported in GitHub Issues
- ✨ **Features**: Items from the project roadmap
- 🎨 **UI Improvements**: Better user experience and visual design
- ⚡ **Performance**: Optimize loading, memory usage, responsiveness
- 📚 **Documentation**: README improvements, code comments, guides
- 🧪 **Testing**: Test coverage and quality assurance

### What to Avoid

- Breaking changes without discussion
- Adding heavy dependencies or frameworks
- Platform-specific code (unless necessary)
- Features that conflict with "lightweight" philosophy
- Changing core architecture without consensus

## 🐛 Bug Reports

When reporting bugs:

1. **Search existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide details**:
    - OS version (Windows 10/11)
    - App version
    - Steps to reproduce
    - Expected vs actual behavior
    - Screenshots if applicable

## 💡 Feature Requests

For new features:

1. **Check the roadmap** first
2. **Open a discussion** for major features
3. **Create an issue** with detailed description
4. **Wait for feedback** before implementing

## 🔧 Development Tips

### Debugging Electron

- Development mode opens DevTools automatically
- Use `console.log()` for debugging renderer process
- Check main process logs in terminal
- Use Electron DevTools extensions

### Testing Changes

- Test in both light and dark modes
- Verify syntax highlighting with different languages
- Check system tray functionality
- Test auto-start toggle
- Verify responsiveness with different snippet lengths

### Common Issues

- **Build fails**: Check Node.js version, clear cache
- **App won't start**: Check main.js path references
- **Styles broken**: Verify CSS file paths and syntax
- **IPC not working**: Check preload.js configuration

## 🤝 Code Review Process

### For Contributors

- Be responsive to feedback
- Ask questions if comments are unclear
- Make requested changes in separate commits
- Keep discussions focused and respectful

### Review Criteria

- Code quality and readability
- Performance impact
- User experience implications
- Compatibility with existing features
- Documentation completeness

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Pull Request Comments**: For code-specific questions

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Copas! Every contribution, no matter how small, is appreciated. 🙏
