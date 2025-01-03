import React from 'react';
import { Download, ClipboardCopy } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ExportService } from '../../services/export/exportService';
import { downloadFile } from '../../utils/helpers';
import { useTheme } from '@/components/ui/theme-context';

const ExportOptions = ({ data, onCopyAll, treeRef }) => {
    const { theme } = useTheme();
    const exportFormats = [
        { label: 'JSON', value: 'json', handler: ExportService.exportToJson },
        { label: 'XML', value: 'xml', handler: ExportService.exportToXml },
        { label: 'Tree View (PNG)', value: 'png', handler: () => ExportService.exportToPng(treeRef.current) }
    ];

    const handleExport = async (format) => {
        try {
            const exportFormat = exportFormats.find(f => f.value === format);
            if (!exportFormat) throw new Error('Unsupported format');

            const result = await exportFormat.handler(data);
            downloadFile(result.content, result.filename, result.mimeType);
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                onClick={onCopyAll}
                className={`flex items-center gap-2 ${
                    theme === 'dark' 
                        ? 'border-gray-700 bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-gray-100'
                        : ''
                }`}
            >
                <ClipboardCopy className="h-4 w-4" />
                Copy All
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="default" 
                        className={`flex items-center gap-2 ${
                            theme === 'dark' 
                                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                                : ''
                        }`}
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}
                >
                    {exportFormats.map((format) => (
                        <DropdownMenuItem
                            key={format.value}
                            onClick={() => handleExport(format.value)}
                            className={theme === 'dark' 
                                ? 'text-gray-100 focus:bg-gray-700 focus:text-gray-100' 
                                : ''
                            }
                        >
                            {format.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ExportOptions;