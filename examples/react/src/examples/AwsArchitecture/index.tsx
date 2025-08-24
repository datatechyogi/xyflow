import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

const ec2Url = 'https://d1.awsstatic.com/webteam/architecture-icons/64/Arch_Amazon-EC2_64.svg';

function AwsNode({ data, selected }: any) {
  return (
    <div style={{ padding: 4, border: selected ? '1px solid #1a192b' : 0 }}>
      <img src={data.icon || ec2Url} alt={data.label} width={50} />
      <div style={{ textAlign: 'center' }}>{data.label}</div>
    </div>
  );
}

const nodeTypes = { aws: AwsNode };

const initialNodes = [
  {
    id: 'ec2',
    type: 'aws',
    position: { x: 0, y: 0 },
    data: { label: 'Amazon EC2', icon: ec2Url },
  },
];

export default function AwsArchitecture() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = () => {
    const id = (nodes.length + 1).toString();
    setNodes((nds) =>
      nds.concat({
        id,
        type: 'aws',
        position: { x: Math.random() * 400, y: Math.random() * 200 },
        data: { label: `Service ${id}`, icon: ec2Url },
      })
    );
  };

  return (
    <div style={{ width: '100%', height: 500 }}>
      <button onClick={addNode} style={{ marginBottom: 8 }}>
        Add EC2 Node
      </button>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
