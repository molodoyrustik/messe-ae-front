/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useLayoutEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import HistoryItem from "./HistoryItem";
import Image from "next/image";

export default function History() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const historyItems = [
        {
            id: 1,
            img: '1',
            html: 'ExpoGlobal Group was founded, focusing on <b>exhibition stand design</b> and event solutions for international clients',
            year: 1998,
        },
        {
            id: 2,
            img: '2',
            html: 'Messe.ae was created to deliver premium <b>exhibition stand designs</b> and services across the Middle East',
            year: 2005,
        },
        {
            id: 3,
            img: '3',
            html: 'ExpoGlobal moved to Belgium, rebranded, and became the <b>parent company</b> of several specialized brands',
            year: 2009,
        },
        {
            id: 4,
            img: '4',
            html: '<b>Customized furniture</b> for homes and businesses, combining European design with premium quality',
            year: 2020,
        },
        {
            id: 5,
            img: '5',
            html: '<b>Modular homes</b> with fast installation, eco-friendly materials, and modern European design',
            year: 2020,
        },
        {
            id: 6,
            img: '6',
            html: 'Custom exhibition <b>stands for the Middle East</b> — full-service design, production, and installation',
            year: 2022,
        },
        {
            id: 7,
            img: '7',
            html: 'Creative <b>exhibition stand design</b> and production services for clients across <b>Europe</b>',
            year: 2023,
        },
    ]

    const bottomRowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const topRowRef = useRef<(HTMLDivElement | null)>(null);
    const thirdCellRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [arrowStyle, setArrowStyle] = useState<{ left: number; width: number; bottom: number } | null>(null);
    const arrowImgRef = useRef<HTMLImageElement | null>(null);
    const [arrowHeight, setArrowHeight] = useState<number>(32);
    const [topArrowsWidth, setTopArrowsWidth] = useState<number>(0);
    const [topArrowsHeight, setTopArrowsHeight] = useState<number>(0);
    const vertArrowRef = useRef<HTMLImageElement | null>(null);
    const [vertArrowStyle, setVertArrowStyle] = useState<{ right: number; top: number; height: number } | null>(null);
    
    useLayoutEffect(() => {
        function updateArrow() {
            const bottomIndexes = historyItems.map((_, i) => i).filter(i => i >= 3);
            if (
                !containerRef.current ||
                bottomIndexes.some(i => !bottomRowRefs.current[i - 3])
            ) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const firstBox = bottomRowRefs.current[0];
            const lastBox = bottomRowRefs.current[bottomRowRefs.current.length - 1];
            if (!firstBox || !lastBox) return;
            const firstRect = firstBox.getBoundingClientRect();
            const lastRect = lastBox.getBoundingClientRect();
            const left = firstRect.left - containerRect.left + firstRect.width / 2;
            const right = lastRect.left - containerRect.left + lastRect.width / 2;
            const bottom = containerRect.bottom - firstRect.top + 16;
            setArrowStyle({ left, width: right - left, bottom });
            if (arrowImgRef.current) {
                setArrowHeight(arrowImgRef.current.offsetHeight + 24);
            }
        }
        updateArrow();
        window.addEventListener('resize', updateArrow);
        return () => window.removeEventListener('resize', updateArrow);
    }, [historyItems.length]);
    
    useLayoutEffect(() => {
        function updateArrowsStyle() {
            if (!topRowRef.current) return;
            const topRow = topRowRef.current;
            const topRect = topRow.getBoundingClientRect();
            // + gap between boxes - year chip width - gap of arrow
            setTopArrowsWidth(topRect.right - topRect.left + 32 - 100 - 32);
            // + gap between boxes - year chip width
            setTopArrowsHeight(topRect.height - 32 + 22)
        }
        updateArrowsStyle();
        window.addEventListener('resize', updateArrowsStyle);
        return () => window.removeEventListener('resize', updateArrowsStyle);
    }, [topRowRef.current?.offsetHeight]);

    useLayoutEffect(() => {
        function updateVertArrow() {
            if (!containerRef.current || !thirdCellRef.current || !bottomRowRefs.current[bottomRowRefs.current.length - 1]) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const startBox = thirdCellRef.current;
            const endBox = bottomRowRefs.current[bottomRowRefs.current.length - 1];
            if (!startBox || !endBox) return;
            const startRect = startBox.getBoundingClientRect();
            const endRect = endBox.getBoundingClientRect();
            const right = containerRect.right - endRect.left - 40;
            const top = startRect.top - containerRect.top;
            const bottom = endRect.top - containerRect.top + 28;
            setVertArrowStyle({ right, top, height: bottom - top });
        }
        updateVertArrow();
        window.addEventListener('resize', updateVertArrow);
        return () => window.removeEventListener('resize', updateVertArrow);
    }, [historyItems.length, thirdCellRef.current?.offsetHeight]);

    if (isMobile) {
        return (
            <Box sx={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center',
                mt: '1.63rem',
                mb: 0,
                p: 0
            }}>
                <Image
                    src="/company-chronology2x.png"
                    alt="Company timeline"
                    width={343}
                    height={1200}
                    style={{ width: '100%', height: 'auto', maxWidth: '343px' }}
                />
            </Box>
        );
    }

    return (
        <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
            {arrowStyle && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    ref={arrowImgRef}
                    src="/about/icons/arrowSystem.svg"
                    alt=""
                    style={{
                        position: 'absolute',
                        left: arrowStyle.left,
                        width: arrowStyle.width,
                        height: 'auto',
                        pointerEvents: 'none',
                        zIndex: 2,
                        bottom: arrowStyle.bottom,
                    }}
                    onLoad={() => {
                        if (arrowImgRef.current) {
                            setArrowHeight(arrowImgRef.current.offsetHeight + 24);
                        }
                    }}
                />
            )}
            {vertArrowStyle && (
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        ref={vertArrowRef}
                        src="/about/icons/arrowSystemVert.svg"
                        alt=""
                        style={{
                            position: 'absolute',
                            right: vertArrowStyle.right,
                            top: vertArrowStyle.top,
                            height: vertArrowStyle.height,
                            width: 9,
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    />
                </Box>
            )}
            <Grid container spacing={4} rowSpacing={{xs: '22px', md: arrowHeight + 'px'}}>
                {historyItems.map((historyItem, index) => {
                    const isBottom = index >= 3;
                    return (
                        <Grid
                            key={historyItem.id}
                            size={{ xs: 12, md: index < 3 ? 4 : 3 }}
                        >
                            <div
                                ref={
                                    isBottom 
                                    ? (el => { bottomRowRefs.current[index - 3] = el; }) 
                                    : index === 0 
                                        ? topRowRef 
                                        : index === 2
                                            ? thirdCellRef
                                            : undefined
                                }
                                style={{ height: '100%' }}
                            >
                                <HistoryItem {...historyItem} index={index} arrowWidth={topArrowsWidth} arrowHeight={topArrowsHeight} />
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}