// import React, { useState } from 'react';
// import { useTheme } from '../components/ui/theme-context';
// import CodeInput from '../components/visualizer/CodeInput';
// import TreeView from '../components/visualizer/TreeView';
// import SearchBar from '../components/visualizer/SearchBar';
// import ExportOptions from '../components/visualizer/ExportOptions';
// import { useJsonParser } from '../hooks/useJsonParser';
// import { useXmlParser } from '../hooks/useXmlParser';
// import { useClipboard } from '../hooks/useClipboard';

// const Visualizer = () => {
//   const [parsedData, setParsedData] = useState(null);
//   const [error, setError] = useState(null);
//   const { theme } = useTheme();
//   const { parse: parseJson } = useJsonParser();
//   const { parseXml } = useXmlParser();
//   const { copyToClipboard } = useClipboard();

//   const handleSubmit = ({ type, data }) => {
//     setError(null);
//     try {
//       const result = type === 'json' ? parseJson(data) : parseXml(data);
//       if (result) {
//         setParsedData(result);
//       }
//     } catch (err) {
//       setError(err.message);
//       setParsedData(null);
//     }
//   };

//   const handleSearch = (searchTerm) => {
//     // Implement search logic
//   };

//   const handleExport = (format) => {
//     // Implement export logic
//   };

//   const handleCopy = (value) => {
//     copyToClipboard(value);
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">API Response Visualizer</h1>
//         {parsedData && (
//           <div className="flex gap-4">
//             <SearchBar onSearch={handleSearch} />
//             <ExportOptions onExport={handleExport} onCopyAll={() => handleCopy(parsedData)} />
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <CodeInput onSubmit={handleSubmit} />
        
//         {error && (
//           <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//             {error}
//           </div>
//         )}
        
//         {parsedData && (
//           <TreeView data={parsedData} onCopy={handleCopy} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Visualizer;
import React, { useRef } from 'react';
import { useTheme } from '../components/ui/theme-context';
import CodeInput from '../components/visualizer/CodeInput';
import TreeView from '../components/visualizer/TreeView';
import SearchBar from '../components/visualizer/SearchBar';
import ExportOptions from '../components/visualizer/ExportOptions';
import { useJsonParser } from '../hooks/useJsonParser';
import { useXmlParser } from '../hooks/useXmlParser';
import { useClipboard } from '../hooks/useClipboard';
import { useTreeGenerator } from '../hooks/useTreeGenerator';
import { useVisualizer } from '../context/VisualizerContext';

const Visualizer = () => {
  const treeRef = useRef(null);
  const { theme } = useTheme();
  const { parse: parseJson } = useJsonParser();
  const { parse: parseXml } = useXmlParser();
  const { copyToClipboard } = useClipboard();
  const { generateTree } = useTreeGenerator();
  const { state, actions } = useVisualizer();

  const handleSubmit = ({ type, data }) => {
    actions.setError(null);
    try {
      const parser = type === 'json' ? parseJson : parseXml;
      const result = parser(data);
      
      if (result && !result.error) {
        const treeData = generateTree(result.data);
        actions.setInputData(data);
        actions.setParsedData(treeData);
      } else if (result.error) {
        actions.setError(result.error);
      }
    } catch (err) {
      actions.setError(err.message);
    }
  };

  const handleSearch = (term) => {
    actions.setSearchTerm(term);
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            API Response Visualizer
          </h1>
          {state.parsedData && (
            <div className="flex gap-4">
              <SearchBar 
                onSearch={handleSearch}
                className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              />
              <ExportOptions 
                data={state.inputData}
                onCopyAll={() => copyToClipboard(state.inputData)}
                treeRef={treeRef}
                className={theme === 'dark' 
                  ? 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
                }
                buttonClassName={theme === 'dark'
                  ? 'text-gray-100 hover:bg-gray-700 focus:ring-gray-700'
                  : 'text-gray-900 hover:bg-gray-100 focus:ring-gray-200'
                }
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border`}>
            <CodeInput 
              onSubmit={handleSubmit}
              className={theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-gray-600 focus:ring-gray-700' 
                : 'bg-white border-gray-200 text-gray-900 focus:border-gray-300 focus:ring-gray-200'
              }
              textareaClassName={theme === 'dark'
                ? 'bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700 focus:border-gray-600'
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200 focus:border-gray-300'
              }
            />
          </div>
          
          {state.error && (
            <div className={`p-4 rounded-lg ${
              theme === 'dark'
                ? 'bg-red-900/50 border-red-800 text-red-200'
                : 'bg-red-50 border-red-200 text-red-600'
            } border`}>
              {state.error}
            </div>
          )}
          
          {state.parsedData && (
            <div ref={treeRef} className={`p-4 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } border`}>
              <TreeView 
                data={state.parsedData} 
                onCopy={copyToClipboard}
                searchTerm={state.searchTerm}
                expandedNodes={state.expandedNodes}
                onToggleNode={actions.toggleNode}
                className={theme === 'dark' 
                  ? 'text-gray-100' 
                  : 'text-gray-900'
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualizer;