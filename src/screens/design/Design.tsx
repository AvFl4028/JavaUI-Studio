import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Text, Transformer } from "react-konva";

type ShapeItem = {
    id: string;
    type: "rect" | "circle" | "text";
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    fill?: string;
    text?: string;
};

export default function Design() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);
    const shapeRefs = useRef<Record<string, any>>({});

    const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
    const [shapes, setShapes] = useState<ShapeItem[]>([
        {
            id: "rect1",
            type: "rect",
            x: 50,
            y: 60,
            width: 150,
            height: 100,
            fill: "#6AA84F",
        },
        {
            id: "circ1",
            type: "circle",
            x: 300,
            y: 120,
            radius: 50,
            fill: "#3D85C6",
        },
        {
            id: "txt1",
            type: "text",
            x: 120,
            y: 250,
            text: "Hola Konva!",
            fill: "#000",
        },
    ]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        // Resize stage to container width
        function updateSize() {
            const el = containerRef.current;
            if (!el) return;
            setStageSize({
                width: el.clientWidth,
                height: Math.max(400, el.clientHeight),
            });
        }

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        // Attach transformer to selected shape
        if (
            selectedId &&
            transformerRef.current &&
            shapeRefs.current[selectedId]
        ) {
            transformerRef.current.nodes([shapeRefs.current[selectedId]]);
            transformerRef.current.getLayer() &&
                transformerRef.current.getLayer().batchDraw();
        } else if (transformerRef.current) {
            transformerRef.current.nodes([]);
            transformerRef.current.getLayer() &&
                transformerRef.current.getLayer().batchDraw();
        }
    }, [selectedId, shapes]);

    function handleStageMouseDown(e: any) {
        // clicked on stage - clear selection
        if (e.target === e.target.getStage()) {
            setSelectedId(null);
            return;
        }

        // find clicked shape by its id (we set Konva shape "id")
        const clickedId = e.target.attrs && e.target.attrs.id;
        if (clickedId) {
            setSelectedId(clickedId);
        } else {
            setSelectedId(null);
        }
    }

    function handleDragEnd(id: string, e: any) {
        const { x, y } = e.target.position();
        setShapes((prev) =>
            prev.map((s) => (s.id === id ? { ...s, x, y } : s)),
        );
    }

    function handleTransformEnd(id: string, e: any) {
        const node = shapeRefs.current[id];
        if (!node) return;

        if (node.className === "Rect") {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // update width/height and reset scale
            setShapes((prev) =>
                prev.map((s) =>
                    s.id === id
                        ? {
                              ...s,
                              x: node.x(),
                              y: node.y(),
                              width: Math.max(5, (s.width || 0) * scaleX),
                              height: Math.max(5, (s.height || 0) * scaleY),
                          }
                        : s,
                ),
            );
            node.scaleX(1);
            node.scaleY(1);
        }

        if (node.className === "Circle") {
            const scaleX = node.scaleX();
            const newRadius = Math.max(
                2,
                (shapes.find((s) => s.id === id)?.radius || 0) * scaleX,
            );
            setShapes((prev) =>
                prev.map((s) =>
                    s.id === id
                        ? { ...s, x: node.x(), y: node.y(), radius: newRadius }
                        : s,
                ),
            );
            node.scaleX(1);
            node.scaleY(1);
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "600px",
                border: "1px solid #ddd",
                padding: 8,
            }}
        >
            <div style={{ marginBottom: 8 }}>
                <button
                    onClick={() => {
                        // add a new rectangle
                        const id = `rect${Date.now()}`;
                        setShapes((s) => [
                            ...s,
                            {
                                id,
                                type: "rect",
                                x: 40,
                                y: 40,
                                width: 120,
                                height: 80,
                                fill: "#f6b26b",
                            },
                        ]);
                    }}
                >
                    Añadir rectángulo
                </button>

                <button
                    onClick={() => {
                        const id = `circ${Date.now()}`;
                        setShapes((s) => [
                            ...s,
                            {
                                id,
                                type: "circle",
                                x: 200,
                                y: 80,
                                radius: 40,
                                fill: "#e06666",
                            },
                        ]);
                    }}
                    style={{ marginLeft: 8 }}
                >
                    Añadir círculo
                </button>

                <button
                    onClick={() => {
                        if (selectedId)
                            setShapes((s) =>
                                s.filter((x) => x.id !== selectedId),
                            );
                    }}
                    style={{ marginLeft: 8 }}
                >
                    Eliminar seleccionado
                </button>

                <span style={{ marginLeft: 16 }}>
                    Seleccionado: {selectedId ?? "—"}
                </span>
            </div>

            <Stage
                width={stageSize.width}
                height={stageSize.height}
                onMouseDown={handleStageMouseDown}
                onTouchStart={handleStageMouseDown}
                ref={stageRef}
                style={{ background: "#fafafa" }}
            >
                <Layer>
                    {shapes.map((shape) => {
                        if (shape.type === "rect") {
                            return (
                                <Rect
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    fill={shape.fill}
                                    draggable
                                    onDragEnd={(e) =>
                                        handleDragEnd(shape.id, e)
                                    }
                                    onTransformEnd={(e) =>
                                        handleTransformEnd(shape.id, e)
                                    }
                                    onClick={() => setSelectedId(shape.id)}
                                    ref={(node) =>
                                        (shapeRefs.current[shape.id] = node)
                                    }
                                />
                            );
                        }

                        if (shape.type === "circle") {
                            return (
                                <Circle
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radius={shape.radius}
                                    fill={shape.fill}
                                    draggable
                                    onDragEnd={(e) =>
                                        handleDragEnd(shape.id, e)
                                    }
                                    onTransformEnd={(e) =>
                                        handleTransformEnd(shape.id, e)
                                    }
                                    onClick={() => setSelectedId(shape.id)}
                                    ref={(node) =>
                                        (shapeRefs.current[shape.id] = node)
                                    }
                                />
                            );
                        }

                        if (shape.type === "text") {
                            return (
                                <Text
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    text={shape.text}
                                    fill={shape.fill}
                                    draggable
                                    onDragEnd={(e) =>
                                        handleDragEnd(shape.id, e)
                                    }
                                    onClick={() => setSelectedId(shape.id)}
                                    ref={(node) =>
                                        (shapeRefs.current[shape.id] = node)
                                    }
                                />
                            );
                        }

                        return null;
                    })}

                    <Transformer
                        ref={transformerRef}
                        rotateEnabled={true}
                        enabledAnchors={[
                            "top-left",
                            "top-right",
                            "bottom-left",
                            "bottom-right",
                            "middle-left",
                            "middle-right",
                        ]}
                    />
                </Layer>
            </Stage>
        </div>
    );
}
