import React from "react"
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow"

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            border: "1px solid #757575",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700
          }}
          // className="nodrag nopan"
        >
            <button 
            style={
              {
                cursor: "pointer"
              }
            }
          
          onClick={console.log("test11111")}
          >+</button>
            <input placeholder="your action"></input>
          {/* {data != undefined && data.label != undefined ? data.label : "test"} */}
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge
