// @Author: Zazzik1, https://github.com/Zazzik1
(() => {
    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const styles = `
    .zAlert {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1.2);
        
        opacity: 0;
        display: none;
        flex-direction: column;
    
        min-width: 300px;
        min-height: 200px;
        transition: opacity 0.3s ease, transform 0.3s ease;
        background-color: white;
        color: rgb(40, 40, 40);
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
        font-size: 20px;
        font-family: Arial;
        z-index: 999;
        box-shadow: 0 0 12px rgb(0 0 0 / 16%), inset -1px -1px 2px #00000021, inset 1px 1px 2px #ffffff24;
    }
    .zAlert .zAlert_close {
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        padding: 16px 20px;
        margin-top: -1px;
        margin-right: -1px;
        border-radius: 0 5px 0 0;
        transition: background-color 0.2s ease;
    }
    .zAlert .zAlert_close:hover {
        background-color: #dc6666;
    }
    .zAlert .zAlert_close_container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 1px solid rgb(220, 220, 220);
    }
    .zAlert .zAlert_close_container .zAlert_close::before,
    .zAlert .zAlert_close_container .zAlert_close::after {
        content: '';
        height: 1px;
        width: 16px;
        background-color: #5a5a5a;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: background-color 0.2s ease;
        transform: translate(-50%, -50%) rotate(45deg);
    }
    .zAlert .zAlert_close_container .zAlert_close::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
    .zAlert .zAlert_close:hover::before,
    .zAlert .zAlert_close:hover::after {
        background-color: white;
    }
    .zAlert .zAlert_container {
        padding: 8px;
        flex-grow: 1;
        min-height: 80px;
    }
    `

    class Renderer {
        constructor(container) {
            this.container = container
        }
        render(content) {
            throw new Error('this method must be overwritten')
        }
    }

    class HTMLElementRenderer extends Renderer {
        render(element) {
            this.container.appendChild(element)
        }
    }
    
    class HTMLStringRenderer extends Renderer {
        render(htmlString) {
            this.container.innerHTML = htmlString
        }
    }

    let zAlertInstance = null

    class ZAlert {
        constructor() {
            if (zAlertInstance instanceof ZAlert) return instance; // singleton
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
            return new Promise(async (resolve) => {
                const { root } = this
                this.onBlurListener = e => {
                    if (!e.composedPath().includes(root)) this.hide()
                }
                if (options.hideOnBlur ?? true) window.addEventListener('click', this.onBlurListener)
                this.timeout = options.duration ?? 300
                root.style.transition = `opacity ${this.timeout}ms ease, transform ${this.timeout}ms ease`
                this.#render(htmlStringOrElement, options)
                root.style.display = 'flex'
                await sleep(1) // without this animation doesn't work
                root.style.opacity = 1
                root.style.transform = 'translate(-50%, -50%) scale(1)'
                await sleep(this.timeout)
                resolve()
            })
        }
        hide() {
            return new Promise(async (resolve) => {
                const { root } = this
                window.removeEventListener('click', this.onBlurListener)
                root.style.opacity = 0
                root.style.transform = 'translate(-50%, -50%) scale(1.2)'
                await sleep(this.timeout)
                root.style.display = 'none'
                root.innerHTML = ''
                resolve()
            })
        }
        #render(htmlStringOrElement, options) {
            const { root } = this
            root.innerHTML = ''
            root.style.backgroundColor = options.bgColor ?? null // undefined makes style persistent while null clears it
            root.style.color = options.color ?? null
            root.style.borderColor = options.borderColor ?? null
            if (options.closeButton ?? true) {
                const closeButtonContainer = document.createElement('div')
                closeButtonContainer.classList.add('zAlert_close_container')
                const closeButton = document.createElement('div')
                closeButton.classList.add('zAlert_close')
                closeButton.addEventListener('click', e => this.hide())
                closeButtonContainer.appendChild(closeButton)
                root.appendChild(closeButtonContainer)
            }
            const container = document.createElement('div')
            container.classList.add('zAlert_container')

            const renderer = htmlStringOrElement instanceof HTMLElement ? HTMLElementRenderer : HTMLStringRenderer
            const rendererInstance = new renderer(container)
            rendererInstance.render(htmlStringOrElement)
            root.appendChild(container)
        }
    }
    
    zAlertInstance = new ZAlert()
    window.zAlert = zAlertInstance
})()