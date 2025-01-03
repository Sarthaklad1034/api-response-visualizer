export class ExportService {
    static isXMLString(str) {
        const trimmed = str.trim();
        return trimmed.startsWith('<?xml') || trimmed.startsWith('<');
    }

    static isJSONString(str) {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    }

    static async exportToJson(data) {
        try {
            let jsonData;

            // If data is already a string, check its format
            if (typeof data === 'string') {
                if (ExportService.isJSONString(data)) { // Changed from this.isJSONString
                    // If it's already JSON, parse and re-stringify to ensure proper formatting
                    jsonData = JSON.parse(data);
                } else if (ExportService.isXMLString(data)) { // Changed from this.isXMLString
                    // If it's XML, convert to JSON
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, 'text/xml');
                    jsonData = ExportService.xmlToJson(xmlDoc.documentElement); // Changed from this.xmlToJson
                } else {
                    throw new Error('Invalid input format');
                }
            } else {
                // If data is already an object, use it directly
                jsonData = data;
            }

            const jsonString = JSON.stringify(jsonData, null, 2);
            return {
                content: jsonString,
                filename: `export-${Date.now()}.json`,
                mimeType: 'application/json'
            };
        } catch (error) {
            throw new Error(`Failed to export as JSON: ${error.message}`);
        }
    }


    static xmlToJson(xml) {
        // Create the return object
        let obj = {};

        // Handle attributes
        if (xml.attributes && xml.attributes.length > 0) {
            obj['@attributes'] = {};
            for (let i = 0; i < xml.attributes.length; i++) {
                const attr = xml.attributes[i];
                obj['@attributes'][attr.nodeName] = attr.nodeValue;
            }
        }

        // Handle children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes[i];
                const nodeName = item.nodeName;

                // Handle text nodes
                if (item.nodeType === 3) { // Text node
                    const text = item.nodeValue.trim();
                    if (text) {
                        return text;
                    }
                    continue;
                }

                // Recursive call for nested elements
                const obj2 = this.xmlToJson(item);

                if (obj[nodeName] === undefined) {
                    obj[nodeName] = obj2;
                } else {
                    if (!Array.isArray(obj[nodeName])) {
                        obj[nodeName] = [obj[nodeName]];
                    }
                    obj[nodeName].push(obj2);
                }
            }
        }

        return obj;
    }

    static async exportToXml(data) {
        try {
            let jsonData;

            // If data is a string, check its format
            if (typeof data === 'string') {
                if (ExportService.isXMLString(data)) { // Changed from this.isXMLString
                    // If it's already XML, return it with proper formatting
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, 'text/xml');
                    const serializer = new XMLSerializer();
                    return {
                        content: ExportService.formatXml(serializer.serializeToString(xmlDoc)), // Changed from this.formatXml
                        filename: `export-${Date.now()}.xml`,
                        mimeType: 'application/xml'
                    };
                } else if (ExportService.isJSONString(data)) { // Changed from this.isJSONString
                    // If it's JSON, parse it
                    jsonData = JSON.parse(data);
                } else {
                    throw new Error('Invalid input format');
                }
            } else {
                // If data is already an object, use it directly
                jsonData = data;
            }

            // Convert JSON to XML
            const xmlString = ExportService.jsonToXml(jsonData); // Changed from this.jsonToXml
            return {
                content: `<?xml version="1.0" encoding="UTF-8"?>\n${ExportService.formatXml(xmlString)}`, // Changed from this.formatXml
                filename: `export-${Date.now()}.xml`,
                mimeType: 'application/xml'
            };
        } catch (error) {
            throw new Error(`Failed to export as XML: ${error.message}`);
        }
    }

    static jsonToXml(obj, nodeName = 'root') {
        if (typeof obj !== 'object' || obj === null) {
            return `<${nodeName}>${String(obj)}</${nodeName}>`;
        }

        let xml = `<${nodeName}>`;

        // Handle attributes
        if (obj['@attributes']) {
            const attrs = Object.entries(obj['@attributes'])
                .map(([key, value]) => `${key}="${value}"`)
                .join(' ');
            xml = `<${nodeName} ${attrs}>`;
            delete obj['@attributes'];
        }

        // Handle arrays
        if (Array.isArray(obj)) {
            xml = obj.map(item => ExportService.jsonToXml(item, 'item')).join(''); // Changed from this.jsonToXml
            return xml;
        }

        // Handle nested objects
        for (const [key, value] of Object.entries(obj)) {
            if (key !== '@attributes') {
                if (Array.isArray(value)) {
                    xml += value.map(item => ExportService.jsonToXml(item, key)).join(''); // Changed from this.jsonToXml
                } else {
                    xml += ExportService.jsonToXml(value, key); // Changed from this.jsonToXml
                }
            }
        }

        xml += `</${nodeName}>`;
        return xml;
    }

    static formatXml(xml) {
        let formatted = '';
        let indent = '';
        const tab = '  '; // 2 spaces
        xml.split(/>\s*</).forEach(node => {
            if (node.match(/^\/\w/)) {
                // Closing tag
                indent = indent.substring(tab.length);
            }
            formatted += indent + '<' + node + '>\r\n';
            if (node.match(/^<?\w[^>]*[^\/]$/)) {
                // Opening tag
                indent += tab;
            }
        });
        return formatted.substring(1, formatted.length - 3);
    }

    static async exportToPng(element) {
        try {
            const html2canvas = await
            import ('html2canvas').then(m => m.default);
            const canvas = await html2canvas(element);

            return new Promise((resolve, reject) => {
                try {
                    canvas.toBlob((blob) => {
                        resolve({
                            content: blob,
                            filename: `tree-view-${Date.now()}.png`,
                            mimeType: 'image/png'
                        });
                    }, 'image/png');
                } catch (error) {
                    reject(new Error(`Failed to create PNG: ${error.message}`));
                }
            });
        } catch (error) {
            throw new Error(`Failed to export as PNG: ${error.message}`);
        }
    }
}