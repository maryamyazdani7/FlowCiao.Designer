import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Button, Dropdown, Space } from "antd";
import dotImg from "../Assets/dot.svg"
import plusImg from "../Assets/plus.svg"

const handleStyle = { left: 10 };

const StartNode = (node) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [isHoverNode, setIsHoverNpde] = useState(false);

  const onNodeHoverFunc = () => {
    setIsHoverNpde(true);
  };

  const onNodeLoseHoverFunc = () => {
    setIsHoverNpde(false);
  };

  const onAddIdleNodeClick = () => {
    node.data.AddIdleNodeFunc(node);
  }

  return (
    <div style={{borderRadius: "50%",border: "2px solid #3C3C3C", width: 23, height: 23}} onMouseEnter={onNodeHoverFunc}
    onMouseLeave={onNodeLoseHoverFunc}
  >
    <button
      id="addIdleNode"
      style={{
        width: 4,
        height: 4,
        position: "absolute",
        right: "-10px",
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer"
      }}
      onClick={onAddIdleNodeClick}
    >
      {isHoverNode ? (
        <img src={plusImg}/>
      ) : (
        <img src={dotImg}/>
      )}
    </button>
      <Handle
        type="source"
        isConnectable={true}
        style={{ background: "transparent", border: "none" }}
        position={Position.Right}
        id="s1"
      />
    </div>
  );
};
export default StartNode;
