'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Publication } from '@/lib/publications';
import { cn } from '@/lib/utils';

type Node = {
  id: number;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  publication: Publication;
};

type Link = {
  source: Node;
  target: Node;
  strength: number;
};

type KnowledgeGraphProps = {
  publications: Publication[];
  onNodeClick: (publication: Publication) => void;
  className?: string;
};

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ publications, onNodeClick, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Use refs to store simulation data to prevent re-renders on each animation frame
  const nodesRef = useRef<Node[]>([]);
  const linksRef = useRef<Link[]>([]);
  
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const setupGraph = (width: number, height: number) => {
        const newNodes: Node[] = publications.map((p) => ({
        id: p.id,
        title: p.title,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        radius: 5 + (p.tags ? p.tags.length : 0) * 1.5,
        publication: p,
        }));

        const newLinks: Link[] = [];
        const nodeMap = new Map(newNodes.map(n => [n.id, n]));

        for (let i = 0; i < publications.length; i++) {
        for (let j = i + 1; j < publications.length; j++) {
            const p1 = publications[i];
            const p2 = publications[j];
            const tagsI = p1.tags || [];
            const tagsJ = p2.tags || [];
            const commonTags = tagsI.filter((t) => tagsJ.includes(t));
            if (commonTags.length > 0) {
                const sourceNode = nodeMap.get(p1.id);
                const targetNode = nodeMap.get(p2.id);
                if (sourceNode && targetNode) {
                    newLinks.push({
                        source: sourceNode,
                        target: targetNode,
                        strength: commonTags.length * 0.1,
                    });
                }
            }
        }
        }
        nodesRef.current = newNodes;
        linksRef.current = newLinks;
    };
    
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            canvas.width = width;
            canvas.height = height;
            setupGraph(width, height);
        }
    });

    resizeObserver.observe(container);
    // Initial setup
    const { width, height } = container.getBoundingClientRect();
    if(width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        setupGraph(width, height);
    }


    return () => {
        resizeObserver.disconnect();
    }
  }, [publications]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let isCancelled = false;

    const applyForces = () => {
        const width = canvas.width;
        const height = canvas.height;
        const attraction = 0.0005; 
        const repulsion = 600;
        const centeringForce = 0.0005;
        const currentNodes = nodesRef.current;
        const currentLinks = linksRef.current;

        currentNodes.forEach(node => {
            node.vx *= 0.9; 
            node.vy *= 0.9;

            node.vx += (width / 2 - node.x) * centeringForce;
            node.vy += (height / 2 - node.y) * centeringForce;
        });

        currentLinks.forEach(link => {
            const dx = link.target.x - link.source.x;
            const dy = link.target.y - link.source.y;
            const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
            const force = (dist - 250) * attraction * link.strength;
            const forceX = (dx / dist) * force;
            const forceY = (dy / dist) * force;
            link.source.vx += forceX;
            link.source.vy += forceY;
            link.target.vx -= forceX;
            link.target.vy -= forceY;
        });

        for (let i = 0; i < currentNodes.length; i++) {
            for (let j = i + 1; j < currentNodes.length; j++) {
                const dx = currentNodes[j].x - currentNodes[i].x;
                const dy = currentNodes[j].y - currentNodes[i].y;
                const distSq = dx * dx + dy * dy;
                if (distSq > 0) {
                    const force = repulsion / distSq;
                    const dist = Math.sqrt(distSq);
                    const forceX = (dx / dist) * force;
                    const forceY = (dy / dist) * force;
                    currentNodes[i].vx -= forceX;
                    currentNodes[i].vy -= forceY;
                    currentNodes[j].vx += forceX;
                    currentNodes[j].vy += forceY;
                }
            }
        }
        
        currentNodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
            node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
        });
    }

    const draw = () => {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const currentNodes = nodesRef.current;
        const currentLinks = linksRef.current;
        
        const hoveredLinks = new Set();
        const connectedNodes = new Set();
        if (hoveredNode) {
            connectedNodes.add(hoveredNode.id);
            currentLinks.forEach(link => {
                if (link.source.id === hoveredNode.id) {
                    hoveredLinks.add(link);
                    connectedNodes.add(link.target.id);
                }
                if (link.target.id === hoveredNode.id) {
                    hoveredLinks.add(link);
                    connectedNodes.add(link.source.id);
                }
            });
        }
        
        ctx.lineWidth = 1;
        currentLinks.forEach(link => {
            if (hoveredNode) {
                ctx.strokeStyle = hoveredLinks.has(link) ? 'rgba(75, 85, 99, 0.8)' : 'rgba(75, 85, 99, 0.1)';
            } else {
                 ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
            }
            ctx.beginPath();
            ctx.moveTo(link.source.x, link.source.y);
            ctx.lineTo(link.target.x, link.target.y);
            ctx.stroke();
        });

        currentNodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            
            if (hoveredNode) {
                if (node.id === hoveredNode.id) {
                     ctx.fillStyle = 'rgba(56, 189, 248, 1)';
                     ctx.strokeStyle = 'rgba(200, 230, 255, 1)';
                     ctx.lineWidth = 2;
                     ctx.stroke();
                } else if (connectedNodes.has(node.id)) {
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
                } else {
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
                }
            } else {
                ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
            }
            ctx.fill();
        });
    }

    const animate = () => {
      if (isCancelled) return;
        applyForces();
        draw();
        animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isCancelled = true;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [hoveredNode]); // Re-run only when hoveredNode changes to re-draw highlights

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const tooltip = tooltipRef.current;
    if (!canvas || !tooltip) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let foundNode: Node | null = null;
    // Check from top-most rendered node
    for (const node of [...nodesRef.current].reverse()) { 
      const dist = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
      if (dist < node.radius) {
        foundNode = node;
        break;
      }
    }
    
    if (hoveredNode?.id !== foundNode?.id) {
        setHoveredNode(foundNode);
    }

    if (foundNode) {
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX + 15}px`;
      tooltip.style.top = `${e.clientY + 15}px`;
      tooltip.innerHTML = `<strong>${foundNode.title}</strong><br/><span class="text-xs text-gray-400">${foundNode.publication.authors} (${foundNode.publication.year})</span>`;
      canvas.style.cursor = 'pointer';
    } else {
      tooltip.style.display = 'none';
      canvas.style.cursor = 'default';
    }
  };

  const handleClick = () => {
      if (hoveredNode) {
          onNodeClick(hoveredNode.publication);
      }
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
        <canvas 
            ref={canvasRef} 
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute top-0 left-0 w-full h-full" 
        />
        <div
            ref={tooltipRef}
            className="hidden absolute bg-popover text-popover-foreground p-3 rounded-lg text-sm max-w-xs pointer-events-none shadow-lg z-10"
        />
    </div>
  );
};

export default KnowledgeGraph;
