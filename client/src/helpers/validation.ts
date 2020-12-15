export const isEmail = (value: string): boolean => {
    return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value));
};

export const isName = (name: string, len: number): boolean => name.length >= len;

export const comparePass = (pass1: string, pass2: string): boolean => pass1 === pass2;

