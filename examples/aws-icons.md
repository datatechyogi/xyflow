# AWS Architecture Diagramming with XYFlow

This guide explains how to add AWS service icons to XYFlow diagrams, run the example, and extend it into a full diagramming tool. A React implementation is available at `examples/react/src/examples/AwsArchitecture`.

## AWS Icons as Custom Nodes

1. Download the official AWS Architecture Icons and place the assets in your project (e.g., `src/icons/`).
2. Create a custom node component:

### React
```jsx
import { memo } from 'react';
import ec2 from '../icons/Amazon-EC2.svg';

function AwsNode({ data, selected }) {
  return (
    <div style={{ padding: 4, border: selected ? '1px solid #1a192b' : 0 }}>
      <img src={data.icon || ec2} alt={data.label} width={50} />
      <div style={{ textAlign: 'center' }}>{data.label}</div>
    </div>
  );
}

export default memo(AwsNode);
```

### Svelte
```svelte
<script lang="ts">
  export let data: { label: string; icon: string };
</script>

<div class:selected>
  <img src={data.icon} alt={data.label} width="50" />
  <div>{data.label}</div>
</div>

<style>
  div.selected { border: 1px solid #1a192b; }
  div { padding: 4px; text-align: center; }
</style>
```

3. Register the node type:
```jsx
import AwsNode from './nodes/AwsNode';
const nodeTypes = { aws: AwsNode };

<ReactFlow nodeTypes={nodeTypes} ... />
```

4. Instantiate nodes with icons:
```jsx
const initialNodes = [
  {
    id: 'ec2',
    type: 'aws',
    position: { x: 50, y: 100 },
    data: { label: 'Amazon EC2', icon: ec2 },
  },
];
```

## Running the Example

1. Create a React project: `npx create-vite@latest xyflow-demo -- --template react`.
2. Install XYFlow: `npm install @xyflow/react`.
3. Replace `src/App.jsx` with the sample component and import `@xyflow/react/dist/style.css`.
4. Run the dev server: `npm run dev` and open the printed URL.

For Svelte, use the Svelte template, install `@xyflow/svelte`, update `App.svelte`, and run `npm run dev`.

## Building a Diagramming Product

- Use XYFlow as the canvas and define node types for services, databases, etc.
- Create a palette or sidebar for drag-and-drop components.
- Implement persistence, export (PNG/SVG/JSON), and optional real-time collaboration.

