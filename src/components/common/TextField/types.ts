export interface ITextFieldButtonEventData {
    value: string;
    focus: () => void;
}

export interface ITextFieldButton {
    icon: string;
    iconColor?: string;
    backgroundColor?: string;
    onClick?: (e: ITextFieldButtonEventData) => any;
}
