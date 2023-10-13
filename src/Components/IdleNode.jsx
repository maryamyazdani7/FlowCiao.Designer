import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

const IdleNode = () => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <p>Idle</p>
      <Handle
        type="target"
        isConnectable={true}
        position={Position.Top}
        style={{ left: "25%"}}
        id="a1"
      />
      <Handle
        type="source"
        isConnectable={true}
        style={{ left: "75%", background: "blue"}}
        position={Position.Top}
        id="a2"
      />
      <Handle
        type="target"
        isConnectable={true}
        position={Position.Bottom}
        style={{ left: "25%" }}
        id="b1"
      />
      <Handle
        type="source"
        isConnectable={true}
        style={{ left: "75%", background: "blue" }}
        position={Position.Bottom}
        id="b2"
      />

      <Handle
        type="target"
        isConnectable={true}
        position={Position.Left}
        style={{ top: "25%"}}
        id="c1"
      />
      <Handle
        type="source"
        isConnectable={true}
        style={{ top: "75%" , background: "blue"}}
        position={Position.Left}
        id="c2"
      />

      <Handle
        type="target"
        isConnectable={true}
        position={Position.Right}
        style={{ top: "25%"}}
        id="d1"
      />
      <Handle
        type="source"
        isConnectable={true}
        style={{ top: "75%", background: "blue" }}
        position={Position.Right}
        id="d2"
      />
    </>
  );
};
export default IdleNode;
