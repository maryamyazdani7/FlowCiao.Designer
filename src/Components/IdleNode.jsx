import { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";
import { Button, Dropdown, Space } from "antd";

const handleStyle = { left: 10 };
const items = [
  {
    key: "1",
    label: (
      <button
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
          >
            <path
              d="M4.5 1V1.63636"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.5 7.36364V8"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.02441 2.02455L2.47623 2.47637"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.52344 6.52363L6.97526 6.97545"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 4.5H1.63636"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.36377 4.5H8.00013"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.02441 6.97545L2.47623 6.52363"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.52344 2.47637L6.97526 2.02455"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.315 5.05412L12.3999 6.04019L12.3999 1.92872C12.3999 1.81502 12.3578 1.70597 12.2829 1.62557C12.208 1.54517 12.1063 1.5 12.0003 1.5C11.8944 1.5 11.7927 1.54517 11.7178 1.62557C11.6428 1.70597 11.6007 1.81502 11.6007 1.92872L11.6007 6.04019L10.6856 5.05412C10.6485 5.01394 10.6043 4.98204 10.5556 4.96028C10.5069 4.93851 10.4547 4.92731 10.4019 4.92731C10.3492 4.92731 10.2969 4.93851 10.2482 4.96028C10.1995 4.98204 10.1554 5.01394 10.1182 5.05412C10.0807 5.09398 10.051 5.1414 10.0307 5.19364C10.0104 5.24588 10 5.30192 10 5.35852C10 5.41511 10.0104 5.47115 10.0307 5.52339C10.051 5.57564 10.0807 5.62306 10.1182 5.66291L11.7166 7.37781C11.7546 7.41684 11.7994 7.44744 11.8485 7.46784C11.9458 7.51072 12.0549 7.51072 12.1522 7.46784C12.2012 7.44744 12.2461 7.41684 12.2841 7.37781L13.8825 5.66291C13.9197 5.62294 13.9493 5.57548 13.9695 5.52325C13.9896 5.47103 14 5.41505 14 5.35852C14 5.30199 13.9896 5.24601 13.9695 5.19378C13.9493 5.14155 13.9197 5.0941 13.8825 5.05412C13.8452 5.01415 13.801 4.98244 13.7523 4.96081C13.7036 4.93917 13.6515 4.92804 13.5988 4.92804C13.5461 4.92804 13.4939 4.93917 13.4452 4.96081C13.3965 4.98244 13.3523 5.01415 13.315 5.05412Z"
              fill="#393939"
            />
            <circle cx="4.5" cy="4.5" r="0.5" fill="#393939" />
          </svg>
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
      </button>
    ),
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: (
      <button
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
          >
            <path
              d="M10.685 3.94588L11.6001 2.95981V7.07128C11.6001 7.18498 11.6422 7.29403 11.7171 7.37443C11.792 7.45483 11.8937 7.5 11.9997 7.5C12.1056 7.5 12.2073 7.45483 12.2822 7.37443C12.3572 7.29403 12.3993 7.18498 12.3993 7.07128V2.95981L13.3144 3.94588C13.3515 3.98606 13.3957 4.01796 13.4444 4.03972C13.4931 4.06149 13.5453 4.07269 13.5981 4.07269C13.6508 4.07269 13.7031 4.06149 13.7518 4.03972C13.8005 4.01796 13.8446 3.98606 13.8818 3.94588C13.9193 3.90602 13.949 3.8586 13.9693 3.80636C13.9896 3.75412 14 3.69808 14 3.64148C14 3.58489 13.9896 3.52885 13.9693 3.47661C13.949 3.42436 13.9193 3.37694 13.8818 3.33709L12.2834 1.62219C12.2454 1.58316 12.2006 1.55256 12.1515 1.53216C12.0542 1.48928 11.9451 1.48928 11.8478 1.53216C11.7988 1.55256 11.7539 1.58316 11.7159 1.62219L10.1175 3.33709C10.0803 3.37706 10.0507 3.42452 10.0305 3.47675C10.0104 3.52897 10 3.58495 10 3.64148C10 3.69801 10.0104 3.75399 10.0305 3.80622C10.0507 3.85845 10.0803 3.9059 10.1175 3.94588C10.1548 3.98585 10.199 4.01756 10.2477 4.03919C10.2964 4.06083 10.3485 4.07196 10.4012 4.07196C10.4539 4.07196 10.5061 4.06083 10.5548 4.03919C10.6035 4.01756 10.6477 3.98585 10.685 3.94588Z"
              fill="#393939"
            />
            <path
              d="M4.5 1V1.63636"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.5 7.36364V8"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.02441 2.02455L2.47623 2.47636"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.52344 6.52363L6.97526 6.97545"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 4.5H1.63636"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.36377 4.5H8.00013"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.02441 6.97545L2.47623 6.52363"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.52344 2.47636L6.97526 2.02455"
              stroke="#393939"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="4.5" cy="4.5" r="0.5" fill="#393939" />
          </svg>
          <span style={{ marginLeft: 4 }}>On Exit</span>
        </span>
      </button>
    ),
  },
];
const IdleNode = () => {
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
    console.log("1111")
  }

  return (
    <div
      // style={{
      //   border: "1px solid #C8C8C8",
      //   borderTop: "3px solid #2F6EE9",
      //   borderRadius: 4,
      // }}
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
      <Dropdown
        menu={{
          items,
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="5" fill="#DADADA" />
            <circle cx="3" cy="5" r="0.5" fill="#393939" />
            <circle cx="5" cy="5" r="0.5" fill="#393939" />
            <circle cx="7" cy="5" r="0.5" fill="#393939" />
          </svg>
        </button>
      </Dropdown>

      <input
        style={{
          border: "none",
          outline: "none",
          width: 100,
          textAlign: "center",
        }}
        type="text"
        placeholder="Pending"
        value={"Pending"}
      />
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
      {/* <Handle
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
      /> */}
    </div>
  );
};
export default IdleNode;
