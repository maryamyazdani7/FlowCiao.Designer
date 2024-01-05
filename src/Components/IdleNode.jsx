import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Button, Dropdown, Space } from "antd";
import exitActionImg from "../Assets/exit-action.svg";
import entryActionImg from "../Assets/entry-action.svg";
import dotImg from "../Assets/dot.svg";
import plusImg from "../Assets/circle-plus.svg";
import threeDotImg from "../Assets/circle-threedot.svg";
import trashImg from "../Assets/trash.svg";

const handleStyle = { left: 10 };

const IdleNode = (node) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const [isHoverNode, setIsHoverNpde] = useState(false);

  const onIdleNodeHoverFunc = () => {
    setIsHoverNpde(true);
  };

  const onIdleNodeLoseHoverFunc = () => {
    setIsHoverNpde(false);
  };

  const onAddIdleNodeClick = () => {
    node.data.AddIdleNodeFunc(node);
  };

  const [isEntryActionSelected, setIsEntryActionSelected] = useState(false);
  const [isExitActionSelected, setIsExitActionSelected] = useState(false);
  const items = [
    {
      key: "entryAction",
      label: (
        <span>
          <img src={entryActionImg} />
          <span
            style={{
              marginLeft: 4,
              color: "#393939",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            On Entry
          </span>
        </span>
      ),
      disabled: isEntryActionSelected,
    },
    {
      type: "divider",
    },
    {
      key: "exitAction",
      label: (
        <span>
          <img src={exitActionImg} />
          <span
            style={{
              marginLeft: 4,
              color: "#393939",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            On Exit
          </span>
        </span>
      ),
      disabled: isExitActionSelected,
    },
  ];

  const chooseActionHandler = ( {key}) => {
    console.log("111", key);
    if (key == "entryAction") {
      setIsEntryActionSelected(true);
    } else if (key == "exitAction") {
      setIsExitActionSelected(true);
    }
  };
  const removeEntryActionHandler = () => {
    setIsEntryActionSelected(false);
  };
  const removeExitActionHandler = () => {
    setIsExitActionSelected(false);
  };

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={onIdleNodeHoverFunc}
      onMouseLeave={onIdleNodeLoseHoverFunc}
    >
      <button
        id="addIdleNode"
        style={{
          width: 4,
          height: 4,
          position: "absolute",
          right: "-10px",
          top: "30%",
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={onAddIdleNodeClick}
      >
        {isHoverNode ? <img src={plusImg} /> : <img src={dotImg} />}
      </button>
      <Dropdown
        menu={{
          items,
          onClick: chooseActionHandler ,
        }}
        placement="bottomRight"
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        >
          <img src={threeDotImg} />
        </button>
      </Dropdown>
      <input
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          textAlign: "center",
          margin: "14px 0",
        }}
        type="text"
        placeholder="Pending"
         defaultValue={"Pending"}
      />
      {(isEntryActionSelected || isExitActionSelected) && (
        <div style={{ width: "100%", borderTop: "1px dashed #CACACA" }}>
          <span
            style={{
              color: "#9C9C9C",
              fontWeight: "500",
              fontSize: "8px",
              paddingLeft: "8px",
            }}
          >
            Actvities
          </span>
          {isEntryActionSelected && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                padding: "4px 8px 8px",
              }}
            >
              <img
                src={entryActionImg}
                style={{
                  filter:
                    "invert(39%) sepia(55%) saturate(4651%) hue-rotate(210deg) brightness(94%) contrast(94%)",
                }}
              />
              <input
                style={{
                  color: "#393939",
                  fontsize: "10px",
                  fontweight: "400",
                  flex: 1,
                  width: " 100%",
                  border: "unset",
                  outline: "unset",
                  textAlign: "center",
                  margin: "0 4px"
                }}
                placeholder="Custom Act"
                defaultValue={"Custom Act"}
              />
              <button
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  padding: 0,
                }}
                onClick={removeEntryActionHandler}
              >
                <img src={trashImg} width={8} />
              </button>
            </div>
          )}

          {isExitActionSelected && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                padding: "4px 8px 8px",
              }}
            >
              <img
                src={exitActionImg}
                style={{
                  filter:
                    "invert(39%) sepia(55%) saturate(4651%) hue-rotate(210deg) brightness(94%) contrast(94%)",
                }}
              />
              <input
                style={{
                  color: "#393939",
                  fontsize: "10px",
                  fontweight: "400",
                  flex: 1,
                  width: " 100%",
                  border: "unset",
                  outline: "unset",
                  textAlign: "center",
                  margin: "0 4px"
                }}
                placeholder="Custom Act"
                defaultValue={"Custom Act"}
              />
              <button
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  padding: 0,
                }}
                onClick={removeExitActionHandler}
              >
                <img src={trashImg} width={8} />
              </button>
            </div>
          )}
        </div>
      )}
      <Handle
        type="target"
        isConnectable={true}
        position={Position.Left}
        style={{ background: "transparent", border: "none" }}
        id="a1"
      />
      <Handle
        type="source"
        isConnectable={true}
        style={{ background: "transparent", border: "none" }}
        position={Position.Right}
        id="a2"
      />
    </div>
  );
};
export default IdleNode;
