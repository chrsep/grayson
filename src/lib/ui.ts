export const handleInput = (handler: (value: string) => void) => {
  return (e: InputEvent): void => {
    handler((e.target as HTMLInputElement).value)
  }
}
