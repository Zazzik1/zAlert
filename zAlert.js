// @Author: Zazzik1, https://github.com/Zazzik1
(() => {
    const styles = `
    .zAlert {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1.2);
        
        display: none;
        opacity: 0;
    
        min-width: 100px;
        min-height: 70px;
        transition: opacity 0.3s ease, transform 0.3s ease;
        background-color: white;
        color: rgb(40, 40, 40);
        padding: 32px;
        border-radius: 8px;
        border: 1px solid rgb(220, 220, 220);
        font-size: 20px;
        font-family: Arial;
        z-index: 10;
    }
    .zAlert .zAlert_close {
        position: absolute;
        right: 8px;
        top: 12px;
        cursor: pointer;
    }
    .zAlert .zAlert_close::before,
    .zAlert .zAlert_close::after {
        content: '';
        height: 2px;
        width: 12px;
        background-color: black;
        position: absolute;
        right: 0;
        top: 0;
        transform: rotate(45deg);
    }
    .zAlert .zAlert_close::after {
        bottom: 0;
        transform: rotate(-45deg);
    }
    `
    
    class ZAlert {
        constructor() {
            this.timeout = 300 // [ms]
            let root = document.createElement('div')
            this.root = root
            let stylesheet = document.createElement('style')
            stylesheet.innerHTML = styles
            root.classList.add('zAlert')
            
            const body = document.querySelector('body')
            body.appendChild(stylesheet)
            body.appendChild(root)
    
        }
        show(htmlStringOrElement, options = {}) {
            return new Promise((resolve) => {
                const { root } = this
                this.onBlurListener = e => {
                    if (!e.path.includes(root)) this.hide()
                }
                if (options.hideOnBlur ?? true) window.addEventListener('click', this.onBlurListener)
                this.timeout = options.duration ?? 300
                root.style.transition = `opacity ${this.timeout}ms ease, transform ${this.timeout}ms ease`
                this.#render(htmlStringOrElement, options)
                root.style.display = 'block'
                setTimeout(() => {
                    root.style.opacity = 1
                    root.style.transform = 'translate(-50%, -50%) scale(1)'
                    resolve()
                }, this.timeout)
            })
        }
        hide() {
            return new Promise((resolve) => {
                const { root } = this
                window.removeEventListener('click', this.onBlurListener)
                root.style.opacity = 0
                root.style.transform = 'translate(-50%, -50%) scale(1.2)'
                setTimeout(() => {
                    root.style.display = 'none'
                    root.innerHTML = ''
                    resolve()
                }, this.timeout)
            })
        }
        #render(htmlStringOrElement, options) {
            const { root } = this
            root.innerHTML = ''
            root.style.backgroundColor = options.bgColor ?? null // undefined makes style persistent while null clears it
            root.style.color = options.color ?? null
            root.style.borderColor = options.borderColor ?? null
            if (options.closeButton ?? true) {
                const closeButton = document.createElement('div')
                closeButton.classList.add('zAlert_close')
                closeButton.addEventListener('click', e => this.hide())
                root.appendChild(closeButton)
            }
            const container = document.createElement('div')
            if (htmlStringOrElement instanceof HTMLElement) {
                container.appendChild(htmlStringOrElement)
            } else container.innerHTML = htmlStringOrElement
            root.appendChild(container)
        }
    }
    
    window.zAlert = new ZAlert()
})()