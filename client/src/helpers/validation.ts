export const isEmail = (value: string): boolean => {
    // return !(value && !/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,255}$/i.test(value));
    return !(value && !/[A-Z0-9._-]{1,64}@(?:[A-Z0-9.-]+\.){1,125}[A-Z]{2,63}$/i.test(value));
};

export const isName = (name: string, len: number): boolean => name.length >= len;

export const comparePass = (pass1: string, pass2: string): boolean => pass1 === pass2;

export const compareChangeField = (oldValue: string, newValue: string): string => {
    if (newValue !== oldValue) return newValue;
    return ''
};

