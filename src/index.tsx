import * as ReactDOM from 'react-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Default as Example } from './example';
//
// You can edit this example in "example.tsx".
//
ReactDOM.render(
    <FluentProvider theme={webLightTheme}>
        <Example />
    </FluentProvider>,
    document.getElementById('root'),
);