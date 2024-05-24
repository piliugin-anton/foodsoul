import Snackbar from 'awesome-snackbar'

export function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, delay = 400) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    clearTimeout(timer)

    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export class SnackBarMessage {
  error(message: string, position = 'bottom-right') {
    new Snackbar(message, {
      position,
      style: {
        container: [
          ['background-color', 'red'],
          ['border-radius', '5px']
        ],
        message: [
          ['color', '#eee'],
        ],
        bold: [
          ['font-weight', 'bold'],
        ]
      }
    })
  }
}