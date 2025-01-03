import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTheme } from '@/components/ui/theme-context';

const CodeInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState('json');
  const { theme } = useTheme();

  const handleSubmit = () => {
    onSubmit({ type: inputType, data: input });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <Tabs defaultValue="json" className="w-full mb-4">
          <TabsList className={`grid w-full grid-cols-2 ${
            theme === 'dark' ? 'bg-gray-800' : ''
          }`}>
            <TabsTrigger 
              value="json" 
              onClick={() => setInputType('json')}
              className={theme === 'dark' ? 'data-[state=active]:bg-gray-700' : ''}
            >
              JSON
            </TabsTrigger>
            <TabsTrigger 
              value="xml" 
              onClick={() => setInputType('xml')}
              className={theme === 'dark' ? 'data-[state=active]:bg-gray-700' : ''}
            >
              XML
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-64 p-4 font-mono text-sm border rounded-md resize-none focus:outline-none focus:ring-2 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-gray-600'
                : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
            }`}
            placeholder={`Paste your ${inputType.toUpperCase()} here...`}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleSubmit} 
            className={`px-6 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                : ''
            }`}
          >
            Visualize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeInput;