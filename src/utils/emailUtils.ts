// Email AutoComplete utilities
export const EMAIL_SUFFIXES = [
    'qq.com',
    '163.com',
    'gmail.com',
    'icloud.com',
    'outlook.com',
    'yeah.com',
    'proton.me',
    '139.com',
    'sina.com',
    '126.com'
];

export const getEmailOptions = (value: string): { value: string }[] => {
    if (!value || value.includes('@')) {
        return [];
    }
    return EMAIL_SUFFIXES.map((suffix) => ({ value: `${value}@${suffix}` }));
};
