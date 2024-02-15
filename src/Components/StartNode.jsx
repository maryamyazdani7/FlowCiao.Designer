import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Button, Dropdown, Space } from "antd";
import dotImg from "../Assets/dot.svg"
import plusImg from "../Assets/circle-plus.svg"

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
    <div className="start-node" onMouseEnter={onNodeHoverFunc}
    onMouseLeave={onNodeLoseHoverFunc}
  >
    <button
      id="addIdleNode"
      className="add-node-btn"
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
        className="node-handle"
        position={Position.Right}
        id="s1"
      />
    </div>
  );
};
export default StartNode;
