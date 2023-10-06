import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { DeleteOutlined } from "@ant-design/icons";

import Sidebar from "./Sidebar";

import "./Flow.css";

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
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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
        type == "default"
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

  const onNodesClick = (nodeId) => {
    console.log("hiiii");
    // setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  };

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
            onNodeClick={onNodesClick}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
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
