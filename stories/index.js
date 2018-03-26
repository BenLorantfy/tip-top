import React from 'react';
import Tooltip from '../src';
import { storiesOf } from '@storybook/react';

// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// import { Button, Welcome } from '@storybook/react/demo';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Tooltip', module).add('open', () => 
  <div style={{ backgroundColor: 'green', padding: '50px', width: '2000px' }}>
    <Tooltip content="Don't click this!!" open>
      <span style={{ backgroundColor: 'blue' }}>sdflmk</span>
    </Tooltip>
  </div>
);
