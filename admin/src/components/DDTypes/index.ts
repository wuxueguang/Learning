export * from './types';
import DDString from "./elements/DDString";
import { DDTypes, Type } from './types';
import DDNumber from './elements/DDNumber';
import DDPassword from './elements/DDPassword';
import DDSwitch from './elements/DDSwitch';
import DDCheckbox from './elements/DDCheckbox';

export function DDSwitchTypes<T extends DDTypes.BaseT>(type: DDTypes.DDSupportTypes | DDTypes.DDUnsupportTypes):
Type<DDTypes.DDElement<T>> {
    switch (type) {
        case "boolean":
        case "switch":
            return DDSwitch;
        case "password":
            return DDPassword;
        case "float":
        case "integer":
        case "number":
            return DDNumber;
        case "string":
            return DDString;
        case "checkbox":
            return DDCheckbox;
        default:
            console.warn(`Unsupported Type Detected ${type}. fallback to string`);
            return DDString;
    }
}