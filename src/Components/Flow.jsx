import React, { useState, useRef, useCallback,forwardRef ,useImperativeHandle, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodes,
  useEdges,
  updateEdge,
  useNodesState,
  useEdgesState,
  useStoreState,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { DeleteOutlined } from "@ant-design/icons";
import IdleNode from "./IdleNode";
import StartNode from "./StartNode";

import Sidebar from "./Sidebar";

import "./Flow.css";
import CustomEdge from "./CustomEdge";

const nodeTypes = { idleNode: IdleNode, StartNode: StartNode };


const edgeTypes = { 'custom-edge': CustomEdge}

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = forwardRef((props, ref) => {

  const onAddIdleNodeFunc = () => {
    console.log("i am here");
  }
const initialNodes = [
  {
    id: "1",
    type: "StartNode",
    // data: { label: "Start" },
    position: { x: 250, y: 5 },
    data:{
        test: "ffff",
        AddIdleNodeFunc: onAddIdleNodeFunc
    }
    // sourcePosition: "right",
    // style: {
    //   width: "70px",
    //   height: "70px",
    //   borderRadius: "50%",
    //   border: "1px solid black",
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   cursor: "grab",
    // },
  },
];
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useImperativeHandle(ref, () => ({
    exportFlowAsJSON,
  }));

  const exportFlowAsJSON = () => {
    const flowData = {
      elements: [...nodes, ...edges],
    };
    const jsonFlow = JSON.stringify(flowData, null);
    console.log('Exported JSON:', jsonFlow);
  };
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
    
    (connection) =>{
      const edge = { ...connection, type: 'custom-edge' };
      
      setEdges((eds) => addEdge(edge, eds));

    } ,
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
      console.log(event);
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
              cursor: "grab",
            }
          : {
              width: "110px",
              minHeight: "48px",
              border: "1px solid #C8C8C8", 
              borderTop: "3px solid #2F6EE9", 
              borderRadius:4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "grab",
            };
      const newNode = {
        id: getId(),
        type,
        position,
        sourcePosition: "right",
        targetPosition: "left",
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
            deleteKeyCode={["Backspace", "Delete"]}
            // onNodesDelete={}    // as needed
            // onEdgesDelete={}   // as needed
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
});

export default Flow;
