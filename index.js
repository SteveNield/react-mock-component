import React from 'react';

const renderType = {
  'boolean': val => {
    return val ? 'true' : 'false';
  },
  'object': val => {
    return JSON.stringify(val);
  },
  'function': () => {
    return 'function';
  }
};

const formatValue = val => {
  if (val === null) {
    return 'null';
  }

  const type = typeof val;

  if (!renderType.hasOwnProperty(type)) {
    return val;
  }

  return renderType[type](val);
};

export default MockComponent = ({children, ...props}) => {
  return (
    <div data-testid={props['data-testid']}>
      {
        Object.keys(props).map(k => {
          return (
            <div 
              data-testid={`mock-render-${k}`}
              key={k}>{formatValue(props[k])}</div>);
        })
      }
      {children}
    </div>
  );
};

const UNIQUE_VALUE = '79458890-a89e-11e9-b56a-e997784d53db';

export const constructMockComponentWithHandler = ({
  mockChangePayload,
  customEvents = []
} = {}) => {
  return ({
    onClick,
    onChange,
    ...props
  }) => {
    if (!props.hasOwnProperty('data-testid')) {
      throw new Error('data-testid is required');
    }

    return (
      <div>
        <MockComponent {...props} />
        <div
          data-testid={`click-${props['data-testid']}`}
          onClick={onClick}></div>
        <input
          data-testid={`change-${props['data-testid']}`}
          onChange={() => {
            onChange(mockChangePayload)
          }}
          value={UNIQUE_VALUE} />
        {
          customEvents.map(e => {
            return (
              <div
                key={`key-${e.label}`}
                data-testid={`custom-${e.label}-${props['data-testid']}`}
                onClick={() => props[e.label](e.payload)}></div>
            );
          })
        }
      </div>
    )
  };
}
