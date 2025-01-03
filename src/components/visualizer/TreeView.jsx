import React, { useMemo } from 'react';
import { ChevronRight, ChevronDown, Copy, File, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TreeNode = ({ 
  node, 
  level = 0, 
  onCopy, 
  searchTerm,
  expandedNodes,
  onToggleNode,
  path = '' 
}) => {
  const currentPath = path ? `${path}.${node.key}` : node.key;
  const isExpanded = expandedNodes.has(currentPath);
  const hasChildren = node.children && node.children.length > 0;
  
  const highlights = useMemo(() => {
    if (!searchTerm) return { isMatch: false, matches: [] };
    const nodeString = JSON.stringify(node);
    const isMatch = nodeString.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matches = [];
    if (node.key.toLowerCase().includes(searchTerm.toLowerCase())) {
      matches.push('key');
    }
    if (!hasChildren && String(node.value).toLowerCase().includes(searchTerm.toLowerCase())) {
      matches.push('value');
    }
    
    return { isMatch, matches };
  }, [node, searchTerm, hasChildren]);

  const handleCopy = (value) => {
    onCopy(JSON.stringify(value, null, 2));
  };

  const getHighlightedText = (text, highlight, type) => {
    if (!highlight || !highlights.matches.includes(type)) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div className={`
      transition-all duration-200 ease-in-out
      ${highlights.isMatch ? 'bg-yellow-50 shadow-sm rounded-md my-2' : 'my-1'}
    `}>
      <div className={`
        flex items-center py-2 px-3 rounded-md
        hover:bg-gray-50 transition-colors duration-150
        ${level === 0 ? 'ml-0' : `ml-${Math.min(level * 6, 12)}`}
      `}>
        <Button
          variant="ghost"
          size="sm"
          className={`p-0 h-6 w-6 hover:bg-gray-100 mr-2 ${!hasChildren && 'invisible'}`}
          onClick={() => onToggleNode(currentPath)}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </Button>
        
        <span className="flex items-center gap-3">
          {hasChildren ? (
            <Folder className="h-4 w-4 text-blue-500 shrink-0" />
          ) : (
            <File className="h-4 w-4 text-gray-400 shrink-0" />
          )}
          <span className="font-medium text-gray-700">
            {getHighlightedText(node.key, searchTerm, 'key')}:
          </span>
          {!hasChildren && (
            <>
              <span className="text-gray-600 px-2">
                {getHighlightedText(String(node.value), searchTerm, 'value')}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 p-1 h-6 w-6 hover:bg-gray-100"
                onClick={() => handleCopy(node.value)}
                title="Copy value"
              >
                <Copy className="h-3 w-3 text-gray-500" />
              </Button>
            </>
          )}
          {hasChildren && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {node.children.length} items
            </Badge>
          )}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="border-l-2 border-gray-100 ml-6 pl-4 mt-1 mb-2">
          {node.children.map((child, index) => (
            <TreeNode
              key={`${currentPath}-${child.key}-${index}`}
              node={child}
              level={level + 1}
              onCopy={onCopy}
              searchTerm={searchTerm}
              expandedNodes={expandedNodes}
              onToggleNode={onToggleNode}
              path={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ 
  data, 
  onCopy, 
  searchTerm,
  expandedNodes,
  onToggleNode 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 overflow-auto max-h-[600px] border border-gray-200 shadow-sm">
      <TreeNode 
        node={data} 
        onCopy={onCopy}
        searchTerm={searchTerm}
        expandedNodes={expandedNodes}
        onToggleNode={onToggleNode}
      />
    </div>
  );
};

export default TreeView;