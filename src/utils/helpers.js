// src/utils/helpers.js
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

export const truncateString = (str, maxLength = 50) => {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength)}...`;
};

export const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const cls = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

export const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const retryOperation = async(operation, retryCount = 3, delay = 1000) => {
    for (let i = 0; i < retryCount; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === retryCount - 1) throw error;
            await sleep(delay);
        }
    }
};