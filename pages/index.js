import { createClassFromSpec, VegaLite} from "react-vega";
import * as React from "react";
import {useEffect, useState} from "react";


export default function Home({data}) {
    const [vSpec, setSpec] = useState({
        description: "Amount of capital left to pay off over month of mortgage",
        data: {name: "series"},
        encoding: {
            x: {field: "month", type: "quantitative"},
            color: {field: "product", type: "nominal", legend: {orient: "bottom-left", offset: -50}},
        },
        layer: [
            {
                mark: {type: "line"},
                encoding: {
                    y: {field: "capital", type: "quantitative"}
                }
            },
            {
                mark: {type: "line", strokeDash: [8, 4]},
                encoding: {
                    y: {field: "cost", type: "quantitative"}
                }
            },

        ],
        resolve: {scale: {y: "independent"}}
    })

    const width = 600;

    useEffect(() => {
        const w = width - 260 <= 0 ? width : width - 260
        setSpec({...vSpec, width: w})
    }, [width])

    return (
            <VegaLite spec={vSpec} data={{series: data}} actions={false} hover={true}/>
    );
}


export async function getStaticProps(context) {
    return {
        props: {
            data: [
                {month: 0, product: "Sample", capital: 100500, cost: 0},
                {month: 48, product: "Sample", capital: 0, cost: 8000}
            ]
        }
    }
}
