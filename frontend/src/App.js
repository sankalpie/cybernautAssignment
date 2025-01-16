import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import Sidebar from './components/Sidebar';
import UserForm from './components/UserForm';
import apiService from './services/apiService';
import './App.css';

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    apiService.getUsers().then((data) => {
      setUsers(data);
      const initialNodes = data.map((user) => ({
        id: user._id,
        type: 'default',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `${user.username} (${user.age} years)` },
      }));
      setNodes(initialNodes);
    });
  }, []);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="app">
      <Sidebar />
      <div className="react-flow-wrapper">
        <ReactFlow
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
      <UserForm
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setNodes={setNodes}
      />
    </div>
  );
};

export default App;
