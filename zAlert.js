const styles = `
.zAlert {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    
    display: none;
    opacity: 0;

    min-width: 100px;
    min-height: 70px;
    transition: opacity 0.3s ease;
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
        let root = document.createElement('div')
        let stylesheet = document.createElement('style')
        stylesheet.innerHTML = styles
        root.classList.add('zAlert')
        
        const body = document.querySelector('body')
        // body.addEventListener('click', e => {
        //     let x = e.clientX
        //     let y = e.clientY
        //     let top = root.clientTop
        //     let left = root.clientLeft
        //     if (x < left || y < top || x > (root.clientWidth + left) || y > (root.clientHeight + top)) this.hide()
        // })
        body.appendChild(stylesheet)
        body.appendChild(root)

        this.root = root
    }
    show(htmlString, options = {}) {
        return new Promise((resolve) => {
            const { root } = this
            this.#render(htmlString, options)
            root.style.display = 'block'
            setTimeout(() => {
                root.style.opacity = 1
                resolve()
            }, 200)
        })
    }
    hide() {
        return new Promise((resolve) => {
            const { root } = this
            root.style.opacity = 0
            setTimeout(() => {
                root.style.display = 'none'
                root.innerHTML = ''
                resolve()
            }, 200)
        })
    }
    #render(htmlString, options) {
        const { root } = this
        root.innerHTML = ''
        if (options.closeButton ?? true) {
            const closeButton = document.createElement('div')
            closeButton.classList.add('zAlert_close')
            closeButton.addEventListener('click', e => this.hide())
            root.appendChild(closeButton)
        }
        const container = document.createElement('div')
        container.innerHTML = htmlString
        root.appendChild(container)
    }
}

window.zAlert = new ZAlert()
