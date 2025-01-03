// src/hooks/useTreeGenerator.js
import { useState, useCallback } from 'react';

export const useTreeGenerator = () => {
    const [treeData, setTreeData] = useState(null);

    const generateTree = useCallback((data) => {
        const processNode = (value, key = 'root') => {
            if (Array.isArray(value)) {
                return {
                    key,
                    children: value.map((item, index) => processNode(item, `[${index}]`))
                };
            } else if (typeof value === 'object' && value !== null) {
                return {
                    key,
                    children: Object.entries(value).map(([k, v]) => processNode(v, k))
                };
            } else {
                return { key, value };
            }
        };

        const tree = processNode(data);
        setTreeData(tree);
        return tree;
    }, []);

    return { generateTree, treeData };
};