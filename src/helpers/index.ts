import Snackbar from 'awesome-snackbar'

export function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, delay = 400) {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...args: Parameters<T>) => {
    clearTimeout(timer)

    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

interface SnackBarOptions {
  message: string
  timeout?: number
  position?: string
  actionText?: string
  onAction?: (() => void)
}
export class SnackBarMessage {
  error(options: SnackBarOptions) {
    const {
      message,
      timeout = 7000,
      actionText,
      onAction,
      position = 'bottom-right'
    } = options

    return new Snackbar(message, {
      timeout,
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
      },
      actionText,
      onAction
    })
  }
}