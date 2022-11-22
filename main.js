let chek = document.querySelectorAll('[type="radio"]')
let form = document.querySelector('form')
let ball = window.getComputedStyle(form, '::after')



let chekar = [...chek]

function remoCheck() {
  chekar.forEach(e => {
    e.removeAttribute("checked")
  });
}
function addCheck() {
    chekar.forEach(a => {
      a.onclick = () => {
        remoCheck()
        a.setAttribute('checked', '')
      }
    });
};
addCheck()



form.onchange = () => {
  chekar.forEach(o => {
    if (o.hasAttribute('checked') && o.hasAttribute('two')) {
      document.body.classList = 'theme-two'
      form.style.setProperty('--varBall' , '26px')
    } else if (o.hasAttribute('checked') && o.hasAttribute('three')) {
      document.body.classList = 'theme-three'
      form.style.setProperty('--varBall' , '52px')
    } else if (o.hasAttribute('checked') && o.hasAttribute('one')) {
      document.body.classList = 'theme-one'
      form.style.setProperty('--varBall' , '3px')
    }
  });
};
document.body.classList = 'theme-one'

// for click effect

let calcu = document.querySelector(".calcu")
let btn = document.querySelectorAll(".number")
let style = document.createElement("style")

calcu.onmousedown = (e) => {
  let cls = e.target.classList[1];

  if (document.body.classList[0] == 'theme-one') {
    style.innerHTML = `.theme-one .${cls} {transition: .2s !important;width: 99%;height: 95%;box-shadow: none !important;opacity: .9;font-size:33px;}`;

  } else if (document.body.classList[0] == 'theme-two') {
    style.innerHTML = `.theme-two .${cls} {transition: .2s !important;width: 99%;height: 95%;box-shadow: none !important;opacity: .9;font-size:33px;}`;

  } else if (document.body.classList[0] == 'theme-three') {
    style.innerHTML = `.theme-three .number:hover {background-color: hsl(290, 70%, 36%);transition: .2s !important;width: 99%;height: 95%;box-shadow: none !important;opacity: .9;font-size: 33px;}`
  };

  document.head.appendChild(style)

  calcu.onmouseup = () => {
    document.head.removeChild(style)
  };
};

// calcuates


let nm = document.querySelectorAll(".nm")
let equal = document.querySelector(".equal")
let opra = document.querySelectorAll("[op]")
let delet = document.querySelector(".del")
let reset = document.querySelector(".reset")
let vao = document.querySelector("[vao]")
let curunt = document.querySelector("[curunt]")

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const calculator = new Calculator(vao, curunt)

nm.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

opra.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equal.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

reset.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

delet.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})