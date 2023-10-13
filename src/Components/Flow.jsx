import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodes,
  useEdges,
   updateEdge,
  useNodesState,
  useEdgesState,
  
  applyEdgeChanges, applyNodeChanges,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { DeleteOutlined } from "@ant-design/icons";
import IdleNode from "./IdleNode";

import Sidebar from "./Sidebar";

import "./Flow.css";


const nodeTypes = { idleNode: IdleNode };
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
    sourcePosition: "right",
    style: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      border: "1px solid black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "grab",
    },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {

  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );


  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

    const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const onDeleteNode = (nodeId) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    setNodes(updatedNodes);
  };


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
console.log(event)
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeStyle =
        type == "default" || type == "idleNode"
          ? {
            width: "127px",
            height: "49px",
              border: "1px solid #1a192b",
              borderRadius: "9px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab"
            }
          : {
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab",
            };
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition:"right",
        targetPosition:"left",
        data: { label: `${type == "default" ? "Idle" : "End"}` },
        style: nodeStyle,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onNodeClick={onNodesClick}
    deleteKeyCode={["Backspace","Delete"]}
    // onNodesDelete={}    // as needed
    // onEdgesDelete={}   // as needed
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;
