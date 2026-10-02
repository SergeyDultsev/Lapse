type tInputTextType = 'text' | 'email' | 'password' | 'url' | 'search'

export interface IInputBase {
    placeholder: string
    typeInput?: 'base' | 'auth' | 'search'
    type: tInputTextType
    className?: string
    required?: boolean
    name?: string
    value?: string | number
    onChange?: (name: string, value: string | number) => void
}