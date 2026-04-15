export const toQueryString = (obj?: Record<string, unknown>): string => {
    if (!obj) return '';

    const params = new URLSearchParams();
    
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined) {
            params.append(key, String(value));
        }
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
};