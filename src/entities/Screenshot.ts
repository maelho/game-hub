export interface Screenshot {
  readonly id: number
  image: string
  width: number
  height: number
  is_deleted?: boolean
}

export interface ScreenshotDetails extends Screenshot {
  hidden?: boolean
}
