import React, { createContext, useContext, useReducer } from 'react';

const VisualizerContext = createContext();

const initialState = {
  inputData: null,
  parsedData: null,
  inputType: 'json',
  error: null,
  searchTerm: '',
  expandedNodes: new Set(),
};

const visualizerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT_DATA':
      return {
        ...state,
        inputData: action.payload,
        error: null,
      };
    case 'SET_PARSED_DATA':
      return {
        ...state,
        parsedData: action.payload,
        error: null,
      };
    case 'SET_INPUT_TYPE':
      return {
        ...state,
        inputType: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        parsedData: null,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'TOGGLE_NODE':
      const newExpandedNodes = new Set(state.expandedNodes);
      if (newExpandedNodes.has(action.payload)) {
        newExpandedNodes.delete(action.payload);
      } else {
        newExpandedNodes.add(action.payload);
      }
      return {
        ...state,
        expandedNodes: newExpandedNodes,
      };
    case 'EXPAND_ALL':
      return {
        ...state,
        expandedNodes: new Set(action.payload),
      };
    case 'COLLAPSE_ALL':
      return {
        ...state,
        expandedNodes: new Set(),
      };
    default:
      return state;
  }
};

export const VisualizerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visualizerReducer, initialState);

  const value = {
    state,
    dispatch,
    actions: {
      setInputData: (data) => dispatch({ type: 'SET_INPUT_DATA', payload: data }),
      setParsedData: (data) => dispatch({ type: 'SET_PARSED_DATA', payload: data }),
      setInputType: (type) => dispatch({ type: 'SET_INPUT_TYPE', payload: type }),
      setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
      setSearchTerm: (term) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
      toggleNode: (nodeId) => dispatch({ type: 'TOGGLE_NODE', payload: nodeId }),
      expandAll: (nodeIds) => dispatch({ type: 'EXPAND_ALL', payload: nodeIds }),
      collapseAll: () => dispatch({ type: 'COLLAPSE_ALL' }),
    },
  };

  return (
    <VisualizerContext.Provider value={value}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) {
    throw new Error('useVisualizer must be used within a VisualizerProvider');
  }
  return context;
};