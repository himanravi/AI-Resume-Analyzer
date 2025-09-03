markdown
# 🧮 Simple Web Calculator

A lightweight, responsive calculator built with pure **HTML5, CSS3 & JavaScript**.  
Perform everyday math and a few power-user tricks directly in your browser—no frameworks, no fuss.

> **Live Demo** → https://himanravi.github.io/Calculator  
> _(enabled automatically via GitHub Pages)_

---

## ✨ Highlights

| Feature        | Description                                           |
|----------------|-------------------------------------------------------|
| ⚡ Blazing fast | No build step—just open `index.html`                 |
| 🎨 Modern UI   | Gradient background, glass-morphic keys, hover glows |
| 📱 Responsive  | Flexbox layout scales from phones to desktops        |
| 🔢 Extended Ops| `x²`, `x³`, `xʸ`, √x in addition to `+ – * /`        |

---

## 🚀 2-Second Setup

1. **Clone**
   bash
   git clone https://github.com/himanravi/Calculator.git
   cd Calculator
   
2. **Launch**
   bash
   open index.html        # macOS
   start index.html       # Windows
   xdg-open index.html    # Linux
   

---

## 📂 File Map

Calculator/
├─ index.html      # Main markup
├─ style.css       # All styling & animations
├─ calculator.js   # Logic (display, eval, sqrt)
└─ README.md       # You are here


---

## ⌨ Usage Cheat-Sheet

| Press           | Result                                 |
|-----------------|----------------------------------------|
| `0–9 .`         | Append digit / decimal                 |
| `+ – * /`       | Append operator                        |
| `x²`, `x³`, `xʸ`| Append exponent (`**2`, `**3`, `**`)  |
| `√`             | Square-root current value              |
| `=`             | Evaluate expression                    |
| `C`             | Clear screen                           |

---

## 🛠 Customization

- **Colors**: tweak the `linear-gradient()` values in `style.css`
- **Fonts**: swap `font-family` under `body`
- **New Keys**: add `<input type="button">` in `index.html`, wire function in `calculator.js`

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b amaze-us`)
3. Commit (`git commit -m 'Add keyboard shortcuts'`)
4. Push (`git push origin amaze-us`)
5. Open a Pull Request

---

## 📄 License

MIT © [Himanshu Ravi](https://github.com/himanravi)  
Feel free to use, hack, or embed in your own projects.

---

Made with ❤ and late-night coffee.