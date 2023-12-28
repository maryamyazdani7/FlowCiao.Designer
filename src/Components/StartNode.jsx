import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Button, Dropdown, Space } from "antd";

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
    console.log("1111", node.data.test)
    node.data.AddIdleNodeFunc();
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <circle cx="5" cy="5" r="5" fill="#2F6EE9" />
          <path
            d="M5 3L5 7"
            stroke="white"
            stroke-width="0.75"
            stroke-linecap="round"
          />
          <path
            d="M3 5L7 5"
            stroke="white"
            stroke-width="0.75"
            stroke-linecap="round"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="4"
          viewBox="0 0 4 4"
          fill="none"
        >
          <circle cx="2" cy="2" r="2" fill="#2F6EE9" />
        </svg>
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
